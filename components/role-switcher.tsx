"use client"

import { GraduationCap, User, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface RoleSwitcherProps {
  role: "student" | "faculty" | "admin"
  setRole: (role: "student" | "faculty" | "admin") => void
}

export function RoleSwitcher({ role, setRole }: RoleSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          {role === "student" && <GraduationCap className="h-4 w-4" />}
          {role === "faculty" && <User className="h-4 w-4" />}
          {role === "admin" && <Users className="h-4 w-4" />}
          <span className="capitalize">{role}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setRole("student")}>
          <GraduationCap className="mr-2 h-4 w-4" />
          <span>Student</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole("faculty")}>
          <User className="mr-2 h-4 w-4" />
          <span>Faculty</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setRole("admin")}>
          <Users className="mr-2 h-4 w-4" />
          <span>Admin</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
