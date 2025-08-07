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
    description: string | null;
    balance: number;
    currency: string;
}

interface EditWalletProps {
    wallet: Wallet;
}

const currencies = ['USD', 'EUR', 'GBP', 'CAD', 'AUD', 'JPY', 'CHF', 'CNY'];

export default function EditWallet({ wallet }: EditWalletProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Wallets',
            href: '/wallets',
        },
        {
            title: wallet.name,
            href: `/wallets/${wallet.id}`,
        },
        {
            title: 'Edit',
            href: `/wallets/${wallet.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: wallet.name || '',
        description: wallet.description || '',
        balance: wallet.balance?.toFixed(2) || '0.00',
        currency: wallet.currency || 'USD',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/wallets/${wallet.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${wallet.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Wallet</CardTitle>
                        <CardDescription>Update wallet information and balance</CardDescription>
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
                                        required
                                    />
                                    {errors.balance && <div className="text-sm text-destructive">{errors.balance}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/wallets/${wallet.id}`}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
