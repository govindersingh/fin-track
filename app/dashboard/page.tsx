'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import RecentTransactions from '@/components/dashboard/RecentTransactions';
import { Button } from '@/components/ui/button';
import { Wallet, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import {
  getTotalBalance,
  getTotalIncome,
  getTotalExpense,
  formatCurrency,
} from '@/lib/mockData';

export default function DashboardPage() {
  const totalBalance = getTotalBalance();
  const totalIncome = getTotalIncome();
  const totalExpense = getTotalExpense();
  const savings = totalIncome - totalExpense;

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground mt-1">
              Overview of your financial status
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Account
            </Button>
            <Button variant="outline" className="gap-2">
              <Plus className="h-4 w-4" />
              Add Transaction
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Balance"
            value={formatCurrency(totalBalance)}
            icon={Wallet}
            description="Across all accounts"
          />
          <StatCard
            title="Total Income"
            value={formatCurrency(totalIncome)}
            icon={TrendingUp}
            description="All time earnings"
            trend={{ value: '+12.5%', isPositive: true }}
          />
          <StatCard
            title="Total Expense"
            value={formatCurrency(totalExpense)}
            icon={TrendingDown}
            description="All time spending"
            trend={{ value: '-8.2%', isPositive: true }}
          />
          <StatCard
            title="Savings"
            value={formatCurrency(savings)}
            icon={TrendingUp}
            description="Income minus expenses"
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <RecentTransactions />

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-border rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage your finances efficiently
              </p>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Wallet className="h-5 w-5" />
                  <span className="text-sm">Add Account</span>
                </Button>
                <Button variant="outline" className="h-auto py-4 flex-col gap-2">
                  <Plus className="h-5 w-5" />
                  <span className="text-sm">New Transaction</span>
                </Button>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">This Month Summary</h3>
              <div className="space-y-3 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Income</span>
                  <span className="font-semibold text-green-600">
                    {formatCurrency(148000)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Expense</span>
                  <span className="font-semibold text-red-600">
                    {formatCurrency(72000)}
                  </span>
                </div>
                <div className="h-px bg-border" />
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Net Savings</span>
                  <span className="font-bold text-lg">
                    {formatCurrency(76000)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}