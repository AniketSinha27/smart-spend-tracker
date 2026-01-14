// Reusable expense list card component
import { Expense } from '@/services/mockApi';
import { Utensils, Car, Receipt, ShoppingBag, MoreHorizontal } from 'lucide-react';
import { formatINR } from '@/utils/currency';

interface ExpenseCardProps {
  expense: Expense;
}

// Category icons and colors mapping
const categoryConfig = {
  Food: { icon: Utensils, colorClass: 'bg-expense-food text-white' },
  Travel: { icon: Car, colorClass: 'bg-expense-travel text-white' },
  Bills: { icon: Receipt, colorClass: 'bg-expense-bills text-white' },
  Shopping: { icon: ShoppingBag, colorClass: 'bg-expense-shopping text-white' },
  Others: { icon: MoreHorizontal, colorClass: 'bg-expense-others text-white' },
};

const ExpenseCard = ({ expense }: ExpenseCardProps) => {
  const config = categoryConfig[expense.category];
  const Icon = config.icon;

  // Format date to readable string
  const formattedDate = new Date(expense.date).toLocaleDateString('en-IN', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:shadow-md transition-shadow">
      {/* Category Icon */}
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${config.colorClass}`}>
        <Icon className="w-5 h-5" />
      </div>

      {/* Expense Details */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">{expense.category}</span>
        </div>
        {expense.notes && (
          <p className="text-sm text-muted-foreground truncate">{expense.notes}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">{formattedDate}</p>
      </div>

      {/* Amount */}
      <div className="text-right">
        <span className="text-lg font-bold text-expense-amount">
          -{formatINR(expense.amount)}
        </span>
      </div>
    </div>
  );
};

export default ExpenseCard;
