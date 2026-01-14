// Mock API service simulating Express.js backend
// In a real project, these would be Axios calls to your Express server

export interface Expense {
  id: string;
  amount: number;
  category: 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Others';
  date: string;
  notes?: string;
}

// Initial mock data (simulating MongoDB collection)
let expenses: Expense[] = [
  { id: '1', amount: 45.50, category: 'Food', date: '2026-01-12', notes: 'Lunch with friends' },
  { id: '2', amount: 120.00, category: 'Bills', date: '2026-01-10', notes: 'Electricity bill' },
  { id: '3', amount: 35.00, category: 'Travel', date: '2026-01-09', notes: 'Uber to campus' },
  { id: '4', amount: 89.99, category: 'Shopping', date: '2026-01-08', notes: 'New headphones' },
  { id: '5', amount: 22.00, category: 'Food', date: '2026-01-07', notes: 'Coffee and snacks' },
  { id: '6', amount: 150.00, category: 'Bills', date: '2026-01-05', notes: 'Internet subscription' },
  { id: '7', amount: 65.00, category: 'Others', date: '2026-01-03', notes: 'Gym membership' },
  { id: '8', amount: 42.00, category: 'Food', date: '2026-01-02', notes: 'Groceries' },
];

// Simulate network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// GET /expenses - Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  await delay(300); // Simulate API latency
  return [...expenses].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// POST /expenses - Add a new expense
export const addExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
  await delay(300);
  const newExpense: Expense = {
    ...expense,
    id: Date.now().toString(),
  };
  expenses = [newExpense, ...expenses];
  return newExpense;
};

// Helper: Get expenses for a specific month
export const getExpensesByMonth = async (year: number, month: number): Promise<Expense[]> => {
  const allExpenses = await fetchExpenses();
  return allExpenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
  });
};
