import { prisma } from '@/lib/prisma';

export async function getUser(userId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        plan: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateUser(
  userId: string,
  updates: {
    fullName?: string;
    avatarUrl?: string;
    plan?: string;
  }
) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: updates,
      select: {
        id: true,
        email: true,
        fullName: true,
        avatarUrl: true,
        plan: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return { data: user, error: null };
  } catch (error) {
    return { data: null, error };
  }
}
