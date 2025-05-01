"use client"

import { useState } from "react"
import { AlertTriangle, Calendar, Check, Clock, Download, FileText, MapPin, Search, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ExaminationPage() {
  const [activeTab, setActiveTab] = useState("schedule")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Examination Portal</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="schedule">Exam Schedule</TabsTrigger>
          <TabsTrigger value="results">Results</TabsTrigger>
          <TabsTrigger value="seating">Seating Arrangement</TabsTrigger>
          <TabsTrigger value="registration">Exam Registration</TabsTrigger>
        </TabsList>

        <TabsContent value="schedule">
          <ExamSchedule />
        </TabsContent>

        <TabsContent value="results">
          <ExamResults />
        </TabsContent>

        <TabsContent value="seating">
          <SeatingArrangement />
        </TabsContent>

        <TabsContent value="registration">
          <ExamRegistration />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function ExamSchedule() {
  // Sample exam schedule data
  const upcomingExams = [
    {
      id: 1,
      subject: "Data Structures and Algorithms",
      code: "CS301",
      date: "May 15, 2025",
      time: "9:00 AM - 12:00 PM",
      venue: "Examination Hall A",
      status: "upcoming",
    },
    {
      id: 2,
      subject: "Database Management Systems",
      code: "CS302",
      date: "May 18, 2025",
      time: "2:00 PM - 5:00 PM",
      venue: "Examination Hall B",
      status: "upcoming",
    },
    {
      id: 3,
      subject: "Computer Networks",
      code: "CS303",
      date: "May 21, 2025",
      time: "9:00 AM - 12:00 PM",
      venue: "Examination Hall A",
      status: "upcoming",
    },
    {
      id: 4,
      subject: "Operating Systems",
      code: "CS304",
      date: "May 24, 2025",
      time: "2:00 PM - 5:00 PM",
      venue: "Examination Hall C",
      status: "upcoming",
    },
  ]

  const pastExams = [
    {
      id: 5,
      subject: "Programming Fundamentals",
      code: "CS101",
      date: "December 10, 2024",
      time: "9:00 AM - 12:00 PM",
      venue: "Examination Hall B",
      status: "completed",
    },
    {
      id: 6,
      subject: "Discrete Mathematics",
      code: "CS102",
      date: "December 13, 2024",
      time: "2:00 PM - 5:00 PM",
      venue: "Examination Hall A",
      status: "completed",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Upcoming Examinations</CardTitle>
          <CardDescription>Schedule of your upcoming exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-muted-foreground">Course Code: {exam.code}</p>
                  </div>
                  <Badge>Upcoming</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.venue}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
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
          <CardTitle>Exam Calendar</CardTitle>
          <CardDescription>Overview of your exam schedule</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">May 2025</h3>
              <div className="space-y-2">
                {upcomingExams.map((exam) => (
                  <div key={exam.id} className="flex items-center gap-2 text-sm">
                    <div className="bg-primary/10 text-primary font-medium rounded-md px-2 py-1 w-10 text-center">
                      {exam.date.split(" ")[1].replace(",", "")}
                    </div>
                    <div className="truncate">{exam.subject}</div>
                  </div>
                ))}
              </div>
            </div>

            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Important Notice</AlertTitle>
              <AlertDescription>
                Students must carry their ID cards and hall tickets to the examination hall.
              </AlertDescription>
            </Alert>

            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Exam Guidelines</h3>
              <ul className="space-y-1 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Arrive 30 minutes before the exam starts</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Bring your student ID and hall ticket</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>No electronic devices allowed</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5" />
                  <span>Use blue or black pen only</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="md:col-span-3">
        <CardHeader>
          <CardTitle>Past Examinations</CardTitle>
          <CardDescription>History of your completed exams</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pastExams.map((exam) => (
              <div key={exam.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-muted-foreground">Course Code: {exam.code}</p>
                  </div>
                  <Badge variant="outline">Completed</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.venue}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ExamResults() {
  // Sample results data
  const semesterResults = [
    {
      semester: "Fall 2024",
      gpa: 3.8,
      courses: [
        { code: "CS101", name: "Programming Fundamentals", grade: "A", credits: 4 },
        { code: "CS102", name: "Discrete Mathematics", grade: "A-", credits: 3 },
        { code: "CS103", name: "Introduction to Computing", grade: "B+", credits: 3 },
        { code: "MATH101", name: "Calculus I", grade: "A", credits: 4 },
        { code: "ENG101", name: "English Composition", grade: "A-", credits: 3 },
      ],
    },
    {
      semester: "Spring 2025",
      gpa: 3.6,
      courses: [
        { code: "CS201", name: "Object-Oriented Programming", grade: "B+", credits: 4 },
        { code: "CS202", name: "Data Structures", grade: "A", credits: 4 },
        { code: "CS203", name: "Digital Logic Design", grade: "A-", credits: 3 },
        { code: "MATH201", name: "Linear Algebra", grade: "B", credits: 3 },
        { code: "PHY101", name: "Physics I", grade: "B+", credits: 4 },
      ],
    },
  ]

  // Grade point mapping
  const gradePoints: Record<string, number> = {
    A: 4.0,
    "A-": 3.7,
    "B+": 3.3,
    B: 3.0,
    "B-": 2.7,
    "C+": 2.3,
    C: 2.0,
    "C-": 1.7,
    D: 1.0,
    F: 0.0,
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Examination Results</CardTitle>
          <CardDescription>View your academic performance and grades</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {semesterResults.map((semester, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium">{semester.semester}</h3>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-muted-foreground">GPA</div>
                    <Badge variant="outline" className="text-lg font-medium">
                      {semester.gpa.toFixed(2)}
                    </Badge>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Course Code</TableHead>
                        <TableHead>Course Name</TableHead>
                        <TableHead>Credits</TableHead>
                        <TableHead>Grade</TableHead>
                        <TableHead>Grade Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {semester.courses.map((course, courseIndex) => (
                        <TableRow key={courseIndex}>
                          <TableCell className="font-medium">{course.code}</TableCell>
                          <TableCell>{course.name}</TableCell>
                          <TableCell>{course.credits}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                course.grade === "A" || course.grade === "A-"
                                  ? "default"
                                  : course.grade === "F"
                                    ? "destructive"
                                    : "outline"
                              }
                            >
                              {course.grade}
                            </Badge>
                          </TableCell>
                          <TableCell>{gradePoints[course.grade] * course.credits}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="flex justify-end mt-4">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download Grade Sheet
                  </Button>
                </div>

                {index < semesterResults.length - 1 && <Separator className="my-6" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>CGPA Progression</CardTitle>
            <CardDescription>Your cumulative GPA over semesters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">Current CGPA</p>
                  <p className="text-sm text-muted-foreground">Fall 2024 - Spring 2025</p>
                </div>
                <div className="text-2xl font-bold">3.70</div>
              </div>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Fall 2024</div>
                  <div>3.80</div>
                </div>
                <Progress value={95} className="h-2" />
                <div className="flex items-center justify-between text-sm">
                  <div className="font-medium">Spring 2025</div>
                  <div>3.60</div>
                </div>
                <Progress value={90} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Academic Standing</CardTitle>
            <CardDescription>Your current academic status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  <h3 className="font-medium text-green-600 dark:text-green-400">Good Standing</h3>
                </div>
                <p className="text-sm text-green-600/80 dark:text-green-400/80 mt-1">
                  Your academic performance meets or exceeds the required standards.
                </p>
              </div>

              <div className="space-y-2">
                <h3 className="font-medium">Honors Eligibility</h3>
                <div className="flex items-center justify-between text-sm">
                  <div>Dean's List (CGPA ≥ 3.5)</div>
                  <Badge variant="outline" className="bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400">
                    Eligible
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div>Summa Cum Laude (CGPA ≥ 3.9)</div>
                  <Badge variant="outline">Not Eligible</Badge>
                </div>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>Academic Requirements</AlertTitle>
                <AlertDescription>Maintain a minimum CGPA of 2.0 to remain in good academic standing.</AlertDescription>
              </Alert>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function SeatingArrangement() {
  // Sample seating data
  const upcomingExams = [
    {
      id: 1,
      subject: "Data Structures and Algorithms",
      code: "CS301",
      date: "May 15, 2025",
      time: "9:00 AM - 12:00 PM",
      venue: "Examination Hall A",
      block: "A",
      row: 3,
      seat: 12,
      invigilator: "Prof. Johnson",
    },
    {
      id: 2,
      subject: "Database Management Systems",
      code: "CS302",
      date: "May 18, 2025",
      time: "2:00 PM - 5:00 PM",
      venue: "Examination Hall B",
      block: "B",
      row: 5,
      seat: 8,
      invigilator: "Dr. Williams",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seating Arrangements</CardTitle>
        <CardDescription>View your assigned seats for upcoming examinations</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by subject or exam code..." className="pl-8" />
          </div>

          <div className="space-y-6">
            {upcomingExams.map((exam) => (
              <div key={exam.id} className="border rounded-lg overflow-hidden">
                <div className="bg-muted p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{exam.subject}</h3>
                      <p className="text-sm text-muted-foreground">Course Code: {exam.code}</p>
                    </div>
                    <Badge>Upcoming</Badge>
                  </div>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Date & Time</div>
                      <div className="font-medium">
                        {exam.date}, {exam.time}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="text-sm text-muted-foreground">Venue</div>
                      <div className="font-medium">{exam.venue}</div>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Block</div>
                      <div className="text-2xl font-bold">{exam.block}</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Row</div>
                      <div className="text-2xl font-bold">{exam.row}</div>
                    </div>
                    <div className="border rounded-lg p-3 text-center">
                      <div className="text-sm text-muted-foreground">Seat</div>
                      <div className="text-2xl font-bold">{exam.seat}</div>
                    </div>
                  </div>

                  <div className="text-sm">
                    <span className="text-muted-foreground">Invigilator:</span> {exam.invigilator}
                  </div>

                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Hall Ticket
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Important Notice</AlertTitle>
            <AlertDescription>
              Students must be seated 15 minutes before the examination starts. Late entry may not be permitted.
            </AlertDescription>
          </Alert>
        </div>
      </CardContent>
    </Card>
  )
}

function ExamRegistration() {
  // Sample registration data
  const availableExams = [
    {
      id: 1,
      subject: "Advanced Database Systems",
      code: "CS401",
      date: "June 10, 2025",
      time: "9:00 AM - 12:00 PM",
      fee: 500,
      deadline: "May 20, 2025",
      status: "open",
    },
    {
      id: 2,
      subject: "Artificial Intelligence",
      code: "CS402",
      date: "June 15, 2025",
      time: "2:00 PM - 5:00 PM",
      fee: 500,
      deadline: "May 25, 2025",
      status: "open",
    },
    {
      id: 3,
      subject: "Software Engineering",
      code: "CS403",
      date: "June 20, 2025",
      time: "9:00 AM - 12:00 PM",
      fee: 500,
      deadline: "May 30, 2025",
      status: "open",
    },
  ]

  const registeredExams = [
    {
      id: 4,
      subject: "Computer Graphics",
      code: "CS404",
      date: "June 25, 2025",
      time: "2:00 PM - 5:00 PM",
      fee: 500,
      paymentStatus: "paid",
      registrationDate: "April 15, 2025",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Available Examinations</CardTitle>
          <CardDescription>Register for upcoming examinations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableExams.map((exam) => (
              <div key={exam.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{exam.subject}</h3>
                    <p className="text-sm text-muted-foreground">Course Code: {exam.code}</p>
                  </div>
                  <Badge variant={exam.status === "open" ? "outline" : "secondary"}>
                    {exam.status === "open" ? "Registration Open" : "Closed"}
                  </Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{exam.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>Fee: ₹{exam.fee}</span>
                  </div>
                </div>
                <div className="mt-2 text-sm">
                  <span className="text-muted-foreground">Registration Deadline:</span> {exam.deadline}
                </div>
                <div className="mt-4 flex justify-end">
                  <Button size="sm">Register Now</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Registered Examinations</CardTitle>
          <CardDescription>Examinations you have already registered for</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {registeredExams.length > 0 ? (
              registeredExams.map((exam) => (
                <div key={exam.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{exam.subject}</h3>
                      <p className="text-sm text-muted-foreground">Course Code: {exam.code}</p>
                    </div>
                    <Badge variant="default">Registered</Badge>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{exam.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-green-500" />
                      <span className="text-green-500">Payment: {exam.paymentStatus}</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm">
                    <span className="text-muted-foreground">Registration Date:</span> {exam.registrationDate}
                  </div>
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      Download Receipt
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Registered Exams</h3>
                <p className="text-muted-foreground mt-1">You haven't registered for any examinations yet</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
