"use client"

import { useState } from "react"
import { Calendar, Clock, FileText, Plus, Search, Stethoscope, User, FileCheck, Pill, History } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function MedicalPage() {
  const [activeTab, setActiveTab] = useState("appointments")

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Medical Center</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid grid-cols-4 w-full">
          <TabsTrigger value="appointments">Appointments</TabsTrigger>
          <TabsTrigger value="records">Health Records</TabsTrigger>
          <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
          <TabsTrigger value="history">Medical History</TabsTrigger>
        </TabsList>

        <TabsContent value="appointments">
          <AppointmentBooking />
        </TabsContent>

        <TabsContent value="records">
          <HealthRecords />
        </TabsContent>

        <TabsContent value="prescriptions">
          <Prescriptions />
        </TabsContent>

        <TabsContent value="history">
          <MedicalHistory />
        </TabsContent>
      </Tabs>
    </div>
  )
}

function AppointmentBooking() {
  const [appointmentType, setAppointmentType] = useState("general")

  // Sample doctors data
  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "General Physician",
      availability: ["Monday", "Wednesday", "Friday"],
      timings: "9:00 AM - 1:00 PM",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Orthopedic",
      availability: ["Tuesday", "Thursday"],
      timings: "2:00 PM - 6:00 PM",
    },
    {
      id: 3,
      name: "Dr. Emily Williams",
      specialty: "Psychiatrist",
      availability: ["Monday", "Thursday"],
      timings: "10:00 AM - 2:00 PM",
    },
    {
      id: 4,
      name: "Dr. Robert Davis",
      specialty: "Dermatologist",
      availability: ["Wednesday", "Friday"],
      timings: "11:00 AM - 3:00 PM",
    },
  ]

  // Sample upcoming appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "May 5, 2025",
      time: "10:30 AM",
      type: "General Checkup",
      status: "confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      date: "May 12, 2025",
      time: "3:15 PM",
      type: "Follow-up",
      status: "pending",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Book an Appointment</CardTitle>
          <CardDescription>Schedule an appointment with a doctor at the campus medical center</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Appointment Type</Label>
              <RadioGroup defaultValue="general" onValueChange={setAppointmentType}>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      appointmentType === "general" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="general" id="general" className="sr-only" />
                    <Label htmlFor="general" className="flex flex-col items-center gap-2 cursor-pointer">
                      <Stethoscope className="h-8 w-8 text-muted-foreground" />
                      <span className="font-medium">General Checkup</span>
                      <span className="text-xs text-muted-foreground">Routine health examination</span>
                    </Label>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      appointmentType === "specialist" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="specialist" id="specialist" className="sr-only" />
                    <Label htmlFor="specialist" className="flex flex-col items-center gap-2 cursor-pointer">
                      <User className="h-8 w-8 text-muted-foreground" />
                      <span className="font-medium">Specialist Consultation</span>
                      <span className="text-xs text-muted-foreground">See a specialist doctor</span>
                    </Label>
                  </div>
                  <div
                    className={`border rounded-lg p-4 cursor-pointer ${
                      appointmentType === "emergency" ? "border-primary bg-primary/5" : ""
                    }`}
                  >
                    <RadioGroupItem value="emergency" id="emergency" className="sr-only" />
                    <Label htmlFor="emergency" className="flex flex-col items-center gap-2 cursor-pointer">
                      <FileCheck className="h-8 w-8 text-muted-foreground" />
                      <span className="font-medium">Follow-up</span>
                      <span className="text-xs text-muted-foreground">Follow-up on previous visit</span>
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="doctor">Select Doctor</Label>
                <Select>
                  <SelectTrigger id="doctor">
                    <SelectValue placeholder="Choose a doctor" />
                  </SelectTrigger>
                  <SelectContent>
                    {doctors.map((doctor) => (
                      <SelectItem key={doctor.id} value={doctor.id.toString()}>
                        {doctor.name} ({doctor.specialty})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Preferred Date</Label>
                <Input id="date" type="date" min={new Date().toISOString().split("T")[0]} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="time">Preferred Time</Label>
                <Select>
                  <SelectTrigger id="time">
                    <SelectValue placeholder="Select time slot" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="9:00">9:00 AM</SelectItem>
                    <SelectItem value="10:00">10:00 AM</SelectItem>
                    <SelectItem value="11:00">11:00 AM</SelectItem>
                    <SelectItem value="12:00">12:00 PM</SelectItem>
                    <SelectItem value="14:00">2:00 PM</SelectItem>
                    <SelectItem value="15:00">3:00 PM</SelectItem>
                    <SelectItem value="16:00">4:00 PM</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="reason">Reason for Visit</Label>
                <Input id="reason" placeholder="Brief description of your health concern" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="symptoms">Symptoms (Optional)</Label>
              <Textarea
                id="symptoms"
                placeholder="Describe any symptoms you're experiencing"
                className="min-h-[100px]"
              />
            </div>

            <div className="flex justify-end">
              <Button>
                <Calendar className="mr-2 h-4 w-4" />
                Book Appointment
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>Your scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment) => (
                <div key={appointment.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{appointment.doctor}</h3>
                      <p className="text-sm text-muted-foreground">{appointment.type}</p>
                    </div>
                    <Badge variant={appointment.status === "confirmed" ? "default" : "secondary"}>
                      {appointment.status}
                    </Badge>
                  </div>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{appointment.time}</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="destructive" size="sm">
                      Cancel
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium">No Appointments</h3>
                <p className="text-muted-foreground mt-1">You don't have any upcoming appointments</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function HealthRecords() {
  // Sample health records
  const healthRecords = [
    {
      id: 1,
      type: "Blood Test",
      date: "April 15, 2025",
      doctor: "Dr. Sarah Johnson",
      status: "normal",
      details: "Complete Blood Count (CBC)",
    },
    {
      id: 2,
      type: "X-Ray",
      date: "March 10, 2025",
      doctor: "Dr. Michael Chen",
      status: "normal",
      details: "Chest X-Ray",
    },
    {
      id: 3,
      type: "Vaccination",
      date: "February 5, 2025",
      doctor: "Dr. Emily Williams",
      status: "completed",
      details: "COVID-19 Booster",
    },
  ]

  // Sample health metrics
  const healthMetrics = {
    height: "175 cm",
    weight: "68 kg",
    bmi: "22.2",
    bloodPressure: "120/80 mmHg",
    bloodGroup: "O+",
    allergies: ["Peanuts", "Penicillin"],
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Health Records</CardTitle>
          <CardDescription>View your medical test reports and records</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative mb-6">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search records..." className="pl-8" />
          </div>

          <div className="space-y-4">
            {healthRecords.map((record) => (
              <div key={record.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">{record.type}</h3>
                    <p className="text-sm text-muted-foreground">{record.details}</p>
                  </div>
                  <Badge
                    variant={
                      record.status === "normal"
                        ? "outline"
                        : record.status === "abnormal"
                          ? "destructive"
                          : "secondary"
                    }
                  >
                    {record.status}
                  </Badge>
                </div>
                <div className="mt-2 space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{record.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span>{record.doctor}</span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end">
                  <Button variant="outline" size="sm">
                    <FileText className="mr-2 h-4 w-4" />
                    View Report
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline">
              <Plus className="mr-2 h-4 w-4" />
              Upload New Record
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Health Profile</CardTitle>
          <CardDescription>Your basic health information</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Height</div>
                <div className="text-lg font-medium">{healthMetrics.height}</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Weight</div>
                <div className="text-lg font-medium">{healthMetrics.weight}</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">BMI</div>
                <div className="text-lg font-medium">{healthMetrics.bmi}</div>
              </div>
              <div className="border rounded-lg p-3">
                <div className="text-sm text-muted-foreground">Blood Group</div>
                <div className="text-lg font-medium">{healthMetrics.bloodGroup}</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Blood Pressure</h3>
              <div className="border rounded-lg p-3">
                <div className="text-lg font-medium">{healthMetrics.bloodPressure}</div>
                <div className="text-xs text-muted-foreground">Last checked: April 15, 2025</div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">Allergies</h3>
              <div className="flex flex-wrap gap-2">
                {healthMetrics.allergies.map((allergy, index) => (
                  <Badge key={index} variant="secondary">
                    {allergy}
                  </Badge>
                ))}
                <Button variant="outline" size="sm" className="h-6">
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              Update Health Information
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function Prescriptions() {
  // Sample prescriptions
  const prescriptions = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "April 20, 2025",
      diagnosis: "Seasonal Allergies",
      medications: [
        { name: "Cetirizine", dosage: "10mg", frequency: "Once daily", duration: "7 days" },
        { name: "Fluticasone Nasal Spray", dosage: "2 sprays", frequency: "Twice daily", duration: "7 days" },
      ],
      active: true,
    },
    {
      id: 2,
      doctor: "Dr. Michael Chen",
      date: "March 15, 2025",
      diagnosis: "Muscle Strain",
      medications: [
        { name: "Ibuprofen", dosage: "400mg", frequency: "Three times daily", duration: "5 days" },
        { name: "Muscle Relaxant Gel", dosage: "Apply locally", frequency: "Twice daily", duration: "7 days" },
      ],
      active: false,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescriptions</CardTitle>
        <CardDescription>View and manage your medical prescriptions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Active Prescriptions</h3>
            <Button variant="outline" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Add Prescription
            </Button>
          </div>

          <div className="space-y-4">
            {prescriptions
              .filter((prescription) => prescription.active)
              .map((prescription) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{prescription.diagnosis}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">Dr. {prescription.doctor}</p>
                        <p className="text-sm text-muted-foreground">{prescription.date}</p>
                      </div>
                    </div>
                    <Badge>Active</Badge>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-3">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Pill className="h-5 w-5 text-primary mt-0.5" />
                        <div>
                          <div className="font-medium">
                            {medication.name} ({medication.dosage})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {medication.frequency} for {medication.duration}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-end gap-2">
                    <Button variant="outline" size="sm">
                      <FileText className="mr-2 h-4 w-4" />
                      View Details
                    </Button>
                    <Button size="sm">
                      <Plus className="mr-2 h-4 w-4" />
                      Refill
                    </Button>
                  </div>
                </div>
              ))}
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-medium">Past Prescriptions</h3>
            {prescriptions
              .filter((prescription) => !prescription.active)
              .map((prescription) => (
                <div key={prescription.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium">{prescription.diagnosis}</h3>
                      <div className="flex items-center gap-4 mt-1">
                        <p className="text-sm text-muted-foreground">Dr. {prescription.doctor}</p>
                        <p className="text-sm text-muted-foreground">{prescription.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline">Completed</Badge>
                  </div>

                  <Separator className="my-3" />

                  <div className="space-y-3">
                    {prescription.medications.map((medication, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Pill className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div>
                          <div className="font-medium">
                            {medication.name} ({medication.dosage})
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {medication.frequency} for {medication.duration}
                          </div>
                        </div>
                      </div>
                    ))}
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
        </div>
      </CardContent>
    </Card>
  )
}

function MedicalHistory() {
  // Sample medical history
  const medicalHistory = [
    {
      id: 1,
      condition: "Appendectomy",
      date: "June 2023",
      details: "Surgical removal of appendix",
      hospital: "City General Hospital",
      doctor: "Dr. Robert Davis",
    },
    {
      id: 2,
      condition: "Fractured Wrist",
      date: "August 2022",
      details: "Right wrist fracture from sports injury",
      hospital: "University Medical Center",
      doctor: "Dr. Michael Chen",
    },
    {
      id: 3,
      condition: "Chicken Pox",
      date: "March 2010",
      details: "Childhood illness",
      hospital: "Community Health Center",
      doctor: "Dr. Emily Williams",
    },
  ]

  // Sample family medical history
  const familyHistory = [
    { condition: "Diabetes", relation: "Father" },
    { condition: "Hypertension", relation: "Mother" },
    { condition: "Asthma", relation: "Sibling" },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Medical History</CardTitle>
          <CardDescription>Your past medical conditions and treatments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {medicalHistory.map((item) => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-medium">{item.condition}</h3>
                    <Badge variant="outline">{item.date}</Badge>
                  </div>
                  <p className="text-sm mb-3">{item.details}</p>
                  <div className="text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span>{item.doctor}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Stethoscope className="h-4 w-4" />
                      <span>{item.hospital}</span>
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

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Medical History
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add Medical History</DialogTitle>
                  <DialogDescription>Add details about past medical conditions or treatments</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="condition" className="text-right">
                      Condition
                    </Label>
                    <Input id="condition" placeholder="Medical condition" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="date" className="text-right">
                      Date
                    </Label>
                    <Input id="date" type="month" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="doctor" className="text-right">
                      Doctor
                    </Label>
                    <Input id="doctor" placeholder="Doctor's name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="hospital" className="text-right">
                      Hospital
                    </Label>
                    <Input id="hospital" placeholder="Hospital name" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="details" className="text-right">
                      Details
                    </Label>
                    <Textarea id="details" placeholder="Additional details" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Family Medical History</CardTitle>
          <CardDescription>Medical conditions in your family</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="space-y-4">
              {familyHistory.map((item, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">{item.condition}</h3>
                    <Badge variant="outline">{item.relation}</Badge>
                  </div>
                </div>
              ))}
            </div>

            <Button variant="outline" className="w-full">
              <Plus className="mr-2 h-4 w-4" />
              Add Family History
            </Button>

            <Alert>
              <History className="h-4 w-4" />
              <AlertTitle>Why is this important?</AlertTitle>
              <AlertDescription>
                Family medical history helps doctors identify patterns and potential health risks that may be genetic.
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
