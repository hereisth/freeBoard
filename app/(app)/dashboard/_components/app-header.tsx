import { SidebarTrigger } from "@/components/ui/sidebar";

export function AppHeader() {
  return (
    <div className="flex justify-between items-center w-full">
      <SidebarTrigger />
    </div>
  );
}
