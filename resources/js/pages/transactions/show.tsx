import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, CreditCard, DollarSign, Edit, Tag, Wallet } from 'lucide-react';

interface Wallet {
    id: number;
    name: string;
}

interface Budget {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
}

interface TransactionTag {
    id: number;
    name: string;
}

interface Transaction {
    id: number;
    type: string;
    amount: number;
    description: string;
    notes: string | null;
    transaction_date: string;
    created_at: string;
    updated_at: string;
    wallet: Wallet;
    budget: Budget | null;
    category: Category | null;
    tags?: TransactionTag[];
}

interface TransactionShowProps {
    transaction: Transaction;
}

function formatCurrency(amount: number): string {
    return `$${amount.toFixed(2)}`;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
}

function formatDateTime(dateString: string): string {
    return new Date(dateString).toLocaleString();
}

function getTransactionTypeInfo(type: string) {
    switch (type) {
        case 'income':
            return {
                label: 'Income',
                variant: 'default' as const,
                color: 'text-green-600',
                sign: '+',
            };
        case 'expense':
            return {
                label: 'Expense',
                variant: 'destructive' as const,
                color: 'text-red-600',
                sign: '-',
            };
        case 'transfer':
            return {
                label: 'Transfer',
                variant: 'secondary' as const,
                color: 'text-blue-600',
                sign: '',
            };
        default:
            return {
                label: 'Unknown',
                variant: 'secondary' as const,
                color: 'text-muted-foreground',
                sign: '',
            };
    }
}

export default function TransactionShow({ transaction }: TransactionShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Transactions',
            href: '/transactions',
        },
        {
            title: transaction.description,
            href: `/transactions/${transaction.id}`,
        },
    ];

    const typeInfo = getTransactionTypeInfo(transaction.type);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${transaction.description} - Transactions`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/transactions">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold tracking-tight">{transaction.description}</h1>
                        <div className="mt-1 flex items-center gap-2">
                            <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                            <span className="text-sm text-muted-foreground">{formatDate(transaction.transaction_date)}</span>
                        </div>
                    </div>
                    <Button asChild>
                        <Link href={`/transactions/${transaction.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Amount</CardTitle>
                            <DollarSign className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${typeInfo.color}`}>
                                {typeInfo.sign}
                                {formatCurrency(transaction.amount)}
                            </div>
                            <p className="text-xs text-muted-foreground">{typeInfo.label} transaction</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Wallet</CardTitle>
                            <Wallet className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{transaction.wallet.name}</div>
                            <p className="text-xs text-muted-foreground">Source wallet</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Date</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatDate(transaction.transaction_date)}</div>
                            <p className="text-xs text-muted-foreground">Transaction date</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Transaction Details</CardTitle>
                        <CardDescription>Complete information about this transaction</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <Tag className="h-4 w-4" />
                                    Category
                                </h4>
                                <p className="text-sm text-muted-foreground">{transaction.category?.name || 'No category assigned'}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <CreditCard className="h-4 w-4" />
                                    Budget
                                </h4>
                                <p className="text-sm text-muted-foreground">{transaction.budget?.name || 'No budget assigned'}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Transaction Type</h4>
                                <div className="flex items-center gap-2">
                                    <Badge variant={typeInfo.variant}>{typeInfo.label}</Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Amount</h4>
                                <p className={`text-sm font-medium ${typeInfo.color}`}>
                                    {typeInfo.sign}
                                    {formatCurrency(transaction.amount)}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <Calendar className="h-4 w-4" />
                                    Transaction Date
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatDate(transaction.transaction_date)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <Wallet className="h-4 w-4" />
                                    Wallet
                                </h4>
                                <p className="text-sm text-muted-foreground">{transaction.wallet.name}</p>
                            </div>
                        </div>

                        {transaction.notes && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h4 className="text-sm leading-none font-medium">Notes</h4>
                                    <p className="text-sm whitespace-pre-wrap text-muted-foreground">{transaction.notes}</p>
                                </div>
                            </>
                        )}

                        {transaction.tags && transaction.tags.length > 0 && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h4 className="text-sm leading-none font-medium">Tags</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {transaction.tags.map((tag) => (
                                            <Badge key={tag.id} variant="outline">
                                                {tag.name}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Created</h4>
                                <p className="text-sm text-muted-foreground">{formatDateTime(transaction.created_at)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Last Updated</h4>
                                <p className="text-sm text-muted-foreground">{formatDateTime(transaction.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
