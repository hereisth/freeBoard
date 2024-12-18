"use client";

import { ChevronUp, Clock, Home, Star, User2 } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


// Menu items.
const items = [
  {
    title: "All Boards",
    url: "/dashboard",
    icon: Home,
  },
  {
    title: "Favorites",
    url: "/dashboard/favorites",
    icon: Star,
  },
  {
    title: "Recent",
    url: "/dashboard/recent",
    icon: Clock,
  }
];

export function AppSidebar() {

  const pathname = usePathname();

  return (
    <Sidebar
      collapsible="offcanvas"
    >
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel
            className="text-xl font-bold mb-4"
          >
            FreeBoard
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    //  服务端组件，想根据访问的 url 给选中的链接一个特殊的背景色
                    // className={`${pathname === item.url ? "bg-muted" : ""}`}
                  >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
