import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { ArrowLeft, Calendar, Edit, MapPin, Package } from 'lucide-react';

interface Storage {
    id: number;
    name: string;
    location: string | null;
    description: string | null;
}

interface StuffItem {
    id: number;
    name: string;
    storage: Storage | null;
    storage_id: number | null;
    created_at: string;
    updated_at: string;
}

interface StuffShowProps {
    stuff: StuffItem;
}

function formatDate(dateString: string): string {
    return new Date(dateString).toLocaleDateString();
}

export default function StuffShow({ stuff }: StuffShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Stuff',
            href: '/stuff',
        },
        {
            title: stuff.name,
            href: `/stuff/${stuff.id}`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`${stuff.name} - Stuff`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/stuff">
                            <ArrowLeft className="h-4 w-4" />
                        </Link>
                    </Button>
                    <div className="flex-1">
                        <h1 className="text-2xl font-bold tracking-tight">{stuff.name}</h1>
                        <p className="text-muted-foreground">Stuff item details and location</p>
                    </div>
                    <Button asChild>
                        <Link href={`/stuff/${stuff.id}/edit`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                        </Link>
                    </Button>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Item Name</CardTitle>
                            <Package className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stuff.name}</div>
                            <p className="text-xs text-muted-foreground">Stored item</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Storage Location</CardTitle>
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stuff.storage ? stuff.storage.name : 'No Storage'}</div>
                            <p className="text-xs text-muted-foreground">{stuff.storage?.location || 'No location specified'}</p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Date Added</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatDate(stuff.created_at)}</div>
                            <p className="text-xs text-muted-foreground">Added to inventory</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Item Details</CardTitle>
                        <CardDescription>Complete information about this stuff item</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Item Name</h4>
                                <p className="text-sm text-muted-foreground">{stuff.name}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <MapPin className="h-4 w-4" />
                                    Storage Location
                                </h4>
                                <p className="text-sm text-muted-foreground">{stuff.storage ? stuff.storage.name : 'No storage location assigned'}</p>
                            </div>
                        </div>

                        {stuff.storage && (
                            <>
                                <Separator />
                                <div className="space-y-4">
                                    <h4 className="text-sm leading-none font-medium">Storage Details</h4>
                                    <div className="grid gap-4 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <h5 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Storage Name</h5>
                                            <p className="text-sm">{stuff.storage.name}</p>
                                        </div>
                                        {stuff.storage.location && (
                                            <div className="space-y-2">
                                                <h5 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Location</h5>
                                                <p className="text-sm">{stuff.storage.location}</p>
                                            </div>
                                        )}
                                    </div>
                                    {stuff.storage.description && (
                                        <div className="space-y-2">
                                            <h5 className="text-xs font-medium tracking-wide text-muted-foreground uppercase">Description</h5>
                                            <p className="text-sm">{stuff.storage.description}</p>
                                        </div>
                                    )}
                                </div>
                            </>
                        )}

                        <Separator />

                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <h4 className="flex items-center gap-2 text-sm leading-none font-medium">
                                    <Calendar className="h-4 w-4" />
                                    Date Added
                                </h4>
                                <p className="text-sm text-muted-foreground">{formatDate(stuff.created_at)}</p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="text-sm leading-none font-medium">Last Updated</h4>
                                <p className="text-sm text-muted-foreground">{formatDate(stuff.updated_at)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
