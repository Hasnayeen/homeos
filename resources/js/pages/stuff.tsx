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

interface Storage {
    id: number;
    name: string;
}

interface StuffItem {
    id: number;
    name: string;
    storage: Storage | null;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedStuff {
    data: StuffItem[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number;
    to: number;
    links: PaginationLink[];
}

interface StuffProps {
    stuff: PaginatedStuff;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stuff',
        href: '/stuff',
    },
];

function PaginationControls({ stuff }: { stuff: PaginatedStuff }) {
    const previousPage = stuff.links.find((link) => link.label.includes('Previous'));
    const nextPage = stuff.links.find((link) => link.label.includes('Next'));
    const pageLinks = stuff.links.filter((link) => !link.label.includes('Previous') && !link.label.includes('Next'));

    return (
        <div className="flex items-center justify-between px-4 py-4">
            <div className="text-sm text-muted-foreground flex-shrink-0">
                Showing {stuff.from} to {stuff.to} of {stuff.total} results
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

export default function Stuff({ stuff }: StuffProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Stuff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>Stuff</CardTitle>
                            <CardDescription>Manage your stored items and their locations</CardDescription>
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href="/stuff/create">Create Stuff</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead>
                                    <tr className="border-b border-border">
                                        <th className="p-4 text-left font-medium">Name</th>
                                        <th className="p-4 text-left font-medium">Storage Location</th>
                                        <th className="p-4 text-left font-medium">Added</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {stuff.data.length === 0 ? (
                                        <tr>
                                            <td colSpan={3} className="p-8 text-center text-muted-foreground">
                                                No stuff found
                                            </td>
                                        </tr>
                                    ) : (
                                        stuff.data.map((item) => (
                                            <tr key={item.id} className="border-b border-border last:border-b-0 hover:bg-muted/50">
                                                <td className="p-4">
                                                    <div className="font-medium">{item.name}</div>
                                                </td>
                                                <td className="p-4">{item.storage ? item.storage.name : '-'}</td>
                                                <td className="p-4">
                                                    <div className="text-sm text-muted-foreground">
                                                        {new Date(item.created_at).toLocaleDateString()}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <PaginationControls stuff={stuff} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
