import { CATEGORY_COLORS } from './constants';

export const calculateBalance = (transactions, subscriptions, monthlySavings) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  
  const subscriptionsCost = subscriptions.reduce((sum, sub) => sum + sub.price, 0);
  
  const balance = totalIncome - totalExpenses - subscriptionsCost - monthlySavings;
  
  return {
    balance,
    totalIncome,
    totalExpenses,
    subscriptionsCost
  };
};

export const calculateCategoryData = (transactions) => {
  const categoryTotals = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => {
      const cat = t.category;
      if (!acc[cat]) acc[cat] = { spent: 0, count: 0 };
      acc[cat].spent += Math.abs(t.amount);
      acc[cat].count += 1;
      return acc;
    }, {});

  return Object.entries(categoryTotals).map(([name, data]) => ({
    name,
    spent: data.spent,
    budget: 500, // Default budget
    color: CATEGORY_COLORS[name] || '#64748B'
  }));
};

export const calculatePercentageUsed = (totalExpenses, subscriptionsCost, monthlyBudget) => {
  return ((totalExpenses + subscriptionsCost) / monthlyBudget) * 100;
};

export const generateTransactionId = () => {
  return `txn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });
};

export const formatTime = (date) => {
  return new Date(date).toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};
