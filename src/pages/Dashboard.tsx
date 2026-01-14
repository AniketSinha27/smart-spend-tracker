// Dashboard page - displays expense overview, charts, and recent transactions
import { useMemo } from 'react';
import { useExpenses } from '@/context/ExpenseContext';
import ExpenseCard from '@/components/ExpenseCard';
import ExpenseChart from '@/components/ExpenseChart';
import StatCard from '@/components/StatCard';
import { Wallet, TrendingDown, Calendar, Receipt } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { formatINR } from '@/utils/currency';

const Dashboard = () => {
  const { expenses, loading } = useExpenses();

  // Calculate statistics for the current month
  const stats = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    const monthlyExpenses = expenses.filter(exp => {
      const expDate = new Date(exp.date);
      return expDate.getMonth() === currentMonth && expDate.getFullYear() === currentYear;
    });

    const total = monthlyExpenses.reduce((sum, exp) => sum + exp.amount, 0);
    const avgPerDay = monthlyExpenses.length > 0 ? total / new Date().getDate() : 0;

    return {
      total,
      count: monthlyExpenses.length,
      avgPerDay,
      monthlyExpenses,
    };
  }, [expenses]);

  // Get current month name
  const currentMonthName = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[1, 2, 3].map(i => <Skeleton key={i} className="h-32 rounded-2xl" />)}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Track your spending for {currentMonthName}</p>
        </div>
        <span className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full w-fit">
          Currency: INR (₹)
        </span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatCard
          title="Total Expenses"
          value={formatINR(stats.total)}
          icon={Wallet}
          subtitle={currentMonthName}
          variant="highlight"
        />
        <StatCard
          title="Transactions"
          value={stats.count.toString()}
          icon={Receipt}
          subtitle="This month"
        />
        <StatCard
          title="Daily Average"
          value={formatINR(stats.avgPerDay)}
          icon={TrendingDown}
          subtitle="Per day this month"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Pie Chart Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-primary" />
            Category Distribution
          </h2>
          <ExpenseChart expenses={stats.monthlyExpenses} />
        </div>

        {/* Recent Expenses Section */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Receipt className="w-5 h-5 text-primary" />
            Recent Expenses
          </h2>
          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
            {expenses.slice(0, 6).map(expense => (
              <ExpenseCard key={expense.id} expense={expense} />
            ))}
            {expenses.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                No expenses yet. Add your first expense!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
