// Add Expense page - form for creating new expense entries
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExpenses } from '@/context/ExpenseContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { PlusCircle, IndianRupee, Tag, Calendar, FileText } from 'lucide-react';

// Available expense categories
const CATEGORIES = ['Food', 'Travel', 'Bills', 'Shopping', 'Others'] as const;

const AddExpense = () => {
  const navigate = useNavigate();
  const { addExpense } = useExpenses();
  
  // Form state
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form validation and submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate required fields
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }
    if (!category) {
      toast.error('Please select a category');
      return;
    }
    if (!date) {
      toast.error('Please select a date');
      return;
    }

    setIsSubmitting(true);
    try {
      // Add expense via context (calls mock API)
      await addExpense({
        amount: parseFloat(amount),
        category: category as 'Food' | 'Travel' | 'Bills' | 'Shopping' | 'Others',
        date,
        notes: notes.trim() || undefined,
      });

      toast.success('Expense added successfully!');
      navigate('/'); // Redirect to dashboard
    } catch (error) {
      toast.error('Failed to add expense. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Add Expense</h1>
        <p className="text-muted-foreground mt-1">Record a new expense transaction</p>
      </div>

      {/* Expense Form */}
      <div className="max-w-lg mx-auto">
        <form onSubmit={handleSubmit} className="bg-card rounded-2xl border border-border p-8 space-y-6">
          {/* Amount Field */}
          <div className="space-y-2">
            <Label htmlFor="amount" className="flex items-center gap-2 text-foreground">
              <IndianRupee className="w-4 h-4 text-primary" />
              Amount (₹)
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">₹</span>
              <Input
                id="amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="text-lg h-12 pl-8"
                required
              />
            </div>
          </div>

          {/* Category Field */}
          <div className="space-y-2">
            <Label htmlFor="category" className="flex items-center gap-2 text-foreground">
              <Tag className="w-4 h-4 text-primary" />
              Category
            </Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Date Field */}
          <div className="space-y-2">
            <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
              <Calendar className="w-4 h-4 text-primary" />
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="h-12"
              required
            />
          </div>

          {/* Notes Field (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="notes" className="flex items-center gap-2 text-foreground">
              <FileText className="w-4 h-4 text-primary" />
              Notes <span className="text-muted-foreground font-normal">(Optional)</span>
            </Label>
            <Textarea
              id="notes"
              placeholder="Add a description..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full h-12 text-base"
            disabled={isSubmitting}
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            {isSubmitting ? 'Adding...' : 'Add Expense'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
