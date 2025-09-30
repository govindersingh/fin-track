'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { LayoutDashboard, Wallet, ArrowLeftRight, ChartPie as PieChart, Settings, X } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Accounts',
    href: '/accounts',
    icon: Wallet,
  },
  {
    label: 'Transactions',
    href: '/transactions',
    icon: ArrowLeftRight,
  },
  {
    label: 'Reports',
    href: '/reports',
    icon: PieChart,
  },
  {
    label: 'Settings',
    href: '/settings',
    icon: Settings,
  },
];

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed left-0 top-0 z-50 h-full w-64 bg-card border-r border-border transition-transform duration-300 lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <div className="flex items-center gap-2">
              <Wallet className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold">FinTrack</span>
            </div>
            <button
              onClick={onClose}
              className="lg:hidden p-1 hover:bg-accent rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200',
                    isActive
                      ? 'bg-primary text-primary-foreground font-medium shadow-sm'
                      : 'text-muted-foreground hover:bg-accent hover:text-foreground'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-border">
            <div className="bg-accent/50 rounded-lg p-4">
              <p className="text-sm font-medium mb-1">Free Plan</p>
              <p className="text-xs text-muted-foreground mb-3">
                Upgrade to unlock premium features
              </p>
              <button className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}