import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

interface AnnouncementsProps {
  role: "student" | "faculty" | "admin"
  type?: "announcement" | "notice"
}

export function Announcements({ role, type = "announcement" }: AnnouncementsProps) {
  // Sample data - in a real app, this would come from an API
  const announcements = [
    {
      id: 1,
      title: "Mid-Semester Examination Schedule",
      date: "May 10, 2025",
      category: "Academic",
      content:
        "The mid-semester examinations will commence from May 20, 2025. The detailed schedule is available on the examination portal.",
      forRoles: ["student", "faculty", "admin"],
    },
    {
      id: 2,
      title: "Faculty Development Program",
      date: "May 5, 2025",
      category: "Faculty",
      content:
        "A two-day faculty development program on 'Modern Teaching Methodologies' will be conducted on May 15-16, 2025.",
      forRoles: ["faculty", "admin"],
    },
    {
      id: 3,
      title: "Campus Recruitment Drive",
      date: "May 3, 2025",
      category: "Placement",
      content: "TechCorp will be conducting a campus recruitment drive for final year students on May 12, 2025.",
      forRoles: ["student", "admin"],
    },
    {
      id: 4,
      title: "Library Extended Hours",
      date: "May 1, 2025",
      category: "Library",
      content:
        "The central library will remain open till 10 PM during the examination period from May 18 to June 5, 2025.",
      forRoles: ["student", "faculty", "admin"],
    },
  ]

  const notices = [
    {
      id: 1,
      title: "Holiday Notice",
      date: "May 8, 2025",
      category: "Administrative",
      content: "The institute will remain closed on May 13, 2025 on account of Buddha Purnima.",
      forRoles: ["student", "faculty", "admin"],
    },
    {
      id: 2,
      title: "Fee Payment Reminder",
      date: "May 6, 2025",
      category: "Finance",
      content: "Students are reminded to clear all pending fee payments by May 15, 2025 to avoid late payment charges.",
      forRoles: ["student", "admin"],
    },
    {
      id: 3,
      title: "Faculty Meeting",
      date: "May 4, 2025",
      category: "Faculty",
      content: "A faculty meeting will be held on May 11, 2025 at 3 PM in the Conference Hall.",
      forRoles: ["faculty", "admin"],
    },
    {
      id: 4,
      title: "Internet Maintenance",
      date: "May 2, 2025",
      category: "IT",
      content: "The campus internet services will be down for maintenance on May 9, 2025 from 10 AM to 2 PM.",
      forRoles: ["student", "faculty", "admin"],
    },
  ]

  const items = type === "announcement" ? announcements : notices
  const filteredItems = items.filter((item) => item.forRoles.includes(role))

  return (
    <div className="space-y-4">
      {filteredItems.map((item, index) => (
        <div key={item.id}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-medium">{item.title}</h3>
              <p className="text-sm text-muted-foreground">{item.date}</p>
            </div>
            <Badge variant="outline" className="bg-primary/10">
              {item.category}
            </Badge>
          </div>
          <p className="text-sm">{item.content}</p>
          {index < filteredItems.length - 1 && <Separator className="mt-4" />}
        </div>
      ))}
    </div>
  )
}
