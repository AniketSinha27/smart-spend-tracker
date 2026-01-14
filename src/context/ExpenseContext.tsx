// Context for global expense state management
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Expense, fetchExpenses, addExpense as apiAddExpense } from '@/services/mockApi';

interface ExpenseContextType {
  expenses: Expense[];
  loading: boolean;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  refreshExpenses: () => Promise<void>;
}

const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch expenses on mount
  const refreshExpenses = async () => {
    setLoading(true);
    try {
      const data = await fetchExpenses();
      setExpenses(data);
    } catch (error) {
      console.error('Failed to fetch expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshExpenses();
  }, []);

  // Add new expense and update state
  const addExpense = async (expense: Omit<Expense, 'id'>) => {
    const newExpense = await apiAddExpense(expense);
    setExpenses(prev => [newExpense, ...prev]);
  };

  return (
    <ExpenseContext.Provider value={{ expenses, loading, addExpense, refreshExpenses }}>
      {children}
    </ExpenseContext.Provider>
  );
};

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return context;
};
