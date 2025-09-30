'use client';

import { Menu } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { mockUser } from '@/lib/mockData';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 hover:bg-accent rounded-md transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">
              Welcome back, {mockUser.name.split(' ')[0]}!
            </h1>
            <p className="text-sm text-muted-foreground hidden sm:block">
              Here's what's happening with your finances today
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-9 w-9 border-2 border-border">
            <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
            <AvatarFallback>
              {mockUser.name
                .split(' ')
                .map((n) => n[0])
                .join('')}
            </AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}