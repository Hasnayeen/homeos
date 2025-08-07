import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Wallets',
        href: '/wallets',
    },
    {
        title: 'Create Wallet',
        href: '/wallets/create',
    },
];

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY'];

export default function CreateWallet() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        description: '',
        balance: '',
        currency: 'USD',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/wallets');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Wallet" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Wallet</CardTitle>
                        <CardDescription>Add a new wallet or account to track your finances</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Wallet Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-destructive' : ''}
                                        placeholder="e.g., Main Checking Account"
                                        required
                                    />
                                    {errors.name && <div className="text-sm text-destructive">{errors.name}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="currency">Currency *</Label>
                                    <Select value={data.currency} onValueChange={(value) => setData('currency', value)}>
                                        <SelectTrigger className={errors.currency ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select currency" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {currencies.map((currency) => (
                                                <SelectItem key={currency} value={currency}>
                                                    {currency}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.currency && <div className="text-sm text-destructive">{errors.currency}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-destructive' : ''}
                                        placeholder="Optional description for this wallet"
                                    />
                                    {errors.description && <div className="text-sm text-destructive">{errors.description}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="balance">Current Balance ($) *</Label>
                                    <Input
                                        id="balance"
                                        type="number"
                                        step="0.01"
                                        value={data.balance}
                                        onChange={(e) => setData('balance', e.target.value)}
                                        className={errors.balance ? 'border-destructive' : ''}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.balance && <div className="text-sm text-destructive">{errors.balance}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/wallets">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
