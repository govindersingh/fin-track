'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Copy, Check } from 'lucide-react';
import { maskAccountNumber, formatCurrency } from '@/lib/mockData';
import { toast } from 'sonner';

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

interface AccountCardProps {
  account: Account;
}

export default function AccountCard({ account }: AccountCardProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      toast.success(`${fieldName} copied to clipboard`);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold mb-1">{account.bankName}</h3>
            <p className="text-sm text-muted-foreground">{account.branch}</p>
          </div>
          <Badge variant={account.accountType === 'savings' ? 'default' : 'secondary'}>
            {account.accountType === 'savings' ? 'Savings' : 'Current'}
          </Badge>
        </div>

        <div className="space-y-4">
          <div className="bg-accent/30 rounded-lg p-4">
            <p className="text-sm text-muted-foreground mb-1">Balance</p>
            <p className="text-2xl font-bold">{formatCurrency(Number(account.balance))}</p>
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Account Number</p>
              <p className="font-mono text-sm font-medium">
                {maskAccountNumber(account.accountNumber)}
              </p>
            </div>

            <div className="flex items-center justify-between bg-accent/20 rounded-lg p-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">IFSC Code</p>
                <p className="font-mono text-sm font-medium">{account.ifscCode}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(account.ifscCode, 'IFSC Code')}
                className="ml-2"
              >
                {copiedField === 'IFSC Code' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-between bg-accent/20 rounded-lg p-3">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-1">UPI ID</p>
                <p className="font-mono text-sm font-medium">{account.upiId}</p>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => copyToClipboard(account.upiId, 'UPI ID')}
                className="ml-2"
              >
                {copiedField === 'UPI ID' ? (
                  <Check className="h-4 w-4 text-green-600" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}