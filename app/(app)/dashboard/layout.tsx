"use client";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./_components/app-sidebar";
import { AppHeader } from "./_components/app-header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider
      defaultOpen={true}
    >
      <AppSidebar />
      <div className="flex flex-col p-4 border w-full">
        <AppHeader />
        {children}
      </div>
    </SidebarProvider>
  );
}
