import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Product {
    id: number;
    name: string;
    description: string | null;
    brand: string | null;
    current_amount: number;
    purchased_amount: number;
    unit: string;
    threshold_amount: number;
    storage_location: string | null;
    last_purchased_at: string | null;
    last_purchase_price_cents: number | null;
    notes: string | null;
}

interface EditProductProps {
    product: Product;
    unitOptions: Record<string, Record<string, string>>;
}

function formatDateForInput(dateString: string | null): string {
    if (!dateString) return '';
    return new Date(dateString).toISOString().split('T')[0];
}

function formatPriceForInput(cents: number | null): string {
    if (!cents) return '';
    return (cents / 100).toFixed(2);
}

export default function EditProduct({ product, unitOptions }: EditProductProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: product.name,
            href: `/products/${product.id}`,
        },
        {
            title: 'Edit',
            href: `/products/${product.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors, transform } = useForm({
        name: product.name || '',
        description: product.description || '',
        purchased_amount: product.purchased_amount.toString(),
        current_amount: product.current_amount.toString(),
        unit: product.unit || '',
        storage_location: product.storage_location || '',
        threshold_amount: product.threshold_amount.toString(),
        last_purchased_at: formatDateForInput(product.last_purchased_at),
        last_purchase_price_cents: formatPriceForInput(product.last_purchase_price_cents),
        brand: product.brand || '',
        notes: product.notes || '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            last_purchase_price_cents: data.last_purchase_price_cents ? Math.round(parseFloat(data.last_purchase_price_cents) * 100) : null,
        }));

        put(`/products/${product.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${product.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Product</CardTitle>
                        <CardDescription>Update product information and inventory details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Product Name *</Label>
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
                                    <Label htmlFor="brand">Brand</Label>
                                    <Input
                                        id="brand"
                                        type="text"
                                        value={data.brand}
                                        onChange={(e) => setData('brand', e.target.value)}
                                        className={errors.brand ? 'border-destructive' : ''}
                                    />
                                    {errors.brand && <div className="text-sm text-destructive">{errors.brand}</div>}
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

                                <div className="space-y-2">
                                    <Label htmlFor="purchased_amount">Purchased Amount *</Label>
                                    <Input
                                        id="purchased_amount"
                                        type="number"
                                        step="0.01"
                                        value={data.purchased_amount}
                                        onChange={(e) => setData('purchased_amount', e.target.value)}
                                        className={errors.purchased_amount ? 'border-destructive' : ''}
                                        required
                                    />
                                    {errors.purchased_amount && <div className="text-sm text-destructive">{errors.purchased_amount}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="current_amount">Current Amount *</Label>
                                    <Input
                                        id="current_amount"
                                        type="number"
                                        step="0.01"
                                        value={data.current_amount}
                                        onChange={(e) => setData('current_amount', e.target.value)}
                                        className={errors.current_amount ? 'border-destructive' : ''}
                                        required
                                    />
                                    {errors.current_amount && <div className="text-sm text-destructive">{errors.current_amount}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="unit">Unit *</Label>
                                    <Select value={data.unit} onValueChange={(value) => setData('unit', value)}>
                                        <SelectTrigger className={errors.unit ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select a unit" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.entries(unitOptions).map(([groupName, options]) => (
                                                <SelectGroup key={groupName}>
                                                    <SelectLabel>{groupName}</SelectLabel>
                                                    {Object.entries(options).map(([value, label]) => (
                                                        <SelectItem key={value} value={value}>
                                                            {label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectGroup>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.unit && <div className="text-sm text-destructive">{errors.unit}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="threshold_amount">Threshold Amount *</Label>
                                    <Input
                                        id="threshold_amount"
                                        type="number"
                                        step="0.01"
                                        value={data.threshold_amount}
                                        onChange={(e) => setData('threshold_amount', e.target.value)}
                                        className={errors.threshold_amount ? 'border-destructive' : ''}
                                        required
                                    />
                                    {errors.threshold_amount && <div className="text-sm text-destructive">{errors.threshold_amount}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="storage_location">Storage Location</Label>
                                    <Input
                                        id="storage_location"
                                        type="text"
                                        value={data.storage_location}
                                        onChange={(e) => setData('storage_location', e.target.value)}
                                        className={errors.storage_location ? 'border-destructive' : ''}
                                        placeholder="e.g., Kitchen pantry, Garage shelf"
                                    />
                                    {errors.storage_location && <div className="text-sm text-destructive">{errors.storage_location}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="last_purchased_at">Last Purchase Date</Label>
                                    <Input
                                        id="last_purchased_at"
                                        type="date"
                                        value={data.last_purchased_at}
                                        onChange={(e) => setData('last_purchased_at', e.target.value)}
                                        className={errors.last_purchased_at ? 'border-destructive' : ''}
                                    />
                                    {errors.last_purchased_at && <div className="text-sm text-destructive">{errors.last_purchased_at}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="last_purchase_price_cents">Last Purchase Price ($)</Label>
                                    <Input
                                        id="last_purchase_price_cents"
                                        type="number"
                                        step="0.01"
                                        value={data.last_purchase_price_cents}
                                        onChange={(e) => setData('last_purchase_price_cents', e.target.value)}
                                        className={errors.last_purchase_price_cents ? 'border-destructive' : ''}
                                        placeholder="0.00"
                                    />
                                    {errors.last_purchase_price_cents && (
                                        <div className="text-sm text-destructive">{errors.last_purchase_price_cents}</div>
                                    )}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="notes">Notes</Label>
                                    <Input
                                        id="notes"
                                        type="text"
                                        value={data.notes}
                                        onChange={(e) => setData('notes', e.target.value)}
                                        className={errors.notes ? 'border-destructive' : ''}
                                        placeholder="Additional notes about this product"
                                    />
                                    {errors.notes && <div className="text-sm text-destructive">{errors.notes}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/products/${product.id}`}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
