import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, DollarSign, Edit, MapPin, Package } from 'lucide-react';

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
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

interface ProductShowProps {
    product: Product;
}

function formatPrice(cents: number | null): string {
    if (!cents) return 'N/A';
    return `$${(cents / 100).toFixed(2)}`;
}

function formatDate(dateString: string | null): string {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
}

function getStockStatus(current: number, threshold: number) {
    if (current <= threshold) {
        return { label: 'Restock Needed', variant: 'destructive' as const };
    }
    return { label: 'In Stock', variant: 'secondary' as const };
}

function getPercentageRemaining(current: number, purchased: number): number {
    if (purchased === 0) return 0;
    return Math.round((current / purchased) * 100);
}

export default function ProductShow({ product }: ProductShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Products',
            href: '/products',
        },
        {
            title: product.name,
            href: `/products/${product.id}`,
        },
    ];

    const stockStatus = getStockStatus(product.current_amount, product.threshold_amount);
    const percentageRemaining = getPercentageRemaining(product.current_amount, product.purchased_amount);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${product.name} - Products`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/products">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold tracking-tight">{product.name}</h1>
                        {product.description && <p className="text-muted-foreground">{product.description}</p>}
                    </div>
                    <Button asChild>
                        <Link href={`/products/${product.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {product.current_amount} {product.unit}
                            </div>
                            <p className="text-xs text-muted-foreground">{percentageRemaining}% of purchased amount</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Status</CardTitle>
                            <Badge variant={stockStatus.variant}>{stockStatus.label}</Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {product.purchased_amount} {product.unit}
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Threshold: {product.threshold_amount} {product.unit}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Last Purchase</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatDate(product.last_purchased_at)}</div>
                            <p className="text-xs text-muted-foreground">{formatPrice(product.last_purchase_price_cents)}</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>Complete information about this product</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Brand</h4>
                                <p className="text-sm text-muted-foreground">{product.brand || 'No brand specified'}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <MapPin className="h-4 w-4" />
                                    Storage Location
                                </h4>
                                <p className="text-sm text-muted-foreground">{product.storage_location || 'No location specified'}</p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Purchased Amount</h4>
                                <p className="text-sm text-muted-foreground">
                                    {product.purchased_amount} {product.unit}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Current Amount</h4>
                                <p className="text-sm text-muted-foreground">
                                    {product.current_amount} {product.unit}
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Restock Threshold</h4>
                                <p className="text-sm text-muted-foreground">
                                    {product.threshold_amount} {product.unit}
                                </p>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <Calendar className="h-4 w-4" />
                                    Last Purchased
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatDate(product.last_purchased_at)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <DollarSign className="h-4 w-4" />
                                    Last Purchase Price
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatPrice(product.last_purchase_price_cents)}</p>
                            </div>
                        </div>

                        {product.notes && (
                            <>
                                <Separator />
                                <div className="space-y-2">
                                    <h4 className="text-sm leading-none font-medium">Notes</h4>
                                    <p className="text-sm whitespace-pre-wrap text-muted-foreground">{product.notes}</p>
                                </div>
                            </>
                        )}

                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
