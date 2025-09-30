'use client';

import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionTable from '@/components/transactions/TransactionTable';
import AddTransactionModal from '@/components/transactions/AddTransactionModal';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { mockTransactions } from '@/lib/mockData';

export default function TransactionsPage() {
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  const filteredTransactions = mockTransactions
    .filter((txn) => {
      if (typeFilter === 'all') return true;
      return txn.type === typeFilter;
    })
    .sort((a, b) => {
      if (sortOrder === 'newest') {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
    });

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Transactions</h2>
            <p className="text-muted-foreground mt-1">
              View and manage all your transactions
            </p>
          </div>
          <AddTransactionModal />
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">
              Filter by Type
            </label>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Transactions</SelectItem>
                <SelectItem value="credit">Credit Only</SelectItem>
                <SelectItem value="debit">Debit Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Sort by Date</label>
            <Select value={sortOrder} onValueChange={setSortOrder}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 border border-border">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-accent/30 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Total Transactions
              </p>
              <p className="text-2xl font-bold">{filteredTransactions.length}</p>
            </div>
            <div className="text-center p-4 bg-green-500/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Credit Transactions
              </p>
              <p className="text-2xl font-bold text-green-600">
                {filteredTransactions.filter((t) => t.type === 'credit').length}
              </p>
            </div>
            <div className="text-center p-4 bg-red-500/10 rounded-lg">
              <p className="text-sm text-muted-foreground mb-1">
                Debit Transactions
              </p>
              <p className="text-2xl font-bold text-red-600">
                {filteredTransactions.filter((t) => t.type === 'debit').length}
              </p>
            </div>
          </div>
        </div>

        <TransactionTable transactions={filteredTransactions} />
      </div>
    </DashboardLayout>
  );
}