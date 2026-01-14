// Reusable statistics card component
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
  variant?: 'default' | 'highlight';
}

const StatCard = ({ title, value, icon: Icon, subtitle, variant = 'default' }: StatCardProps) => {
  return (
    <div className={`p-6 rounded-2xl border ${
      variant === 'highlight' 
        ? 'bg-primary text-primary-foreground border-primary' 
        : 'bg-card border-border'
    }`}>
      <div className="flex items-start justify-between">
        <div>
          <p className={`text-sm font-medium ${
            variant === 'highlight' ? 'text-primary-foreground/80' : 'text-muted-foreground'
          }`}>
            {title}
          </p>
          <p className="text-3xl font-bold mt-1">{value}</p>
          {subtitle && (
            <p className={`text-sm mt-2 ${
              variant === 'highlight' ? 'text-primary-foreground/70' : 'text-muted-foreground'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
          variant === 'highlight' 
            ? 'bg-primary-foreground/20' 
            : 'bg-accent'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};

export default StatCard;
