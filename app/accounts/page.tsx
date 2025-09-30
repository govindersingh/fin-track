'use client';

import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountCard from '@/components/accounts/AccountCard';
import AddAccountModal from '@/components/accounts/AddAccountModal';
import { mockAccounts, formatCurrency } from '@/lib/mockData';
import { Wallet } from 'lucide-react';

export default function AccountsPage() {
  const totalBalance = mockAccounts.reduce((sum, acc) => sum + acc.balance, 0);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Accounts</h2>
            <p className="text-muted-foreground mt-1">
              Manage your bank accounts and UPI IDs
            </p>
          </div>
          <AddAccountModal />
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-border rounded-lg p-6">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary/20 rounded-lg">
              <Wallet className="h-6 w-6 text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Balance</p>
              <p className="text-3xl font-bold">{formatCurrency(totalBalance)}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Across {mockAccounts.length} accounts
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {mockAccounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}