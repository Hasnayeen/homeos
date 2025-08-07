import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

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

interface TransactionType {
    value: string;
    label: string;
}

interface CreateTransactionProps {
    wallets: Wallet[];
    budgets: Budget[];
    categories: Category[];
    transactionTypes: TransactionType[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Transactions',
        href: '/transactions',
    },
    {
        title: 'Create Transaction',
        href: '/transactions/create',
    },
];

export default function CreateTransaction({ wallets, budgets, categories, transactionTypes }: CreateTransactionProps) {
    const { data, setData, post, processing, errors } = useForm({
        wallet_id: '',
        budget_id: '',
        category_id: '',
        type: '',
        amount: '',
        description: '',
        notes: '',
        transaction_date: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/transactions');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Transaction" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Transaction</CardTitle>
                        <CardDescription>Add a new transaction to your financial records</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="type">Transaction Type *</Label>
                                    <Select value={data.type} onValueChange={(value) => setData('type', value)}>
                                        <SelectTrigger className={errors.type ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select transaction type" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {transactionTypes.map((type) => (
                                                <SelectItem key={type.value} value={type.value}>
                                                    {type.label}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.type && <div className="text-sm text-destructive">{errors.type}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="wallet_id">Wallet *</Label>
                                    <Select value={data.wallet_id} onValueChange={(value) => setData('wallet_id', value)}>
                                        <SelectTrigger className={errors.wallet_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select wallet" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {wallets.map((wallet) => (
                                                <SelectItem key={wallet.id} value={wallet.id.toString()}>
                                                    {wallet.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.wallet_id && <div className="text-sm text-destructive">{errors.wallet_id}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">Amount *</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className={errors.amount ? 'border-destructive' : ''}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.amount && <div className="text-sm text-destructive">{errors.amount}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="transaction_date">Transaction Date *</Label>
                                    <Input
                                        id="transaction_date"
                                        type="date"
                                        value={data.transaction_date}
                                        onChange={(e) => setData('transaction_date', e.target.value)}
                                        className={errors.transaction_date ? 'border-destructive' : ''}
                                        required
                                    />
                                    {errors.transaction_date && <div className="text-sm text-destructive">{errors.transaction_date}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description *</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-destructive' : ''}
                                        placeholder="Enter transaction description"
                                        required
                                    />
                                    {errors.description && <div className="text-sm text-destructive">{errors.description}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="category_id">Category</Label>
                                    <Select value={data.category_id} onValueChange={(value) => setData('category_id', value)}>
                                        <SelectTrigger className={errors.category_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select category (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">No category</SelectItem>
                                            {categories.map((category) => (
                                                <SelectItem key={category.id} value={category.id.toString()}>
                                                    {category.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.category_id && <div className="text-sm text-destructive">{errors.category_id}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="budget_id">Budget</Label>
                                    <Select value={data.budget_id} onValueChange={(value) => setData('budget_id', value)}>
                                        <SelectTrigger className={errors.budget_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select budget (optional)" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="">No budget</SelectItem>
                                            {budgets.map((budget) => (
                                                <SelectItem key={budget.id} value={budget.id.toString()}>
                                                    {budget.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.budget_id && <div className="text-sm text-destructive">{errors.budget_id}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input
                                        id="notes"
                                        value={data.notes}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setData('notes', e.target.value)}
                                        className={errors.notes ? 'border-destructive' : ''}
                                        placeholder="Additional notes about this transaction"
                                    />
                                    {errors.notes && <div className="text-sm text-destructive">{errors.notes}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/transactions">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
