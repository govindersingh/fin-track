'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { mockUser } from '@/lib/mockData';
import { User, Mail, CreditCard, Shield, Bell, Palette } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
          <p className="text-muted-foreground mt-1">
            Manage your account settings and preferences
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <Avatar className="h-24 w-24 border-2 border-border">
                  <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                  <AvatarFallback className="text-2xl">
                    {mockUser.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Button variant="outline" size="sm">
                    Change Avatar
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">{mockUser.name}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>

                <div className="flex items-center gap-3 p-4 bg-accent/30 rounded-lg">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1">
                    <p className="text-sm text-muted-foreground">Email Address</p>
                    <p className="font-medium">{mockUser.email}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Subscription</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-6 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-border">
                <Badge className="mb-2">Current Plan</Badge>
                <h3 className="text-2xl font-bold mb-1">Free Plan</h3>
                <p className="text-sm text-muted-foreground">
                  Basic features included
                </p>
              </div>
              <Button className="w-full" size="lg">
                <CreditCard className="mr-2 h-4 w-4" />
                Upgrade to Paid Plan
              </Button>
              <div className="text-xs text-muted-foreground text-center">
                Unlock premium features with our paid plan
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Email Notifications</p>
                  <p className="text-xs text-muted-foreground">
                    Receive updates via email
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Transaction Alerts</p>
                  <p className="text-xs text-muted-foreground">
                    Get notified of new transactions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Monthly Reports</p>
                  <p className="text-xs text-muted-foreground">
                    Monthly financial summaries
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Configure
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Change Password</p>
                  <p className="text-xs text-muted-foreground">
                    Update your password
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Change
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Two-Factor Auth</p>
                  <p className="text-xs text-muted-foreground">
                    Add extra security layer
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 bg-accent/30 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Active Sessions</p>
                  <p className="text-xs text-muted-foreground">
                    Manage your sessions
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-accent/30 rounded-lg">
              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Currently using dark theme
                </p>
              </div>
              <Button variant="outline">Change Theme</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}