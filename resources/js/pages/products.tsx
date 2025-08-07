import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Head, Link } from '@inertiajs/react';

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
    last_purchased_date: string | null;
    last_purchase_price: number | null;
    percentage_remaining_rounded: number;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedProducts {
    data: Product[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface ProductsProps {
    products: PaginatedProducts;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Products',
        href: '/products',
    },
];

function PaginationControls({ products }: { products: PaginatedProducts }) {
    const previousPage = products.links.find((link) => link.label.includes('Previous'));
    const nextPage = products.links.find((link) => link.label.includes('Next'));
    const pageLinks = products.links.filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'));

    return (
        <div className="flex items-center justify-between px-4 py-4">
            <div className="text-sm text-muted-foreground">
                Showing {products.from} to {products.to} of {products.total} results
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

export default function Products({ products }: ProductsProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Products" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>Products</CardTitle>
                            <CardDescription>Manage your inventory and track product levels</CardDescription>
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href="/products/create">Create Product</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Brand</th>
                                        <th className="p-4 text-left font-medium">Current / Total</th>
                                        <th className="p-4 text-left font-medium">Unit</th>
                                        <th className="p-4 text-left font-medium">Status</th>
                                        <th className="p-4 text-left font-medium">Storage</th>
                                        <th className="p-4 text-left font-medium">Last Purchase</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="p-8 text-center text-muted-foreground">
                                                No products found
                                            </td>
                                        </tr>
                                    ) : (
                                        products.data.map((product) => (
                                            <tr key={product.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium">{product.name}</div>
                                                        {product.description && (
                                                            <div className="text-sm text-muted-foreground">{product.description}</div>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="p-4">{product.brand || '-'}</td>
                                                <td className="p-4">
                                                    <div>
                                                        <div className="font-medium">
                                                            {product.current_amount} / {product.purchased_amount}
                                                        </div>
                                                        <div className="text-sm text-muted-foreground">
                                                            {product.percentage_remaining_rounded}% remaining
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="p-4">{product.unit}</td>
                                                <td className="p-4">
                                                    {product.current_amount <= product.threshold_amount ? (
                                                        <Badge variant="destructive">Restock Needed</Badge>
                                                    ) : (
                                                        <Badge variant="secondary">In Stock</Badge>
                                                    )}
                                                </td>
                                                <td className="p-4">{product.storage_location || '-'}</td>
                                                <td className="p-4">
                                                    <div>
                                                        {product.last_purchased_date && <div className="text-sm">{product.last_purchased_date}</div>}
                                                        {product.last_purchase_price && (
                                                            <div className="text-sm text-muted-foreground">
                                                                ${product.last_purchase_price.toFixed(2)}
                                                            </div>
                                                        )}
                                                        {!product.last_purchased_date && !product.last_purchase_price && '-'}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls products={products} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
