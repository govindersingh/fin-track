import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAccountById, updateAccount, deleteAccount } from '@/lib/api/accounts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (req.method === 'GET') {
    const { data, error } = await getAccountById(id as string, session.user.id);

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch account' });
    }

    return res.status(200).json({ account: data });
  }

  if (req.method === 'PUT') {
    const updates = req.body;
    const { data, error } = await updateAccount(id as string, session.user.id, updates);

    if (error) {
      return res.status(500).json({ message: 'Failed to update account' });
    }

    return res.status(200).json({ account: data });
  }

  if (req.method === 'DELETE') {
    const { error } = await deleteAccount(id as string, session.user.id);

    if (error) {
      return res.status(500).json({ message: 'Failed to delete account' });
    }

    return res.status(200).json({ message: 'Account deleted' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
