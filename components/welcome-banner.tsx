"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface WelcomeBannerProps {
  role: "student" | "faculty" | "admin"
}

export function WelcomeBanner({ role }: WelcomeBannerProps) {
  const [greeting, setGreeting] = useState("")
  const [userName, setUserName] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()

    if (hour < 12) {
      setGreeting("Good morning")
    } else if (hour < 18) {
      setGreeting("Good afternoon")
    } else {
      setGreeting("Good evening")
    }

    // Set user name based on role
    if (role === "student") {
      setUserName("John Smith")
    } else if (role === "faculty") {
      setUserName("Dr. Emily Johnson")
    } else {
      setUserName("Admin User")
    }
  }, [role])

  return (
    <Card className="bg-gradient-to-r from-violet-500 to-blue-500 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">
              {greeting}, {userName}!
            </h2>
            <p className="text-white/80 mt-1">
              {role === "student"
                ? "Welcome to your student dashboard. You have 2 upcoming assignments."
                : role === "faculty"
                  ? "Welcome to your faculty dashboard. You have 3 classes today."
                  : "Welcome to the admin dashboard. There are 5 pending approvals."}
            </p>
          </div>
          <div className="flex gap-2">
            {role === "student" && (
              <>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">Semester</div>
                  <div className="text-lg">4th</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">GPA</div>
                  <div className="text-lg">3.8</div>
                </div>
              </>
            )}
            {role === "faculty" && (
              <>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">Department</div>
                  <div className="text-lg">Computer Science</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">Classes Today</div>
                  <div className="text-lg">3</div>
                </div>
              </>
            )}
            {role === "admin" && (
              <>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">Pending</div>
                  <div className="text-lg">5</div>
                </div>
                <div className="bg-white/20 rounded-lg px-3 py-2 text-sm">
                  <div className="font-medium">Alerts</div>
                  <div className="text-lg">2</div>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
