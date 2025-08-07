import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, DollarSign, Edit, Wallet as WalletIcon } from 'lucide-react';

interface Wallet {
    id: number;
    name: string;
    description: string | null;
    balance: number | null;
    currency: string;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface WalletShowProps {
    wallet: Wallet;
}

function formatBalance(balance: number | null, currency: string): string {
    if (balance === null) return '$0.00';
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
    }).format(balance);
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
}

export default function WalletShow({ wallet }: WalletShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Wallets',
            href: '/wallets',
        },
        {
            title: wallet.name,
            href: `/wallets/${wallet.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${wallet.name} - Wallets`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/wallets">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold tracking-tight">{wallet.name}</h1>
                        {wallet.description && <p className="text-muted-foreground">{wallet.description}</p>}
                    </div>
                    <Button asChild>
                        <Link href={`/wallets/${wallet.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Balance</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatBalance(wallet.balance, wallet.currency)}</div>
                            <p className="text-xs text-muted-foreground">Current account balance</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Status</CardTitle>
                            <Badge variant={wallet.is_active ? 'default' : 'secondary'}>{wallet.is_active ? 'Active' : 'Inactive'}</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-lg font-bold">{wallet.currency}</div>
                            <p className="text-xs text-muted-foreground">Account currency</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Wallet Details</CardTitle>
                        <CardDescription>Complete information about this wallet</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Wallet Name</h4>
                                <p className="text-sm text-muted-foreground">{wallet.name}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Currency</h4>
                                <p className="text-sm text-muted-foreground">{wallet.currency}</p>
                            </div>
                        </div>

                        {wallet.description && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h4 className="text-sm leading-none font-medium">Description</h4>
                                    <p className="text-sm text-muted-foreground">{wallet.description}</p>
                                </div>
                            </>
                        )}

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <DollarSign className="h-4 w-4" />
                                    Current Balance
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatBalance(wallet.balance, wallet.currency)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <WalletIcon className="h-4 w-4" />
                                    Status
                                </h4>
                                <p className="text-sm text-muted-foreground">{wallet.is_active ? 'Active' : 'Inactive'}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Created</h4>
                                <p className="text-sm text-muted-foreground">{formatDate(wallet.created_at)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Last Updated</h4>
                                <p className="text-sm text-muted-foreground">{formatDate(wallet.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
