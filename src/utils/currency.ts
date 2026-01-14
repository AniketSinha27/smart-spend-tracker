// Currency formatting utility for Indian Rupee (INR)

/**
 * Formats a number as Indian Rupee currency
 * Uses Indian number system (e.g., 12,50,000.00)
 */
export const formatINR = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

/**
 * Formats a number with Indian grouping without currency symbol
 */
export const formatIndianNumber = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};
