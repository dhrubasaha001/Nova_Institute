import { BookOpen, Calendar, Coffee, Hotel, PieChart, FileText, Stethoscope } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuickLinksProps {
  role: "student" | "faculty" | "admin"
}

export function QuickLinks({ role }: QuickLinksProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/hostel">
          <Hotel className="h-5 w-5 text-violet-500" />
          <span>Hostel</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/library">
          <BookOpen className="h-5 w-5 text-blue-500" />
          <span>Library</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/attendance">
          <PieChart className="h-5 w-5 text-indigo-500" />
          <span>Attendance</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/canteen">
          <Coffee className="h-5 w-5 text-purple-500" />
          <span>Canteen</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4 col-span-2" asChild>
        <a href="/dashboard/events">
          <Calendar className="h-5 w-5 text-violet-600" />
          <span>Events</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/medical">
          <Stethoscope className="h-5 w-5 text-red-500" />
          <span>Medical</span>
        </a>
      </Button>
      <Button variant="outline" className="h-auto flex-col items-center justify-center gap-1 p-4" asChild>
        <a href="/dashboard/examination">
          <FileText className="h-5 w-5 text-orange-500" />
          <span>Exams</span>
        </a>
      </Button>
    </div>
  )
}
