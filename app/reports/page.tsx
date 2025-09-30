'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import IncomeExpenseChart from '@/components/reports/IncomeExpenseChart';
import ExpenseBreakdownChart from '@/components/reports/ExpenseBreakdownChart';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';
import { formatCurrency } from '@/lib/mockData';

export default function ReportsPage() {
  const thisMonthIncome = 148000;
  const thisMonthExpense = 72000;
  const thisMonthSavings = thisMonthIncome - thisMonthExpense;
  const savingsRate = ((thisMonthSavings / thisMonthIncome) * 100).toFixed(1);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Reports</h2>
          <p className="text-muted-foreground mt-1">
            Detailed analytics and insights into your finances
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  This Month Income
                </p>
                <h3 className="text-3xl font-bold text-green-600">
                  {formatCurrency(thisMonthIncome)}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  September 2025
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <TrendingDown className="h-6 w-6 text-red-600" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  This Month Expense
                </p>
                <h3 className="text-3xl font-bold text-red-600">
                  {formatCurrency(thisMonthExpense)}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  September 2025
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-primary/20 rounded-lg">
                  <PiggyBank className="h-6 w-6 text-primary" />
                </div>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  This Month Savings
                </p>
                <h3 className="text-3xl font-bold">
                  {formatCurrency(thisMonthSavings)}
                </h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {savingsRate}% savings rate
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <IncomeExpenseChart />
          <ExpenseBreakdownChart />
        </div>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Financial Insights</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="p-2 bg-green-500/20 rounded">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    Great savings rate this month!
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    You saved {savingsRate}% of your income. Keep up the good work!
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-primary/5 border border-border rounded-lg">
                <div className="p-2 bg-primary/20 rounded">
                  <PiggyBank className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">Spending pattern</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your highest expense category is Bills at{' '}
                    {formatCurrency(29648)}. Consider reviewing subscriptions.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}