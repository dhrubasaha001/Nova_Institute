"use client"

import {
  BookOpen,
  Calendar,
  Coffee,
  Hotel,
  LayoutDashboard,
  PieChart,
  Settings,
  FileText,
  Stethoscope,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border/40 pb-2">
        <div className="flex items-center gap-2 px-2">
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUYwwB5KeZ5z7nfwFCVaS7Iti5bzxtNYItlQ&s"
            alt="Nova Institute Logo"
            width={40}
            height={40}
            className="rounded-md"
          />
          <div className="font-semibold text-lg leading-none">
            Nova Institute
            <div className="text-xs font-normal text-muted-foreground">Student Portal</div>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard"} tooltip="Dashboard">
              <a href="/dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/hostel"} tooltip="Hostel">
              <a href="/dashboard/hostel">
                <Hotel />
                <span>Hostel</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/library"} tooltip="Library">
              <a href="/dashboard/library">
                <BookOpen />
                <span>Library</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/attendance"} tooltip="Attendance">
              <a href="/dashboard/attendance">
                <PieChart />
                <span>Attendance</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/canteen"} tooltip="Canteen">
              <a href="/dashboard/canteen">
                <Coffee />
                <span>Canteen</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/events"} tooltip="Events">
              <a href="/dashboard/events">
                <Calendar />
                <span>Events</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/medical"} tooltip="Medical">
              <a href="/dashboard/medical">
                <Stethoscope />
                <span>Medical</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild isActive={pathname === "/dashboard/examination"} tooltip="Examination">
              <a href="/dashboard/examination">
                <FileText />
                <span>Examination</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="border-t border-border/40 pt-2">
        <div className="flex justify-between items-center px-4">
          <ThemeToggle />
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}
