import { prisma } from '@/lib/prisma';

export async function getAccounts(userId: string) {
  try {
    const accounts = await prisma.account.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return { data: accounts, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function getAccountById(id: string, userId: string) {
  try {
    const account = await prisma.account.findFirst({
      where: { id, userId },
    });
    return { data: account, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function createAccount(
  userId: string,
  account: {
    bankName: string;
    branch: string;
    accountNumber: string;
    ifscCode: string;
    upiId: string;
    balance: number;
    accountType: string;
  }
) {
  try {
    const newAccount = await prisma.account.create({
      data: {
        userId,
        bankName: account.bankName,
        branch: account.branch,
        accountNumber: account.accountNumber,
        ifscCode: account.ifscCode,
        upiId: account.upiId,
        balance: account.balance,
        accountType: account.accountType,
      },
    });
    return { data: newAccount, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function updateAccount(
  id: string,
  userId: string,
  updates: {
    bankName?: string;
    branch?: string;
    accountNumber?: string;
    ifscCode?: string;
    upiId?: string;
    balance?: number;
    accountType?: string;
  }
) {
  try {
    const account = await prisma.account.updateMany({
      where: { id, userId },
      data: updates,
    });
    return { data: account, error: null };
  } catch (error) {
    return { data: null, error };
  }
}

export async function deleteAccount(id: string, userId: string) {
  try {
    await prisma.account.deleteMany({
      where: { id, userId },
    });
    return { error: null };
  } catch (error) {
    return { error };
  }
}

export async function getTotalBalance(userId: string) {
  try {
    const result = await prisma.account.aggregate({
      where: { userId },
      _sum: {
        balance: true,
      },
    });
    return { total: Number(result._sum.balance || 0), error: null };
  } catch (error) {
    return { total: 0, error };
  }
}
