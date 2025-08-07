import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { Plus } from 'lucide-react';
import { useState } from 'react';

interface Storage {
    id: number;
    name: string;
    location?: string;
    description?: string;
}

interface StuffItem {
    id: number;
    name: string;
    storage: Storage | null;
    storage_id: number | null;
}

interface EditStuffProps {
    stuff: StuffItem;
    storages: Storage[];
}

function CreateStorageModal({ onStorageCreated }: { onStorageCreated: (storage: Storage) => void }) {
    const [open, setOpen] = useState(false);
    const { data, setData, processing, errors, reset } = useForm({
        name: '',
        location: '',
        description: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('/storages', data);
            if (response.data.success) {
                onStorageCreated(response.data.storage);
                reset();
                setOpen(false);
            }
        } catch (error: unknown) {
            console.error('Error creating storage:', error);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button type="button" variant="outline" size="sm" className="h-8 w-8 p-0">
                    <Plus className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle>Create Storage Location</DialogTitle>
                    <DialogDescription>Add a new storage location for your stuff.</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="storage-name">Name *</Label>
                        <Input
                            id="storage-name"
                            type="text"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            className={errors.name ? 'border-destructive' : ''}
                            placeholder="e.g., Garage, Attic, Basement"
                            required
                        />
                        {errors.name && <div className="text-sm text-destructive">{errors.name}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storage-location">Location</Label>
                        <Input
                            id="storage-location"
                            type="text"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            className={errors.location ? 'border-destructive' : ''}
                            placeholder="e.g., First floor, Back corner"
                        />
                        {errors.location && <div className="text-sm text-destructive">{errors.location}</div>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="storage-description">Description</Label>
                        <Input
                            id="storage-description"
                            type="text"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            className={errors.description ? 'border-destructive' : ''}
                            placeholder="Additional details about this storage"
                        />
                        {errors.description && <div className="text-sm text-destructive">{errors.description}</div>}
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                            Cancel
                        </Button>
                        <Button type="submit" disabled={processing}>
                            {processing ? 'Creating...' : 'Create'}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default function EditStuff({ stuff, storages: initialStorages }: EditStuffProps) {
    const [storages, setStorages] = useState<Storage[]>(initialStorages);

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Stuff',
            href: '/stuff',
        },
        {
            title: stuff.name,
            href: `/stuff/${stuff.id}`,
        },
        {
            title: 'Edit',
            href: `/stuff/${stuff.id}/edit`,
        },
    ];

    const { data, setData, put, processing, errors } = useForm({
        name: stuff.name || '',
        storage_id: stuff.storage_id ? stuff.storage_id.toString() : '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(`/stuff/${stuff.id}`);
    };

    const handleStorageCreated = (newStorage: Storage) => {
        setStorages([...storages, newStorage]);
        setData('storage_id', newStorage.id.toString());
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${stuff.name}`} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Stuff Item</CardTitle>
                        <CardDescription>Update item information and storage location</CardDescription>
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
                                    <div className="flex gap-2">
                                        <div className="flex-1">
                                            <Select value={data.storage_id} onValueChange={(value) => setData('storage_id', value)}>
                                                <SelectTrigger className={errors.storage_id ? 'border-destructive' : ''}>
                                                    <SelectValue placeholder="Select storage location" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="">No storage location</SelectItem>
                                                    {storages.map((storage) => (
                                                        <SelectItem key={storage.id} value={storage.id.toString()}>
                                                            <div>
                                                                <div className="font-medium">{storage.name}</div>
                                                                {storage.location && (
                                                                    <div className="text-sm text-muted-foreground">{storage.location}</div>
                                                                )}
                                                            </div>
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <CreateStorageModal onStorageCreated={handleStorageCreated} />
                                    </div>
                                    {errors.storage_id && <div className="text-sm text-destructive">{errors.storage_id}</div>}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Updating...' : 'Update Item'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href={`/stuff/${stuff.id}`}>Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
