import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/app-sidebar';
import { Toaster } from './ui/toaster';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full">
        <SidebarTrigger />
        <div className="w-full p-2">{children}</div>
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
