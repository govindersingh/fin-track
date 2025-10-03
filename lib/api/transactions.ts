import { prisma } from '@/lib/prisma';

export async function getTransactions(userId: string, limit?: number) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      take: limit,
    });
    return { data: transactions, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getTransactionById(id: string, userId: string) {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: { id, userId },
    });
    return { data: transaction, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createTransaction(
  userId: string,
  transaction: {
    accountId: string;
    date: Date;
    description: string;
    amount: number;
    type: string;
    category: string;
  }
) {
  try {
    const newTransaction = await prisma.transaction.create({
      data: {
        userId,
        accountId: transaction.accountId,
        date: transaction.date,
        description: transaction.description,
        amount: transaction.amount,
        type: transaction.type,
        category: transaction.category,
      },
    });
    return { data: newTransaction, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateTransaction(
  id: string,
  userId: string,
  updates: {
    accountId?: string;
    date?: Date;
    description?: string;
    amount?: number;
    type?: string;
    category?: string;
  }
) {
  try {
    const transaction = await prisma.transaction.updateMany({
      where: { id, userId },
      data: updates,
    });
    return { data: transaction, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteTransaction(id: string, userId: string) {
  try {
    await prisma.transaction.deleteMany({
      where: { id, userId },
    });
    return { error: null };
  } catch (error) {
    return { error };
  }
}

export async function getTotalIncome(userId: string) {
  try {
    const result = await prisma.transaction.aggregate({
      where: { userId, type: 'credit' },
      _sum: {
        amount: true,
      },
    });
    return { total: Number(result._sum.amount || 0), error: null };
  } catch (error) {
    return { total: 0, error };
  }
}

export async function getTotalExpense(userId: string) {
  try {
    const result = await prisma.transaction.aggregate({
      where: { userId, type: 'debit' },
      _sum: {
        amount: true,
      },
    });
    return { total: Number(result._sum.amount || 0), error: null };
  } catch (error) {
    return { total: 0, error };
  }
}

export async function getMonthlyData(userId: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: 'asc' },
    });

    const monthlyMap = new Map<string, { income: number; expense: number }>();

    transactions.forEach((txn) => {
      const date = new Date(txn.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;

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
  } catch (error) {
    return { data: [], error };
  }
}

export async function getCategoryExpenses(userId: string) {
  try {
    const transactions = await prisma.transaction.findMany({
      where: { userId, type: 'debit' },
      select: { category: true, amount: true },
    });

    const categoryMap = new Map<string, number>();

    transactions.forEach((txn) => {
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
  } catch (error) {
    return { data: [], error };
  }
}
