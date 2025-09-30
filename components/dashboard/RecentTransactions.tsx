'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { mockTransactions, formatCurrency, formatDate, getAccountById } from '@/lib/mockData';

export default function RecentTransactions() {
  const recentTxns = mockTransactions.slice(0, 5);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentTxns.map((txn) => {
            const account = getAccountById(txn.accountId);
            return (
              <div
                key={txn.id}
                className="flex items-center justify-between p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-2 rounded-full ${
                      txn.type === 'credit'
                        ? 'bg-green-500/10'
                        : 'bg-red-500/10'
                    }`}
                  >
                    {txn.type === 'credit' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownLeft className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{txn.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {account?.bankName} • {formatDate(txn.date)}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p
                    className={`font-semibold text-sm ${
                      txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {txn.type === 'credit' ? '+' : '-'}
                    {formatCurrency(txn.amount)}
                  </p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {txn.category}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}