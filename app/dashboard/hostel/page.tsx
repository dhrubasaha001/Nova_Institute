"use client"

import { useState } from "react"
import { Building, Calendar, Filter, MessageSquare, Plus, Search, User } from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export default function HostelPage() {
  const [activeTab, setActiveTab] = useState("allotment")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Hostel Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="allotment">Room Allotment</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="visitors">Visitor Log</TabsTrigger>
          <TabsTrigger value="complaints">Complaints</TabsTrigger>
        </TabsList>

        <TabsContent value="allotment">
          <RoomAllotment />
        </TabsContent>

        <TabsContent value="maintenance">
          <MaintenanceRequests />
        </TabsContent>

        <TabsContent value="visitors">
          <VisitorLog />
        </TabsContent>

        <TabsContent value="complaints">
          <ComplaintForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function RoomAllotment() {
  const [block, setBlock] = useState("all")
  const [year, setYear] = useState("all")

  // Sample room data
  const rooms = [
    { id: 1, number: "A-101", block: "A", status: "occupied", student: "John Smith", year: "1st" },
    { id: 2, number: "A-102", block: "A", status: "vacant", student: "", year: "" },
    { id: 3, number: "A-103", block: "A", status: "occupied", student: "Michael Brown", year: "1st" },
    { id: 4, number: "B-201", block: "B", status: "occupied", student: "David Wilson", year: "2nd" },
    { id: 5, number: "B-202", block: "B", status: "maintenance", student: "", year: "" },
    { id: 6, number: "B-203", block: "B", status: "occupied", student: "Robert Johnson", year: "2nd" },
    { id: 7, number: "C-301", block: "C", status: "occupied", student: "James Davis", year: "3rd" },
    { id: 8, number: "C-302", block: "C", status: "vacant", student: "", year: "" },
    { id: 9, number: "C-303", block: "C", status: "occupied", student: "William Miller", year: "3rd" },
    { id: 10, number: "D-401", block: "D", status: "occupied", student: "Richard Moore", year: "4th" },
    { id: 11, number: "D-402", block: "D", status: "occupied", student: "Joseph Taylor", year: "4th" },
    { id: 12, number: "D-403", block: "D", status: "vacant", student: "", year: "" },
  ]

  // Filter rooms based on selected block and year
  const filteredRooms = rooms.filter((room) => {
    if (block !== "all" && room.block !== block) return false
    if (year !== "all" && room.year !== year) return false
    return true
  })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Room Allotment Status</CardTitle>
        <CardDescription>View and filter room allotment status by block and year</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filter:</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="block">Block</Label>
              <Select value={block} onValueChange={setBlock}>
                <SelectTrigger id="block">
                  <SelectValue placeholder="Select block" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All Blocks</SelectItem>
                  <SelectItem value="A">Block A</SelectItem>
                  <SelectItem value="B">Block B</SelectItem>
                  <SelectItem value="C">Block C</SelectItem>
                  <SelectItem value="D">Block D</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="year">Year</Label>
              <Select value={year} onValueChange={setYear}>
                <SelectTrigger id="year">
                  <SelectValue placeholder="Select year" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="1st">1st Year</SelectItem>
                  <SelectItem value="2nd">2nd Year</SelectItem>
                  <SelectItem value="3rd">3rd Year</SelectItem>
                  <SelectItem value="4th">4th Year</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRooms.map((room) => (
            <div key={room.id} className="border rounded-xl p-4 flex flex-col">
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{room.number}</span>
                </div>
                <Badge
                  variant={
                    room.status === "occupied" ? "default" : room.status === "vacant" ? "outline" : "destructive"
                  }
                >
                  {room.status}
                </Badge>
              </div>
              {room.status === "occupied" && (
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{room.student}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{room.year} Year</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MaintenanceRequests() {
  // Sample maintenance requests
  const requests = [
    {
      id: 1,
      room: "A-105",
      issue: "Leaking faucet in bathroom",
      status: "pending",
      date: "May 1, 2025",
      priority: "medium",
    },
    {
      id: 2,
      room: "B-202",
      issue: "Broken window",
      status: "in-progress",
      date: "April 29, 2025",
      priority: "high",
    },
    {
      id: 3,
      room: "C-304",
      issue: "Faulty electrical socket",
      status: "completed",
      date: "April 25, 2025",
      priority: "high",
    },
    {
      id: 4,
      room: "D-401",
      issue: "AC not cooling properly",
      status: "pending",
      date: "April 30, 2025",
      priority: "medium",
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Maintenance Requests</CardTitle>
          <CardDescription>Submit and track maintenance requests for your hostel room</CardDescription>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="mb-6">
                <Plus className="mr-2 h-4 w-4" />
                New Maintenance Request
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>New Maintenance Request</DialogTitle>
                <DialogDescription>Submit a new maintenance request for your hostel room</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="room" className="text-right">
                    Room
                  </Label>
                  <Input id="room" defaultValue="A-101" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="issue-type" className="text-right">
                    Issue Type
                  </Label>
                  <Select defaultValue="plumbing">
                    <SelectTrigger id="issue-type" className="col-span-3">
                      <SelectValue placeholder="Select issue type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plumbing">Plumbing</SelectItem>
                      <SelectItem value="electrical">Electrical</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="appliance">Appliance</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger id="priority" className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Textarea id="description" placeholder="Describe the issue in detail" className="col-span-3" />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit">Submit Request</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="space-y-4">
            {requests.map((request) => (
              <div key={request.id} className="border rounded-xl p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Room {request.room}
                    </h3>
                    <p className="text-sm text-muted-foreground">{request.date}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        request.priority === "high"
                          ? "destructive"
                          : request.priority === "medium"
                            ? "default"
                            : "outline"
                      }
                    >
                      {request.priority}
                    </Badge>
                    <Badge
                      variant={
                        request.status === "completed"
                          ? "outline"
                          : request.status === "in-progress"
                            ? "secondary"
                            : "default"
                      }
                    >
                      {request.status}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm">{request.issue}</p>
                {request.status !== "completed" && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="outline" size="sm">
                      Track Status
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function VisitorLog() {
  // Sample visitor log data
  const visitors = [
    {
      id: 1,
      name: "Sarah Johnson",
      relation: "Parent",
      room: "A-101",
      checkIn: "May 1, 2025 10:30 AM",
      checkOut: "May 1, 2025 12:45 PM",
    },
    {
      id: 2,
      name: "Mark Wilson",
      relation: "Sibling",
      room: "B-203",
      checkIn: "April 30, 2025 4:15 PM",
      checkOut: "April 30, 2025 6:30 PM",
    },
    {
      id: 3,
      name: "Emily Davis",
      relation: "Friend",
      room: "C-302",
      checkIn: "April 29, 2025 2:00 PM",
      checkOut: "April 29, 2025 5:20 PM",
    },
    {
      id: 4,
      name: "Thomas Brown",
      relation: "Guardian",
      room: "D-401",
      checkIn: "April 28, 2025 11:45 AM",
      checkOut: "April 28, 2025 1:30 PM",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visitor Entry Log</CardTitle>
        <CardDescription>View recent visitor entries to the hostel</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="relative mb-6">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search visitors..." className="pl-8" />
        </div>

        <div className="space-y-4">
          {visitors.map((visitor) => (
            <div key={visitor.id} className="border rounded-xl p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-medium">{visitor.name}</h3>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-sm text-muted-foreground">{visitor.relation}</p>
                    <p className="text-sm text-muted-foreground">Room: {visitor.room}</p>
                  </div>
                </div>
              </div>
              <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Check In:</span> {visitor.checkIn}
                </div>
                <div>
                  <span className="text-muted-foreground">Check Out:</span> {visitor.checkOut}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function ComplaintForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Anonymous Complaint Submission</CardTitle>
        <CardDescription>Submit anonymous complaints about hostel facilities or management</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="complaint-type">Complaint Type</Label>
            <Select>
              <SelectTrigger id="complaint-type">
                <SelectValue placeholder="Select complaint type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="facilities">Facilities</SelectItem>
                <SelectItem value="management">Management</SelectItem>
                <SelectItem value="roommate">Roommate</SelectItem>
                <SelectItem value="food">Food</SelectItem>
                <SelectItem value="security">Security</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hostel-block">Hostel Block (Optional)</Label>
            <Select>
              <SelectTrigger id="hostel-block">
                <SelectValue placeholder="Select hostel block" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="A">Block A</SelectItem>
                <SelectItem value="B">Block B</SelectItem>
                <SelectItem value="C">Block C</SelectItem>
                <SelectItem value="D">Block D</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="complaint-details">Complaint Details</Label>
            <Textarea
              id="complaint-details"
              placeholder="Describe your complaint in detail"
              className="min-h-[150px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="suggested-solution">Suggested Solution (Optional)</Label>
            <Textarea id="suggested-solution" placeholder="Suggest a solution to the issue" />
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" id="terms" className="rounded border-gray-300" />
            <Label htmlFor="terms" className="text-sm">
              I understand that this complaint will be submitted anonymously and I will not receive a direct response
            </Label>
          </div>

          <Button type="submit" className="w-full">
            <MessageSquare className="mr-2 h-4 w-4" />
            Submit Anonymous Complaint
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-start border-t px-6 py-4">
        <h4 className="font-medium">Note:</h4>
        <p className="text-sm text-muted-foreground">
          All complaints are submitted anonymously. For urgent matters requiring immediate attention, please contact the
          hostel warden directly.
        </p>
      </CardFooter>
    </Card>
  )
}
