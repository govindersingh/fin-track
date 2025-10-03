'use client';

import { useEffect, useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AccountCard from '@/components/accounts/AccountCard';
import AddAccountModal from '@/components/accounts/AddAccountModal';
import { formatCurrency } from '@/lib/mockData';
import { Wallet, Loader as Loader2 } from 'lucide-react';

interface Account {
  id: string;
  userId: string;
  bankName: string;
  branch: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  balance: number;
  accountType: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/accounts');
      if (response.ok) {
        const data = await response.json();
        setAccounts(data.accounts || []);
      }
    } catch (error) {
      console.error('Failed to load accounts:', error);
    }
    setLoading(false);
  };

  const totalBalance = accounts.reduce((sum, acc) => sum + Number(acc.balance), 0);

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
          <AddAccountModal onAccountAdded={loadAccounts} />
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
                Across {accounts.length} accounts
              </p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : accounts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No accounts yet. Add your first account to get started!</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {accounts.map((account) => (
              <AccountCard key={account.id} account={account} />
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}