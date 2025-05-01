"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { AlertTriangle, Calendar, FileUp, PieChart, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  ChartContainer,
  ChartBars,
  ChartBar,
  ChartHeader,
  ChartLegend,
  ChartTitle,
  ChartTooltip,
} from "@/components/ui/chart"

export default function AttendancePage() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [role, setRole] = useState<"student" | "faculty">("student")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Attendance Tracker</h1>
        <Select value={role} onValueChange={(value: "student" | "faculty") => setRole(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="student">Student View</SelectItem>
            <SelectItem value="faculty">Faculty View</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="dashboard">{role === "student" ? "My Attendance" : "Class Attendance"}</TabsTrigger>
          <TabsTrigger value="upload">{role === "student" ? "View Details" : "Upload Attendance"}</TabsTrigger>
        </TabsList>

        {role === "student" ? (
          <>
            <TabsContent value="dashboard">
              <StudentDashboard />
            </TabsContent>
            <TabsContent value="upload">
              <StudentDetails />
            </TabsContent>
          </>
        ) : (
          <>
            <TabsContent value="dashboard">
              <FacultyDashboard />
            </TabsContent>
            <TabsContent value="upload">
              <UploadAttendance />
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  )
}

function StudentDashboard() {
  // Sample attendance data
  const subjects = [
    { id: 1, name: "Data Structures", attendance: 85, classes: 40, present: 34 },
    { id: 2, name: "Computer Networks", attendance: 78, classes: 38, present: 30 },
    { id: 3, name: "Database Systems", attendance: 92, classes: 36, present: 33 },
    { id: 4, name: "Operating Systems", attendance: 68, classes: 42, present: 29 },
    { id: 5, name: "Software Engineering", attendance: 88, classes: 34, present: 30 },
  ]

  // Calculate overall attendance
  const totalClasses = subjects.reduce((sum, subject) => sum + subject.classes, 0)
  const totalPresent = subjects.reduce((sum, subject) => sum + subject.present, 0)
  const overallAttendance = Math.round((totalPresent / totalClasses) * 100)

  // Chart data
  const chartData = subjects.map((subject) => ({
    name: subject.name,
    value: subject.attendance,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Overall Attendance</CardTitle>
          <CardDescription>Your attendance across all subjects for the current semester</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-48 h-48 relative flex items-center justify-center rounded-full border-8 border-primary/10">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-4xl font-bold">{overallAttendance}%</div>
              </div>
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle
                  className="text-primary/10"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                  strokeDasharray={`${(2 * Math.PI * 40 * overallAttendance) / 100} ${2 * Math.PI * 40 * (1 - overallAttendance / 100)}`}
                  strokeDashoffset={2 * Math.PI * 40 * 0.25}
                />
              </svg>
            </div>
            <div className="flex-1">
              {overallAttendance < 75 && (
                <Alert variant="destructive" className="mb-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Low Attendance Alert</AlertTitle>
                  <AlertDescription>
                    Your overall attendance is below 75%. Please improve your attendance to avoid academic penalties.
                  </AlertDescription>
                </Alert>
              )}
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Classes Attended</span>
                    <span className="text-sm font-medium">
                      {totalPresent}/{totalClasses}
                    </span>
                  </div>
                  <Progress value={overallAttendance} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Required Classes</div>
                    <div className="text-2xl font-bold">{Math.ceil(totalClasses * 0.75)}</div>
                    <div className="text-xs text-muted-foreground">to maintain 75%</div>
                  </div>
                  <div className="border rounded-lg p-3">
                    <div className="text-sm text-muted-foreground">Classes to Attend</div>
                    <div className="text-2xl font-bold">
                      {overallAttendance < 75 ? Math.ceil(totalClasses * 0.75 - totalPresent) : 0}
                    </div>
                    <div className="text-xs text-muted-foreground">to reach 75%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Subject-wise Attendance</CardTitle>
          <CardDescription>Your attendance breakdown by subject</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ChartHeader>
              <ChartTitle>Attendance Percentage</ChartTitle>
              <ChartLegend />
            </ChartHeader>
            <ChartBars>
              {chartData.map((item) => (
                <ChartBar
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  color={item.value < 75 ? "destructive" : "primary"}
                />
              ))}
              <ChartTooltip />
            </ChartBars>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Critical Subjects</CardTitle>
          <CardDescription>Subjects with attendance below 75%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {subjects
              .filter((subject) => subject.attendance < 75)
              .map((subject) => (
                <div key={subject.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{subject.name}</h3>
                    <span className="text-destructive font-medium">{subject.attendance}%</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Classes Attended</span>
                      <span>
                        {subject.present}/{subject.classes}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Classes to Attend</span>
                      <span>{Math.ceil(subject.classes * 0.75 - subject.present)}</span>
                    </div>
                  </div>
                </div>
              ))}
            {subjects.filter((subject) => subject.attendance < 75).length === 0 && (
              <div className="text-center py-8">
                <PieChart className="h-12 w-12 text-primary/20 mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Critical Subjects</h3>
                <p className="text-muted-foreground mt-1">All your subjects have attendance above 75%</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function StudentDetails() {
  // Sample attendance data for a specific subject
  const [subject, setSubject] = useState("data-structures")

  const attendanceLog = [
    { id: 1, date: "May 1, 2025", status: "present", topic: "Binary Trees" },
    { id: 2, date: "April 29, 2025", status: "present", topic: "Heap Data Structure" },
    { id: 3, date: "April 27, 2025", status: "absent", topic: "Graph Algorithms" },
    { id: 4, date: "April 25, 2025", status: "present", topic: "Dynamic Programming" },
    { id: 5, date: "April 23, 2025", status: "present", topic: "Greedy Algorithms" },
    { id: 6, date: "April 21, 2025", status: "present", topic: "Sorting Algorithms" },
    { id: 7, date: "April 19, 2025", status: "absent", topic: "Searching Algorithms" },
    { id: 8, date: "April 17, 2025", status: "present", topic: "Linked Lists" },
    { id: 9, date: "April 15, 2025", status: "present", topic: "Stacks and Queues" },
    { id: 10, date: "April 13, 2025", status: "present", topic: "Arrays and Strings" },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Details</CardTitle>
        <CardDescription>View your detailed attendance log for each subject</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <Label htmlFor="subject">Select Subject</Label>
          <Select value={subject} onValueChange={setSubject}>
            <SelectTrigger id="subject" className="mt-1">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="data-structures">Data Structures</SelectItem>
              <SelectItem value="computer-networks">Computer Networks</SelectItem>
              <SelectItem value="database-systems">Database Systems</SelectItem>
              <SelectItem value="operating-systems">Operating Systems</SelectItem>
              <SelectItem value="software-engineering">Software Engineering</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {attendanceLog.map((log) => (
            <div
              key={log.id}
              className={`border rounded-lg p-4 ${log.status === "absent" ? "border-destructive/50" : ""}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{log.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">Topic: {log.topic}</p>
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    log.status === "present"
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                  }`}
                >
                  {log.status === "present" ? "Present" : "Absent"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function FacultyDashboard() {
  // Sample class attendance data
  const classes = [
    { id: 1, name: "CS-301: Data Structures", section: "A", strength: 60, avgAttendance: 82 },
    { id: 2, name: "CS-302: Computer Networks", section: "B", strength: 55, avgAttendance: 76 },
    { id: 3, name: "CS-303: Database Systems", section: "A", strength: 58, avgAttendance: 88 },
    { id: 4, name: "CS-304: Operating Systems", section: "C", strength: 52, avgAttendance: 71 },
  ]

  // Students with low attendance
  const lowAttendanceStudents = [
    { id: 1, name: "John Smith", rollNo: "CS2023001", attendance: 65, subject: "Operating Systems" },
    { id: 2, name: "Emily Johnson", rollNo: "CS2023015", attendance: 68, subject: "Computer Networks" },
    { id: 3, name: "Michael Brown", rollNo: "CS2023022", attendance: 62, subject: "Operating Systems" },
    { id: 4, name: "Sarah Davis", rollNo: "CS2023035", attendance: 70, subject: "Data Structures" },
  ]

  // Chart data
  const chartData = classes.map((cls) => ({
    name: cls.name.split(":")[1].trim(),
    value: cls.avgAttendance,
  }))

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Class Attendance Overview</CardTitle>
          <CardDescription>Average attendance across all your classes</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer className="h-[300px]">
            <ChartHeader>
              <ChartTitle>Average Attendance Percentage</ChartTitle>
              <ChartLegend />
            </ChartHeader>
            <ChartBars>
              {chartData.map((item) => (
                <ChartBar
                  key={item.name}
                  name={item.name}
                  value={item.value}
                  color={item.value < 75 ? "destructive" : "primary"}
                />
              ))}
              <ChartTooltip />
            </ChartBars>
          </ChartContainer>
        </CardContent>
      </Card>

      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Class Details</CardTitle>
          <CardDescription>Attendance statistics for each class</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {classes.map((cls) => (
              <div key={cls.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{cls.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      Section: {cls.section} | Strength: {cls.strength}
                    </p>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      cls.avgAttendance >= 75
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}
                  >
                    {cls.avgAttendance}% Avg.
                  </div>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Attendance Rate</span>
                    <span className="text-sm">{cls.avgAttendance}%</span>
                  </div>
                  <Progress
                    value={cls.avgAttendance}
                    className={`h-2 ${cls.avgAttendance < 75 ? "text-amber-500" : ""}`}
                  />
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Low Attendance</CardTitle>
          <CardDescription>Students with attendance below 75%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {lowAttendanceStudents.map((student) => (
              <div key={student.id} className="border border-destructive/30 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{student.name}</h3>
                    <p className="text-sm text-muted-foreground">{student.rollNo}</p>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                    {student.attendance}%
                  </div>
                </div>
                <p className="text-sm">Subject: {student.subject}</p>
                <div className="mt-3 flex justify-end gap-2">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-3 w-3" />
                    Profile
                  </Button>
                  <Button size="sm">Notify</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function UploadAttendance() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Attendance</CardTitle>
        <CardDescription>Upload attendance data for your classes</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="class">Select Class</Label>
            <Select>
              <SelectTrigger id="class">
                <SelectValue placeholder="Select class" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs301a">CS-301: Data Structures (Section A)</SelectItem>
                <SelectItem value="cs302b">CS-302: Computer Networks (Section B)</SelectItem>
                <SelectItem value="cs303a">CS-303: Database Systems (Section A)</SelectItem>
                <SelectItem value="cs304c">CS-304: Operating Systems (Section C)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <Label>Upload Method</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                <div className="flex flex-col items-center text-center gap-2">
                  <FileUp className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Upload CSV File</p>
                    <p className="text-sm text-muted-foreground">Upload a CSV file with attendance data</p>
                  </div>
                  <Input type="file" accept=".csv" className="mt-2" />
                </div>
              </div>
              <div className="border rounded-lg p-4 cursor-pointer hover:border-primary">
                <div className="flex flex-col items-center text-center gap-2">
                  <User className="h-8 w-8 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Manual Entry</p>
                    <p className="text-sm text-muted-foreground">Manually mark attendance for each student</p>
                  </div>
                  <Button variant="outline" className="mt-2">
                    Open Form
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="topic">Topic Covered</Label>
            <Input id="topic" placeholder="Enter the topic covered in this class" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea id="notes" placeholder="Any additional notes about this class" />
          </div>

          <div className="flex justify-end">
            <Button>Upload Attendance</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
