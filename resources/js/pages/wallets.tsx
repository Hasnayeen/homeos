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

interface Wallet {
    id: number;
    name: string;
    description: string | null;
    balance: number | null;
    currency: string;
    is_active: boolean;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedWallets {
    data: Wallet[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface WalletsProps {
    wallets: PaginatedWallets;
    filters: {
        search?: string;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallets',
        href: '/wallets',
    },
];

function PaginationControls({ wallets }: { wallets: PaginatedWallets }) {
    const previousPage = wallets.links.find((link) => link.label.includes('Previous'));
    const nextPage = wallets.links.find((link) => link.label.includes('Next'));
    const pageLinks = wallets.links.filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'));

    return (
        <div className="flex flex-col items-center justify-between px-4 py-4 lg:flex-row">
            <div className="flex-shrink-0 text-sm text-muted-foreground">
                Showing {wallets.from} to {wallets.to} of {wallets.total} results
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

export default function Wallets({ wallets, filters }: WalletsProps) {
    const [search, setSearch] = useState(filters.search || '');
    const [isSearching, setIsSearching] = useState(false);

    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (search !== filters.search) {
                setIsSearching(true);
                router.get(
                    '/wallets',
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
            <Head title="Wallets" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>Wallets</CardTitle>
                            <CardDescription>Manage your accounts and track balances</CardDescription>
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href="/wallets/create">Create Wallet</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="border-b border-border p-4">
                            <div className="relative max-w-md">
                                <Input
                                    type="text"
                                    placeholder="Search wallets by name or description..."
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
                                        <th className="p-4 text-left font-medium">Balance</th>
                                        <th className="p-4 text-left font-medium">Currency</th>
                                        <th className="p-4 text-left font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {wallets.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="p-8 text-center text-muted-foreground">
                                                No wallets found
                                            </td>
                                        </tr>
                                    ) : (
                                        wallets.data.map((wallet) => (
                                            <tr key={wallet.id} className="cursor-pointer border-b border-border last:border-b-0 hover:bg-muted/50">
                                                <td className="p-4">
                                                    <Link href={`/wallets/${wallet.id}`} className="block">
                                                        <div>
                                                            <div className="font-medium">{wallet.name}</div>
                                                            {wallet.description && (
                                                                <div className="text-sm text-muted-foreground">{wallet.description}</div>
                                                            )}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/wallets/${wallet.id}`} className="block">
                                                        <div className="font-medium">
                                                            {wallet.balance !== null ? `$${wallet.balance.toFixed(2)}` : '$0.00'}
                                                        </div>
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/wallets/${wallet.id}`} className="block">
                                                        {wallet.currency}
                                                    </Link>
                                                </td>
                                                <td className="p-4">
                                                    <Link href={`/wallets/${wallet.id}`} className="block">
                                                        <Badge variant={wallet.is_active ? 'default' : 'secondary'}>
                                                            {wallet.is_active ? 'Active' : 'Inactive'}
                                                        </Badge>
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls wallets={wallets} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
