import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getTransactions, createTransaction } from '@/lib/api/transactions';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;
    const { data, error } = await getTransactions(session.user.id, limit);

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch transactions' });
    }

    return res.status(200).json({ transactions: data });
  }

  if (req.method === 'POST') {
    const transactionData = req.body;
    const { data, error } = await createTransaction(session.user.id, {
      ...transactionData,
      date: new Date(transactionData.date),
    });

    if (error) {
      return res.status(500).json({ message: 'Failed to create transaction' });
    }

    return res.status(201).json({ transaction: data });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
