'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Transaction, getAccountById, formatCurrency, formatDate } from '@/lib/mockData';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';

interface TransactionTableProps {
  transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TransactionTableProps) {
  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Account</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Type</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No transactions found
                </TableCell>
              </TableRow>
            ) : (
              transactions.map((txn) => {
                const account = getAccountById(txn.accountId);
                return (
                  <TableRow key={txn.id} className="hover:bg-accent/50">
                    <TableCell className="font-medium">
                      {formatDate(txn.date)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div
                          className={`p-1.5 rounded-full ${
                            txn.type === 'credit'
                              ? 'bg-green-500/10'
                              : 'bg-red-500/10'
                          }`}
                        >
                          {txn.type === 'credit' ? (
                            <ArrowUpRight className="h-3 w-3 text-green-600" />
                          ) : (
                            <ArrowDownLeft className="h-3 w-3 text-red-600" />
                          )}
                        </div>
                        <span>{txn.description}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium text-sm">{account?.bankName}</p>
                        <p className="text-xs text-muted-foreground">{account?.branch}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{txn.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={txn.type === 'credit' ? 'default' : 'destructive'}
                      >
                        {txn.type === 'credit' ? 'Credit' : 'Debit'}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <span
                        className={`font-semibold ${
                          txn.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {txn.type === 'credit' ? '+' : '-'}
                        {formatCurrency(txn.amount)}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}