export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  plan: 'free' | 'paid';
}

export interface Account {
  id: string;
  bankName: string;
  branch: string;
  accountNumber: string;
  ifscCode: string;
  upiId: string;
  balance: number;
  accountType: 'savings' | 'current';
}

export interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  accountId: string;
  category: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expense: number;
}

export interface CategoryExpense {
  category: string;
  amount: number;
  color: string;
}

export const mockUser: User = {
  id: '1',
  name: 'Rajesh Kumar',
  email: 'rajesh.kumar@example.com',
  avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200',
  plan: 'free',
};

export const mockAccounts: Account[] = [
  {
    id: 'acc1',
    bankName: 'HDFC Bank',
    branch: 'Connaught Place',
    accountNumber: '50100123456789',
    ifscCode: 'HDFC0001234',
    upiId: 'rajesh@hdfcbank',
    balance: 125000,
    accountType: 'savings',
  },
  {
    id: 'acc2',
    bankName: 'State Bank of India',
    branch: 'Karol Bagh',
    accountNumber: '30001234567890',
    ifscCode: 'SBIN0005678',
    upiId: 'rajesh@sbi',
    balance: 85000,
    accountType: 'savings',
  },
  {
    id: 'acc3',
    bankName: 'ICICI Bank',
    branch: 'Nehru Place',
    accountNumber: '60001987654321',
    ifscCode: 'ICIC0006789',
    upiId: 'rajesh@icici',
    balance: 45000,
    accountType: 'current',
  },
  {
    id: 'acc4',
    bankName: 'Axis Bank',
    branch: 'Saket',
    accountNumber: '91200456789012',
    ifscCode: 'UTIB0001122',
    upiId: 'rajesh@axisbank',
    balance: 92000,
    accountType: 'savings',
  },
];

export const mockTransactions: Transaction[] = [
  {
    id: 'txn1',
    date: '2025-09-28',
    description: 'Salary Credit',
    amount: 85000,
    type: 'credit',
    accountId: 'acc1',
    category: 'Income',
  },
  {
    id: 'txn2',
    date: '2025-09-27',
    description: 'Grocery Shopping',
    amount: 3500,
    type: 'debit',
    accountId: 'acc1',
    category: 'Food',
  },
  {
    id: 'txn3',
    date: '2025-09-26',
    description: 'Electricity Bill',
    amount: 2200,
    type: 'debit',
    accountId: 'acc2',
    category: 'Bills',
  },
  {
    id: 'txn4',
    date: '2025-09-25',
    description: 'Uber Rides',
    amount: 850,
    type: 'debit',
    accountId: 'acc1',
    category: 'Transport',
  },
  {
    id: 'txn5',
    date: '2025-09-24',
    description: 'Amazon Purchase',
    amount: 5600,
    type: 'debit',
    accountId: 'acc3',
    category: 'Shopping',
  },
  {
    id: 'txn6',
    date: '2025-09-23',
    description: 'Freelance Project Payment',
    amount: 25000,
    type: 'credit',
    accountId: 'acc2',
    category: 'Income',
  },
  {
    id: 'txn7',
    date: '2025-09-22',
    description: 'Restaurant Dinner',
    amount: 1800,
    type: 'debit',
    accountId: 'acc1',
    category: 'Food',
  },
  {
    id: 'txn8',
    date: '2025-09-21',
    description: 'Netflix Subscription',
    amount: 649,
    type: 'debit',
    accountId: 'acc1',
    category: 'Entertainment',
  },
  {
    id: 'txn9',
    date: '2025-09-20',
    description: 'Petrol',
    amount: 3000,
    type: 'debit',
    accountId: 'acc4',
    category: 'Transport',
  },
  {
    id: 'txn10',
    date: '2025-09-19',
    description: 'Internet Bill',
    amount: 999,
    type: 'debit',
    accountId: 'acc2',
    category: 'Bills',
  },
  {
    id: 'txn11',
    date: '2025-09-18',
    description: 'Medical Store',
    amount: 1250,
    type: 'debit',
    accountId: 'acc1',
    category: 'Healthcare',
  },
  {
    id: 'txn12',
    date: '2025-09-17',
    description: 'Dividend Credit',
    amount: 5000,
    type: 'credit',
    accountId: 'acc3',
    category: 'Income',
  },
  {
    id: 'txn13',
    date: '2025-09-16',
    description: 'Clothing Store',
    amount: 4500,
    type: 'debit',
    accountId: 'acc1',
    category: 'Shopping',
  },
  {
    id: 'txn14',
    date: '2025-09-15',
    description: 'Movie Tickets',
    amount: 800,
    type: 'debit',
    accountId: 'acc1',
    category: 'Entertainment',
  },
  {
    id: 'txn15',
    date: '2025-09-14',
    description: 'Gym Membership',
    amount: 3000,
    type: 'debit',
    accountId: 'acc2',
    category: 'Healthcare',
  },
  {
    id: 'txn16',
    date: '2025-09-13',
    description: 'Mobile Recharge',
    amount: 399,
    type: 'debit',
    accountId: 'acc1',
    category: 'Bills',
  },
  {
    id: 'txn17',
    date: '2025-09-12',
    description: 'Swiggy Order',
    amount: 650,
    type: 'debit',
    accountId: 'acc1',
    category: 'Food',
  },
  {
    id: 'txn18',
    date: '2025-09-11',
    description: 'Consulting Fee',
    amount: 15000,
    type: 'credit',
    accountId: 'acc4',
    category: 'Income',
  },
  {
    id: 'txn19',
    date: '2025-09-10',
    description: 'Book Store',
    amount: 1200,
    type: 'debit',
    accountId: 'acc1',
    category: 'Shopping',
  },
  {
    id: 'txn20',
    date: '2025-09-09',
    description: 'Water Bill',
    amount: 450,
    type: 'debit',
    accountId: 'acc2',
    category: 'Bills',
  },
  {
    id: 'txn21',
    date: '2025-09-08',
    description: 'Cab to Airport',
    amount: 1500,
    type: 'debit',
    accountId: 'acc1',
    category: 'Transport',
  },
  {
    id: 'txn22',
    date: '2025-09-07',
    description: 'Laptop Accessories',
    amount: 3800,
    type: 'debit',
    accountId: 'acc3',
    category: 'Shopping',
  },
  {
    id: 'txn23',
    date: '2025-09-06',
    description: 'Coffee Shop',
    amount: 450,
    type: 'debit',
    accountId: 'acc1',
    category: 'Food',
  },
  {
    id: 'txn24',
    date: '2025-09-05',
    description: 'Spotify Premium',
    amount: 119,
    type: 'debit',
    accountId: 'acc1',
    category: 'Entertainment',
  },
  {
    id: 'txn25',
    date: '2025-09-04',
    description: 'Rental Income',
    amount: 18000,
    type: 'credit',
    accountId: 'acc2',
    category: 'Income',
  },
  {
    id: 'txn26',
    date: '2025-09-03',
    description: 'Gas Cylinder',
    amount: 950,
    type: 'debit',
    accountId: 'acc2',
    category: 'Bills',
  },
  {
    id: 'txn27',
    date: '2025-09-02',
    description: 'Supermarket',
    amount: 2800,
    type: 'debit',
    accountId: 'acc1',
    category: 'Food',
  },
  {
    id: 'txn28',
    date: '2025-09-01',
    description: 'Metro Card Recharge',
    amount: 500,
    type: 'debit',
    accountId: 'acc1',
    category: 'Transport',
  },
  {
    id: 'txn29',
    date: '2025-08-30',
    description: 'House Rent',
    amount: 25000,
    type: 'debit',
    accountId: 'acc1',
    category: 'Bills',
  },
  {
    id: 'txn30',
    date: '2025-08-28',
    description: 'Salary Credit',
    amount: 85000,
    type: 'credit',
    accountId: 'acc1',
    category: 'Income',
  },
];

export const monthlyData: MonthlyData[] = [
  { month: 'Apr', income: 120000, expense: 85000 },
  { month: 'May', income: 130000, expense: 92000 },
  { month: 'Jun', income: 125000, expense: 88000 },
  { month: 'Jul', income: 135000, expense: 95000 },
  { month: 'Aug', income: 148000, expense: 98000 },
  { month: 'Sep', income: 148000, expense: 72000 },
];

export const categoryExpenses: CategoryExpense[] = [
  { category: 'Food', amount: 8850, color: '#10b981' },
  { category: 'Bills', amount: 29648, color: '#3b82f6' },
  { category: 'Transport', amount: 5850, color: '#f59e0b' },
  { category: 'Shopping', amount: 15100, color: '#ec4899' },
  { category: 'Entertainment', amount: 1568, color: '#8b5cf6' },
  { category: 'Healthcare', amount: 4250, color: '#ef4444' },
];

export function maskAccountNumber(accountNumber: string): string {
  if (accountNumber.length <= 4) return accountNumber;
  const lastFour = accountNumber.slice(-4);
  const masked = 'X'.repeat(accountNumber.length - 4);
  return masked + lastFour;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(date);
}

export function getTotalBalance(): number {
  return mockAccounts.reduce((sum, account) => sum + account.balance, 0);
}

export function getTotalIncome(): number {
  return mockTransactions
    .filter((txn) => txn.type === 'credit')
    .reduce((sum, txn) => sum + txn.amount, 0);
}

export function getTotalExpense(): number {
  return mockTransactions
    .filter((txn) => txn.type === 'debit')
    .reduce((sum, txn) => sum + txn.amount, 0);
}

export function getAccountById(accountId: string): Account | undefined {
  return mockAccounts.find((acc) => acc.id === accountId);
}