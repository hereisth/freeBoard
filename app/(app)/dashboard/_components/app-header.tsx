import { ThemeSwitcher } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Edit, Grid2x2Icon, List } from "lucide-react";

export function AppHeader() {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center gap-2">
        <SidebarTrigger />
      </div>

      <div className="flex items-center">
        <Button
          variant="ghost"
          onClick={() => {
            // create a new board item in supabase
            console.log("create a new board item in supabase");
          }}
        >
          <Edit className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            // change the baords view to grid
            console.log("change the baords view to grid");
          }}
        >
          <Grid2x2Icon className="w-4 h-4" />
        </Button>

        <Button
          variant="ghost"
          onClick={() => {
            // change the baords view to list
            console.log("change the baords view to list");
          }}
        >
          <List className="w-4 h-4" />
        </Button>
        <ThemeSwitcher />
      </div>
    </div>
  );
}
