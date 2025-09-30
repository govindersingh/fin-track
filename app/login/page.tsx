'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Wallet } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-accent/20 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-primary rounded-xl mb-4">
            <Wallet className="h-12 w-12 text-primary-foreground" />
          </div>
          <h1 className="text-4xl font-bold mb-2">FinTrack</h1>
          <p className="text-muted-foreground">
            Your personal finance tracking companion
          </p>
        </div>

        <Card className="border-2">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl">Welcome back</CardTitle>
            <CardDescription>
              Enter your email to access your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-11"
                />
              </div>
              <Button type="submit" className="w-full h-11" size="lg">
                Login
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button className="text-primary hover:underline font-medium">
                  Sign up
                </button>
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-border">
              <div className="text-xs text-center text-muted-foreground">
                <p>Demo app - No actual authentication required</p>
                <p className="mt-1">Simply enter any email and click Login</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Secure • Private • Easy to use</p>
        </div>
      </div>
    </div>
  );
}