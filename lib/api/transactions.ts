import { supabase } from '@/lib/supabase/client';
import { Database } from '@/lib/supabase/types';

type Transaction = Database['public']['Tables']['transactions']['Row'];
type TransactionInsert = Database['public']['Tables']['transactions']['Insert'];
type TransactionUpdate = Database['public']['Tables']['transactions']['Update'];

export async function getTransactions(limit?: number) {
  let query = supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: false });

  if (limit) {
    query = query.limit(limit);
  }

  const { data, error } = await query;
  return { data, error };
}

export async function getTransactionById(id: string) {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('id', id)
    .maybeSingle();

  return { data, error };
}

export async function createTransaction(transaction: Omit<TransactionInsert, 'user_id'>) {
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { data: null, error: new Error('User not authenticated') };
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert({
      ...transaction,
      user_id: user.id,
    })
    .select()
    .single();

  return { data, error };
}

export async function updateTransaction(id: string, updates: TransactionUpdate) {
  const { data, error } = await supabase
    .from('transactions')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  return { data, error };
}

export async function deleteTransaction(id: string) {
  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  return { error };
}

export async function getTotalIncome() {
  const { data, error } = await supabase
    .from('transactions')
    .select('amount')
    .eq('type', 'credit');

  if (error || !data) {
    return { total: 0, error };
  }

  const total = data.reduce((sum, txn) => sum + Number(txn.amount), 0);
  return { total, error: null };
}

export async function getTotalExpense() {
  const { data, error } = await supabase
    .from('transactions')
    .select('amount')
    .eq('type', 'debit');

  if (error || !data) {
    return { total: 0, error };
  }

  const total = data.reduce((sum, txn) => sum + Number(txn.amount), 0);
  return { total, error: null };
}

export async function getMonthlyData() {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('date', { ascending: true });

  if (error || !data) {
    return { data: [], error };
  }

  const monthlyMap = new Map<string, { income: number; expense: number }>();

  data.forEach((txn) => {
    const date = new Date(txn.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('en-US', { month: 'short' });

    if (!monthlyMap.has(monthKey)) {
      monthlyMap.set(monthKey, { income: 0, expense: 0 });
    }

    const monthData = monthlyMap.get(monthKey)!;
    if (txn.type === 'credit') {
      monthData.income += Number(txn.amount);
    } else {
      monthData.expense += Number(txn.amount);
    }
  });

  const monthlyData = Array.from(monthlyMap.entries())
    .slice(-6)
    .map(([key, values]) => {
      const [year, month] = key.split('-');
      const date = new Date(Number(year), Number(month) - 1);
      return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        income: values.income,
        expense: values.expense,
      };
    });

  return { data: monthlyData, error: null };
}

export async function getCategoryExpenses() {
  const { data, error } = await supabase
    .from('transactions')
    .select('category, amount')
    .eq('type', 'debit');

  if (error || !data) {
    return { data: [], error };
  }

  const categoryMap = new Map<string, number>();

  data.forEach((txn) => {
    const current = categoryMap.get(txn.category) || 0;
    categoryMap.set(txn.category, current + Number(txn.amount));
  });

  const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ec4899', '#8b5cf6', '#ef4444'];
  const categoryData = Array.from(categoryMap.entries()).map(([category, amount], index) => ({
    category,
    amount,
    color: colors[index % colors.length],
  }));

  return { data: categoryData, error: null };
}