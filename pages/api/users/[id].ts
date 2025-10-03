import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getUser, updateUser } from '@/lib/api/users';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (!session?.user?.id) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const { id } = req.query;

  if (id !== session.user.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  if (req.method === 'GET') {
    const { data, error } = await getUser(id as string);

    if (error) {
      return res.status(500).json({ message: 'Failed to fetch user' });
    }

    return res.status(200).json({ user: data });
  }

  if (req.method === 'PUT') {
    const updates = req.body;
    const { data, error } = await updateUser(id as string, updates);

    if (error) {
      return res.status(500).json({ message: 'Failed to update user' });
    }

    return res.status(200).json({ user: data });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
