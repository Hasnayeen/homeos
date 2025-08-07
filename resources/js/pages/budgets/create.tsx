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
        title: 'Budgets',
        href: '/budgets',
    },
    {
        title: 'Create Budget',
        href: '/budgets/create',
    },
];

export default function CreateBudget() {
    const { data, setData, post, processing, errors, transform } = useForm({
        name: '',
        description: '',
        amount: '',
        period: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        transform((data) => ({
            ...data,
            amount: data.amount ? Math.round(parseFloat(data.amount) * 100) : 0,
        }));

        post('/budgets');
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Budget" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Create New Budget</CardTitle>
                        <CardDescription>Set up a new budget to track your spending</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Budget Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        className={errors.name ? 'border-destructive' : ''}
                                        placeholder="e.g., Monthly Groceries"
                                        required
                                    />
                                    {errors.name && <div className="text-sm text-destructive">{errors.name}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="amount">Budget Amount ($) *</Label>
                                    <Input
                                        id="amount"
                                        type="number"
                                        step="0.01"
                                        value={data.amount}
                                        onChange={(e) => setData('amount', e.target.value)}
                                        className={errors.amount ? 'border-destructive' : ''}
                                        placeholder="0.00"
                                        required
                                    />
                                    {errors.amount && <div className="text-sm text-destructive">{errors.amount}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Input
                                        id="description"
                                        type="text"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-destructive' : ''}
                                        placeholder="Optional description of what this budget covers"
                                    />
                                    {errors.description && <div className="text-sm text-destructive">{errors.description}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="period">Period *</Label>
                                    <Select value={data.period} onValueChange={(value) => setData('period', value)}>
                                        <SelectTrigger className={errors.period ? 'border-destructive' : ''}>
                                            <SelectValue placeholder="Select period" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">Weekly</SelectItem>
                                            <SelectItem value="monthly">Monthly</SelectItem>
                                            <SelectItem value="quarterly">Quarterly</SelectItem>
                                            <SelectItem value="yearly">Yearly</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.period && <div className="text-sm text-destructive">{errors.period}</div>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="start_date">Start Date *</Label>
                                    <Input
                                        id="start_date"
                                        type="date"
                                        value={data.start_date}
                                        onChange={(e) => setData('start_date', e.target.value)}
                                        className={errors.start_date ? 'border-destructive' : ''}
                                        required
                                    />
                                    {errors.start_date && <div className="text-sm text-destructive">{errors.start_date}</div>}
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="end_date">End Date</Label>
                                    <Input
                                        id="end_date"
                                        type="date"
                                        value={data.end_date}
                                        onChange={(e) => setData('end_date', e.target.value)}
                                        className={errors.end_date ? 'border-destructive' : ''}
                                    />
                                    {errors.end_date && <div className="text-sm text-destructive">{errors.end_date}</div>}
                                    <div className="text-sm text-muted-foreground">Leave empty if this budget doesn't have an end date</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Creating...' : 'Create'}
                                </Button>
                                <Button type="button" variant="outline" asChild>
                                    <Link href="/budgets">Cancel</Link>
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
