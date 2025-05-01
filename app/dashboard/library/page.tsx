"use client"

import { useState } from "react"
import { BookOpen, Calendar, Clock, Plus, Search, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function LibraryPage() {
  const [activeTab, setActiveTab] = useState("search")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Library Zone</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="search">Book Search</TabsTrigger>
          <TabsTrigger value="reservation">Seat Reservation</TabsTrigger>
          <TabsTrigger value="request">Request Book</TabsTrigger>
          <TabsTrigger value="overdue">Overdue Books</TabsTrigger>
        </TabsList>

        <TabsContent value="search">
          <BookSearch />
        </TabsContent>

        <TabsContent value="reservation">
          <SeatReservation />
        </TabsContent>

        <TabsContent value="request">
          <RequestBook />
        </TabsContent>

        <TabsContent value="overdue">
          <OverdueBooks />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function BookSearch() {
  const [department, setDepartment] = useState("all")

  // Sample book data
  const books = [
    {
      id: 1,
      title: "Introduction to Algorithms",
      author: "Thomas H. Cormen",
      department: "Computer Science",
      available: true,
      location: "Shelf A-12",
    },
    {
      id: 2,
      title: "Data Structures and Algorithms",
      author: "Robert Lafore",
      department: "Computer Science",
      available: false,
      location: "Shelf A-15",
    },
    {
      id: 3,
      title: "Engineering Mathematics",
      author: "B.S. Grewal",
      department: "Mathematics",
      available: true,
      location: "Shelf B-05",
    },
    {
      id: 4,
      title: "Principles of Physics",
      author: "Resnick & Halliday",
      department: "Physics",
      available: true,
      location: "Shelf C-08",
    },
    {
      id: 5,
      title: "Organic Chemistry",
      author: "Morrison & Boyd",
      department: "Chemistry",
      available: false,
      location: "Shelf D-10",
    },
    {
      id: 6,
      title: "Digital Logic Design",
      author: "Morris Mano",
      department: "Electronics",
      available: true,
      location: "Shelf E-03",
    },
  ]

  // Filter books based on selected department
  const filteredBooks = department === "all" ? books : books.filter((book) => book.department === department)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Book Search</CardTitle>
        <CardDescription>Search for books in the library by title, author, or department</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search by title or author..." className="pl-8" />
          </div>
          <div className="w-full md:w-[200px]">
            <Select value={department} onValueChange={setDepartment}>
              <SelectTrigger>
                <SelectValue placeholder="Department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                <SelectItem value="Computer Science">Computer Science</SelectItem>
                <SelectItem value="Mathematics">Mathematics</SelectItem>
                <SelectItem value="Physics">Physics</SelectItem>
                <SelectItem value="Chemistry">Chemistry</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredBooks.map((book) => (
            <div key={book.id} className="border rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">by {book.author}</p>
                </div>
                <Badge variant={book.available ? "outline" : "secondary"}>
                  {book.available ? "Available" : "Checked Out"}
                </Badge>
              </div>
              <div className="mt-2 space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{book.department}</span>
                </div>
                {book.available && (
                  <div className="flex items-center gap-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span>{book.location}</span>
                  </div>
                )}
              </div>
              {book.available && (
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    Reserve
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SeatReservation() {
  const [date, setDate] = useState("")
  const [timeSlot, setTimeSlot] = useState("")

  // Sample time slots
  const timeSlots = [
    { id: 1, time: "9:00 AM - 11:00 AM", available: 15 },
    { id: 2, time: "11:00 AM - 1:00 PM", available: 8 },
    { id: 3, time: "1:00 PM - 3:00 PM", available: 20 },
    { id: 4, time: "3:00 PM - 5:00 PM", available: 12 },
    { id: 5, time: "5:00 PM - 7:00 PM", available: 18 },
    { id: 6, time: "7:00 PM - 9:00 PM", available: 5 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Seat Reservation</CardTitle>
        <CardDescription>Reserve a seat in the library for your study sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="space-y-2">
            <Label htmlFor="date">Select Date</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="area">Study Area</Label>
            <Select>
              <SelectTrigger id="area">
                <SelectValue placeholder="Select area" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="main">Main Reading Hall</SelectItem>
                <SelectItem value="quiet">Quiet Study Zone</SelectItem>
                <SelectItem value="group">Group Study Rooms</SelectItem>
                <SelectItem value="digital">Digital Library</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Available Time Slots</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {timeSlots.map((slot) => (
              <div
                key={slot.id}
                className={`border rounded-xl p-4 cursor-pointer transition-colors ${
                  timeSlot === slot.time ? "border-primary bg-primary/5" : "hover:border-primary/50"
                }`}
                onClick={() => setTimeSlot(slot.time)}
              >
                <div className="flex flex-col items-center text-center gap-2">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{slot.time}</p>
                    <p className="text-sm text-muted-foreground">{slot.available} seats available</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end mt-6">
            <Button disabled={!date || !timeSlot}>Reserve Seat</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RequestBook() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Request New Book</CardTitle>
        <CardDescription>Submit a request for the library to acquire a new book</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="book-title">Book Title</Label>
              <Input id="book-title" placeholder="Enter book title" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input id="author" placeholder="Enter author name" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN (if known)</Label>
              <Input id="isbn" placeholder="Enter ISBN" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Select>
                <SelectTrigger id="department">
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cs">Computer Science</SelectItem>
                  <SelectItem value="math">Mathematics</SelectItem>
                  <SelectItem value="physics">Physics</SelectItem>
                  <SelectItem value="chemistry">Chemistry</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason for Request</Label>
            <Textarea
              id="reason"
              placeholder="Explain why this book would be valuable for the library"
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-info">Additional Information (Optional)</Label>
            <Textarea
              id="additional-info"
              placeholder="Any additional information about the book or where to find it"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Plus className="mr-2 h-4 w-4" />
              Submit Request
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

function OverdueBooks() {
  // Sample overdue books
  const overdueBooks = [
    {
      id: 1,
      title: "Data Structures and Algorithms",
      dueDate: "April 25, 2025",
      daysOverdue: 6,
      fine: 30,
    },
    {
      id: 2,
      title: "Computer Networks",
      dueDate: "April 28, 2025",
      daysOverdue: 3,
      fine: 15,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Overdue Books</CardTitle>
        <CardDescription>Check your overdue books and pending fines</CardDescription>
      </CardHeader>
      <CardContent>
        {overdueBooks.length > 0 ? (
          <>
            <Alert variant="destructive" className="mb-6">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Attention Required</AlertTitle>
              <AlertDescription>
                You have {overdueBooks.length} overdue book(s). Please return them as soon as possible to avoid
                additional fines.
              </AlertDescription>
            </Alert>

            <div className="space-y-4">
              {overdueBooks.map((book) => (
                <div key={book.id} className="border border-destructive/50 rounded-xl p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{book.title}</h3>
                      <p className="text-sm text-muted-foreground">Due on: {book.dueDate}</p>
                    </div>
                    <Badge variant="destructive">{book.daysOverdue} days overdue</Badge>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Current fine: ₹{book.fine}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Renew
                    </Button>
                    <Button size="sm">Pay Fine</Button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium">No Overdue Books</h3>
            <p className="text-muted-foreground mt-1">You don't have any overdue books at the moment.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
