import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

interface Budget {
    id: number;
    name: string;
    description: string | null;
    amount: number;
    spent: number;
    period: string;
    start_date: string;
    end_date: string | null;
    is_active: boolean;
}

interface ShowBudgetProps {
    budget: Budget;
}

export default function ShowBudget({ budget }: ShowBudgetProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Budgets',
            href: '/budgets',
        },
        {
            title: budget.name,
            href: `/budgets/${budget.id}`,
        },
    ];

    const formatCurrency = (cents: number) => {
        return (cents / 100).toFixed(2);
    };

    const remaining = budget.amount - budget.spent;
    const percentageUsed = budget.amount > 0 ? Math.round((budget.spent / budget.amount) * 100) : 0;

    const getBudgetStatus = () => {
        if (budget.spent >= budget.amount) return 'exceeded';
        if (percentageUsed >= 80) return 'warning';
        return 'good';
    };

    const status = getBudgetStatus();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={budget.name} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-1.5">
                            <CardTitle>{budget.name}</CardTitle>
                            {budget.description && <CardDescription>{budget.description}</CardDescription>}
                        </div>
                        <CardAction>
                            <Button asChild>
                                <Link href={`/budgets/${budget.id}/edit`}>Edit Budget</Link>
                            </Button>
                        </CardAction>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Budget Amount</div>
                                    <div className="text-2xl font-bold">${formatCurrency(budget.amount)}</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Amount Spent</div>
                                    <div className="text-2xl font-bold text-destructive">${formatCurrency(budget.spent)}</div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Remaining</div>
                                    <div className={`text-2xl font-bold ${remaining < 0 ? 'text-destructive' : 'text-green-600'}`}>
                                        ${formatCurrency(Math.abs(remaining))}
                                        {remaining < 0 && ' over'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Period</div>
                                    <Badge variant="outline" className="text-base capitalize">
                                        {budget.period}
                                    </Badge>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="text-sm font-medium">Budget Progress</div>
                                        <div className="text-sm text-muted-foreground">{percentageUsed}% used</div>
                                    </div>
                                    <div className="h-2 w-full rounded-full bg-gray-200">
                                        <div
                                            className={`h-2 rounded-full transition-all ${
                                                status === 'exceeded' ? 'bg-red-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-green-500'
                                            }`}
                                            style={{ width: `${Math.min(percentageUsed, 100)}%` }}
                                        />
                                    </div>{' '}
                                    {percentageUsed > 100 && (
                                        <div className="text-sm text-destructive">Over budget by ${formatCurrency(budget.spent - budget.amount)}</div>
                                    )}
                                </div>

                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium">Status:</div>
                                    {status === 'exceeded' && <Badge variant="destructive">Over Budget</Badge>}
                                    {status === 'warning' && (
                                        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                                            Near Limit
                                        </Badge>
                                    )}
                                    {status === 'good' && (
                                        <Badge variant="secondary" className="bg-green-100 text-green-800">
                                            On Track
                                        </Badge>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Start Date</div>
                                    <div className="text-base">{budget.start_date}</div>
                                </div>

                                {budget.end_date && (
                                    <div className="space-y-2">
                                        <div className="text-sm font-medium">End Date</div>
                                        <div className="text-base">{budget.end_date}</div>
                                    </div>
                                )}

                                <div className="space-y-2">
                                    <div className="text-sm font-medium">Status</div>
                                    <Badge variant={budget.is_active ? 'secondary' : 'outline'}>{budget.is_active ? 'Active' : 'Inactive'}</Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
