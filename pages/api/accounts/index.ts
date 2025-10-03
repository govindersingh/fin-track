import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAccounts, createAccount } from '@/lib/api/accounts';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const { data, error } = await getAccounts(session.user.id);

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch accounts' });
    }

    return res.status(200).json({ accounts: data });
  }

  if (req.method === 'POST') {
    const accountData = req.body;
    const { data, error } = await createAccount(session.user.id, accountData);

    if (error) {
      return res.status(500).json({ message: 'Failed to create account' });
    }

    return res.status(201).json({ account: data });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
