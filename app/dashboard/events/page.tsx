"use client"

import { useState } from "react"
import {
  Calendar,
  Clock,
  Copy,
  Edit,
  Eye,
  FileText,
  ImageIcon,
  Layers,
  Plus,
  Save,
  Share2,
  Trash,
  Users,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import Image from "next/image"

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState("builder")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Event / Club Landing Page</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full">
          <TabsTrigger value="builder">Page Builder</TabsTrigger>
          <TabsTrigger value="preview">Live Preview</TabsTrigger>
          <TabsTrigger value="templates">Templates</TabsTrigger>
        </TabsList>

        <TabsContent value="builder">
          <PageBuilder />
        </TabsContent>

        <TabsContent value="preview">
          <LivePreview />
        </TabsContent>

        <TabsContent value="templates">
          <Templates />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function PageBuilder() {
  const [pageType, setPageType] = useState("event")

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>Page Builder</CardTitle>
            <CardDescription>Create a landing page for your event, course, or club</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="page-type">Page Type</Label>
                <Select value={pageType} onValueChange={setPageType}>
                  <SelectTrigger id="page-type">
                    <SelectValue placeholder="Select page type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="event">Event</SelectItem>
                    <SelectItem value="course">Course</SelectItem>
                    <SelectItem value="club">Club</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder={`Enter ${pageType} title`}
                  defaultValue={
                    pageType === "event"
                      ? "Annual Tech Fest 2025"
                      : pageType === "course"
                        ? "Introduction to AI"
                        : "Robotics Club"
                  }
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pageType === "event" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" defaultValue="2025-05-15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" defaultValue="10:00" />
                    </div>
                  </>
                )}

                {pageType === "course" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Start Date</Label>
                      <Input id="start-date" type="date" defaultValue="2025-05-15" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="duration">Duration</Label>
                      <Input id="duration" placeholder="e.g., 8 weeks" defaultValue="6 weeks" />
                    </div>
                  </>
                )}

                {pageType === "club" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="meeting-day">Meeting Day</Label>
                      <Select defaultValue="friday">
                        <SelectTrigger id="meeting-day">
                          <SelectValue placeholder="Select day" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monday">Monday</SelectItem>
                          <SelectItem value="tuesday">Tuesday</SelectItem>
                          <SelectItem value="wednesday">Wednesday</SelectItem>
                          <SelectItem value="thursday">Thursday</SelectItem>
                          <SelectItem value="friday">Friday</SelectItem>
                          <SelectItem value="saturday">Saturday</SelectItem>
                          <SelectItem value="sunday">Sunday</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meeting-time">Meeting Time</Label>
                      <Input id="meeting-time" type="time" defaultValue="16:00" />
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Enter location"
                  defaultValue={
                    pageType === "event"
                      ? "Main Auditorium"
                      : pageType === "course"
                        ? "Room 301, CS Building"
                        : "Robotics Lab, Engineering Block"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="banner">Banner Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  <div className="text-sm text-muted-foreground text-center">
                    Drag and drop an image here, or click to browse
                  </div>
                  <Input id="banner" type="file" className="hidden" />
                  <Button variant="outline" size="sm" onClick={() => document.getElementById("banner")?.click()}>
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder={`Enter ${pageType} description`}
                  className="min-h-[150px]"
                  defaultValue={
                    pageType === "event"
                      ? "Join us for the Annual Tech Fest 2025, featuring exciting competitions, workshops, and guest speakers from leading tech companies. Don't miss this opportunity to showcase your skills and network with industry professionals."
                      : pageType === "course"
                        ? "This course provides a comprehensive introduction to Artificial Intelligence. Learn about machine learning, neural networks, and practical applications of AI in various industries. No prior experience required."
                        : "The Robotics Club is a community of students passionate about robotics and automation. We work on exciting projects, participate in competitions, and organize workshops to help members develop their skills."
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Registration Options</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="registration" defaultChecked />
                    <Label htmlFor="registration">Enable Registration</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="limit" />
                    <Label htmlFor="limit">Limit Participants</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="button-text">Registration Button Text</Label>
                <Input
                  id="button-text"
                  placeholder="e.g., Register Now"
                  defaultValue={
                    pageType === "event"
                      ? "Register for Event"
                      : pageType === "course"
                        ? "Enroll in Course"
                        : "Join Club"
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Additional Sections</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="schedule" defaultChecked />
                    <Label htmlFor="schedule">Schedule</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="speakers" defaultChecked={pageType === "event"} />
                    <Label htmlFor="speakers">
                      {pageType === "event" ? "Speakers" : pageType === "course" ? "Instructors" : "Leaders"}
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="faq" defaultChecked />
                    <Label htmlFor="faq">FAQ</Label>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline">
              <Save className="mr-2 h-4 w-4" />
              Save Draft
            </Button>
            <Button>
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Page Settings</CardTitle>
            <CardDescription>Configure additional settings for your page</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Color Theme</Label>
                <Select defaultValue="blue">
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blue">Blue</SelectItem>
                    <SelectItem value="purple">Purple</SelectItem>
                    <SelectItem value="green">Green</SelectItem>
                    <SelectItem value="red">Red</SelectItem>
                    <SelectItem value="orange">Orange</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="layout">Layout Style</Label>
                <Select defaultValue="modern">
                  <SelectTrigger id="layout">
                    <SelectValue placeholder="Select layout" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="modern">Modern</SelectItem>
                    <SelectItem value="classic">Classic</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Visibility</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="public" defaultChecked />
                    <Label htmlFor="public">Public Page</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="featured" />
                    <Label htmlFor="featured">Featured on Institute Homepage</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Export Options</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <FileText className="mr-2 h-4 w-4" />
                    Export as PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Copy className="mr-2 h-4 w-4" />
                    Copy Link
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Page
                  </Button>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Page Actions</Label>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Template
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-destructive hover:text-destructive">
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Page
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function LivePreview() {
  // Sample event page preview
  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-t-lg overflow-hidden">
          <div className="bg-gradient-to-r from-violet-600 to-blue-500 h-48 flex items-center justify-center">
            <div className="text-center text-white p-6">
              <h1 className="text-3xl font-bold mb-2">Annual Tech Fest 2025</h1>
              <p className="text-lg opacity-90">Innovate. Create. Elevate.</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>May 15, 2025</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-muted-foreground" />
              <span>10:00 AM - 5:00 PM</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-muted-foreground" />
              <span>Main Auditorium</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">About the Event</h2>
            <p className="text-muted-foreground">
              Join us for the Annual Tech Fest 2025, featuring exciting competitions, workshops, and guest speakers from
              leading tech companies. Don't miss this opportunity to showcase your skills and network with industry
              professionals.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Event Schedule</h2>
            <div className="space-y-3">
              <div className="border rounded-lg p-3">
                <div className="font-medium">Opening Ceremony</div>
                <div className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-medium">Technical Workshops</div>
                <div className="text-sm text-muted-foreground">11:00 AM - 1:00 PM</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-medium">Lunch Break</div>
                <div className="text-sm text-muted-foreground">1:00 PM - 2:00 PM</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-medium">Hackathon</div>
                <div className="text-sm text-muted-foreground">2:00 PM - 4:30 PM</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="font-medium">Prize Distribution</div>
                <div className="text-sm text-muted-foreground">4:30 PM - 5:00 PM</div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-bold">Speakers</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-muted mb-3 overflow-hidden">
                  <Image src="/placeholder.svg?height=80&width=80" alt="Speaker" width={80} height={80} />
                </div>
                <div className="font-medium">Dr. Sarah Johnson</div>
                <div className="text-sm text-muted-foreground">AI Research Lead, TechCorp</div>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-muted mb-3 overflow-hidden">
                  <Image src="/placeholder.svg?height=80&width=80" alt="Speaker" width={80} height={80} />
                </div>
                <div className="font-medium">Prof. Michael Chen</div>
                <div className="text-sm text-muted-foreground">Robotics Expert, Nova Institute</div>
              </div>
              <div className="border rounded-lg p-4 flex flex-col items-center text-center">
                <div className="w-20 h-20 rounded-full bg-muted mb-3 overflow-hidden">
                  <Image src="/placeholder.svg?height=80&width=80" alt="Speaker" width={80} height={80} />
                </div>
                <div className="font-medium">Raj Patel</div>
                <div className="text-sm text-muted-foreground">CTO, Future Technologies</div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-6">
            <Button size="lg" className="px-8">
              Register for Event
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function Templates() {
  // Sample templates
  const templates = [
    {
      id: 1,
      title: "Tech Conference",
      type: "Event",
      image: "/placeholder.svg?height=200&width=400",
      description: "Perfect for tech events, conferences, and workshops",
    },
    {
      id: 2,
      title: "Online Course",
      type: "Course",
      image: "/placeholder.svg?height=200&width=400",
      description: "Ideal for showcasing course content and enrollment details",
    },
    {
      id: 3,
      title: "Student Club",
      type: "Club",
      image: "/placeholder.svg?height=200&width=400",
      description: "Great for student clubs, societies, and interest groups",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Page Templates</CardTitle>
        <CardDescription>Choose from pre-made templates to get started quickly</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id} className="border rounded-xl overflow-hidden">
              <Image
                src={template.image || "/placeholder.svg"}
                alt={template.title}
                width={400}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium">{template.title}</h3>
                  <Badge variant="outline">{template.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{template.description}</p>
                <div className="flex justify-between">
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button size="sm">
                    <Layers className="mr-2 h-4 w-4" />
                    Use Template
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-center">
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Create Custom Template
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
