import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from '@/components/ui/pagination';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

interface Budget {
    id: number;
    name: string;
    description: string | null;
    amount: number;
    spent: number;
    period: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedBudgets {
    data: Budget[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface BudgetsProps {
    budgets: PaginatedBudgets;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Budgets',
        href: '/budgets',
    },
];

function PaginationControls({ budgets }: { budgets: PaginatedBudgets }) {
    const previousPage = budgets.links.find((link) => link.label.includes('Previous'));
    const nextPage = budgets.links.find((link) => link.label.includes('Next'));
    const pageLinks = budgets.links.filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'));

    return (
        <div className="flex flex-col items-center justify-between px-4 py-4 lg:flex-row">
            <div className="flex-shrink-0 text-sm text-muted-foreground">
                Showing {budgets.from} to {budgets.to} of {budgets.total} results
            </div>
            <Pagination>
                <PaginationContent>
                    <PaginationItem>
                        <PaginationPrevious href={previousPage?.url || undefined} />
                    </PaginationItem>

                    {pageLinks.map((link, index) => {
                        if (link.label === '...') {
                            return (
                                <PaginationItem key={index}>
                                    <PaginationEllipsis />
                                </PaginationItem>
                            );
                        }

                        return (
                            <PaginationItem key={index}>
                                <PaginationLink href={link.url || undefined} isActive={link.active}>
                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                </PaginationLink>
                            </PaginationItem>
                        );
                    })}

                    <PaginationItem>
                        <PaginationNext href={nextPage?.url || undefined} />
                    </PaginationItem>
                </PaginationContent>
            </Pagination>
        </div>
    );
}

export default function Budgets({ budgets, filters }: BudgetsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (search !== filters.search) {
                setIsSearching(true);
                router.get(
                    '/budgets',
                    { search },
                    {
                        preserveState: true,
                        replace: true,
                        onFinish: () => setIsSearching(false),
                    },
                );
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [search, filters.search]);

    const formatCurrency = (cents: number) => {
        return (cents / 100).toFixed(2);
    };

    const getPercentageUsed = (spent: number, amount: number) => {
        if (amount === 0) return 0;
        return Math.round((spent / amount) * 100);
    };

    const getBudgetStatus = (spent: number, amount: number) => {
        const percentage = getPercentageUsed(spent, amount);
        if (percentage >= 100) return 'exceeded';
        if (percentage >= 80) return 'warning';
        return 'good';
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Budgets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>Budgets</CardTitle>
                            <CardDescription>Manage your budgets and track spending</CardDescription>
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href="/budgets/create">Create Budget</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-b border-border p-4">
                            <div className="relative max-w-md">
                                <Input
                                    type="text"
                                    placeholder="Search budgets by name, description, or period..."
                                    value={search}
                                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
                                    className="pr-10"
                                />
                                {isSearching && (
                                    <div className="absolute top-1/2 right-3 -translate-y-1/2">
                                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Period</th>
                                        <th className="p-4 text-left font-medium">Budget Amount</th>
                                        <th className="p-4 text-left font-medium">Spent</th>
                                        <th className="p-4 text-left font-medium">Status</th>
                                        <th className="p-4 text-left font-medium">Dates</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {budgets.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="p-8 text-center text-muted-foreground">
                                                No budgets found
                                            </td>
                                        </tr>
                                    ) : (
                                        budgets.data.map((budget) => {
                                            const status = getBudgetStatus(budget.spent, budget.amount);
                                            const percentageUsed = getPercentageUsed(budget.spent, budget.amount);

                                            return (
                                                <tr
                                                    key={budget.id}
                                                    className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50"
                                                >
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            <div>
                                                                <div className="font-medium">{budget.name}</div>
                                                                {budget.description && (
                                                                    <div className="text-sm text-muted-foreground">{budget.description}</div>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            <Badge variant="outline" className="capitalize">
                                                                {budget.period}
                                                            </Badge>
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            <div className="font-medium">${formatCurrency(budget.amount)}</div>
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            <div>
                                                                <div className="font-medium">${formatCurrency(budget.spent)}</div>
                                                                <div className="text-sm text-muted-foreground">{percentageUsed}% used</div>
                                                            </div>
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            {status === 'exceeded' && <Badge variant="destructive">Over Budget</Badge>}
                                                            {status === 'warning' && (
                                                                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                                                    Near Limit
                                                                </Badge>
                                                            )}
                                                            {status === 'good' && (
                                                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                                    On Track
                                                                </Badge>
                                                            )}
                                                        </Link>
                                                    </td>
                                                    <td className="p-4">
                                                        <Link href={`/budgets/${budget.id}`} className="block">
                                                            <div>
                                                                <div className="text-sm">{budget.start_date}</div>
                                                                {budget.end_date && (
                                                                    <div className="text-sm text-muted-foreground">to {budget.end_date}</div>
                                                                )}
                                                            </div>
                                                        </Link>
                                                    </td>
                                                </tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls budgets={budgets} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
