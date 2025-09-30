'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { monthlyData } from '@/lib/mockData';

export default function IncomeExpenseChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <p className="text-sm text-muted-foreground">
          Monthly comparison of your earnings and spending
        </p>
      </CardHeader>
      <CardContent>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="month"
                className="text-sm"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
              />
              <YAxis
                className="text-sm"
                tick={{ fill: 'hsl(var(--muted-foreground))' }}
                tickFormatter={(value) => `₹${value / 1000}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'hsl(var(--card))',
                  border: '1px solid hsl(var(--border))',
                  borderRadius: '8px',
                }}
                formatter={(value: number) =>
                  new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    maximumFractionDigits: 0,
                  }).format(value)
                }
              />
              <Legend />
              <Bar
                dataKey="income"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
                name="Income"
              />
              <Bar
                dataKey="expense"
                fill="#ef4444"
                radius={[8, 8, 0, 0]}
                name="Expense"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}