import { AppShell } from '@/components/app-shell';
import { AppSidebar } from '@/components/app-sidebar';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { type BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <div className="flex w-full items-center justify-between">
                        <div className="text-lg font-semibold">HomeOS</div>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </AppShell>
    );
}
