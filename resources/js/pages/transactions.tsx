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

interface Transaction {
    id: number;
    type: string;
    amount: number;
    description: string;
    notes: string | null;
    transaction_date: string;
    wallet: {
        id: number;
        name: string;
    } | null;
    budget: {
        id: number;
        name: string;
    } | null;
    category: {
        id: number;
        name: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedTransactions {
    data: Transaction[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface TransactionsProps {
    transactions: PaginatedTransactions;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
];

function PaginationControls({ transactions }: { transactions: PaginatedTransactions }) {
    const previousPage = transactions.links.find((link) => link.label.includes('Previous'));
    const nextPage = transactions.links.find((link) => link.label.includes('Next'));
    const pageLinks = transactions.links.filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'));

    return (
        <div className="flex flex-col items-center justify-between px-4 py-4 lg:flex-row">
            <div className="flex-shrink-0 text-sm text-muted-foreground">
                Showing {transactions.from} to {transactions.to} of {transactions.total} results
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

function getTransactionTypeVariant(type: string) {
    switch (type) {
        case 'income':
            return 'default';
        case 'expense':
            return 'destructive';
        case 'transfer':
            return 'secondary';
        default:
            return 'secondary';
    }
}

function formatTransactionType(type: string) {
    return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function Transactions({ transactions, filters }: TransactionsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (search !== filters.search) {
                setIsSearching(true);
                router.get(
                    '/transactions',
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

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Transactions" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>Transactions</CardTitle>
                            <CardDescription>Manage your financial transactions</CardDescription>
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href="/transactions/create">Create Transaction</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-b border-border p-4">
                            <div className="relative max-w-md">
                                <Input
                                    type="text"
                                    placeholder="Search transactions by description, wallet, or category..."
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
                                        <th className="p-4 text-left font-medium">Date</th>
                                        <th className="p-4 text-left font-medium">Description</th>
                                        <th className="p-4 text-left font-medium">Type</th>
                                        <th className="p-4 text-left font-medium">Amount</th>
                                        <th className="p-4 text-left font-medium">Wallet</th>
                                        <th className="p-4 text-left font-medium">Category</th>
                                        <th className="p-4 text-left font-medium">Budget</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                                No transactions found
                                            </td>
                                        </tr>
                                    ) : (
                                        transactions.data.map((transaction) => (
                                            <tr
                                                key={transaction.id}
                                                className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50"
                                            >
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        <div className="text-sm">{new Date(transaction.transaction_date).toLocaleDateString()}</div>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        <div>
                                                            <div className="font-medium">{transaction.description}</div>
                                                            {transaction.notes && (
                                                                <div className="text-sm text-muted-foreground">{transaction.notes}</div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        <Badge variant={getTransactionTypeVariant(transaction.type)}>
                                                            {formatTransactionType(transaction.type)}
                                                        </Badge>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        <div
                                                            className={`font-medium ${transaction.type === 'income' ? 'text-green-600' : transaction.type === 'expense' ? 'text-red-600' : ''}`}
                                                        >
                                                            {transaction.type === 'income' ? '+' : transaction.type === 'expense' ? '-' : ''}$
                                                            {transaction.amount.toFixed(2)}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        {transaction.wallet?.name || '-'}
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        {transaction.category?.name || '-'}
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/transactions/${transaction.id}`} className="block">
                                                        {transaction.budget?.name || '-'}
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls transactions={transactions} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
