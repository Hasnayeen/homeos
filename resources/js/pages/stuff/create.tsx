import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';

interface Storage {
    id: number;
    name: string;
    location?: string;
    description?: string;
}

interface CreateStuffProps {
    storages: Storage[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Stuff',
        href: '/stuff',
    },
    {
        title: 'Create Stuff',
        href: '/stuff/create',
    },
];

export default function CreateStuff({ storages }: CreateStuffProps) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        storage_id: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/stuff');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Stuff" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Stuff</CardTitle>
                        <CardDescription>Add a new item to your stuff inventory</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Item Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-destructive' : ''}
                                        placeholder="e.g., Old laptop, Winter clothes, Books"
                                        required
                                    />
                                    {errors.name && <div className="text-sm text-destructive">{errors.name}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="storage_id">Storage Location</Label>
                                    <Select value={data.storage_id} onValueChange={(value) => setData('storage_id', value)}>
                                        <SelectTrigger className={errors.storage_id ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select storage location" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {storages.map((storage) => (
                                                <SelectItem key={storage.id} value={storage.id.toString()}>
                                                    <div>
                                                        <div className="font-medium">{storage.name}</div>
                                                        {storage.location && <div className="text-sm text-muted-foreground">{storage.location}</div>}
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {errors.storage_id && <div className="text-sm text-destructive">{errors.storage_id}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/stuff">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
