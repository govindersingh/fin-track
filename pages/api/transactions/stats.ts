import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import {
  getTotalIncome,
  getTotalExpense,
  getMonthlyData,
  getCategoryExpenses,
} from '@/lib/api/transactions';
import { getTotalBalance } from '@/lib/api/accounts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    try {
      const [income, expense, balance, monthlyData, categoryData] = await Promise.all([
        getTotalIncome(session.user.id),
        getTotalExpense(session.user.id),
        getTotalBalance(session.user.id),
        getMonthlyData(session.user.id),
        getCategoryExpenses(session.user.id),
      ]);

      return res.status(200).json({
        totalIncome: income.total,
        totalExpense: expense.total,
        totalBalance: balance.total,
        monthlyData: monthlyData.data,
        categoryExpenses: categoryData.data,
      });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch stats' });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
