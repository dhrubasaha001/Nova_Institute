// app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WelcomeBanner } from "@/components/welcome-banner";
import { QuickLinks } from "@/components/quick-links";
import { Announcements } from "@/components/announcements";
import { RoleSwitcher } from "@/components/role-switcher";

export default function Dashboard() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "faculty" | "admin">("student");

  return (
    <main className="p-4">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <RoleSwitcher role={role} setRole={setRole} />
        </div>

        <WelcomeBanner role={role} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Tabs defaultValue="announcements">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="announcements">Announcements</TabsTrigger>
                <TabsTrigger value="notices">Notices</TabsTrigger>
              </TabsList>
              <TabsContent value="announcements" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Announcements</CardTitle>
                    <CardDescription>Stay updated with the latest announcements from the institute</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Announcements role={role} />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="notices" className="mt-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Important Notices</CardTitle>
                    <CardDescription>Check important notices and updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Announcements role={role} type="notice" />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Quick Links</CardTitle>
                <CardDescription>Access frequently used services</CardDescription>
              </CardHeader>
              <CardContent>
                <QuickLinks role={role} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
