export const COLORS = {
  positive: '#10B981',
  negative: '#EF4444',
  accents: {
    blue: '#3B82F6',
    purple: '#8B5CF6',
    pink: '#EC4899',
    amber: '#F59E0B'
  }
};

export const CATEGORY_COLORS = {
  'Dining': '#F59E0B',
  'Shopping': '#8B5CF6',
  'Transport': '#3B82F6',
  'Subscriptions': '#EC4899',
  'Health': '#10B981',
  'Income': '#10B981',
  'Entertainment': '#F97316',
  'Bills': '#6366F1',
  'Other': '#64748B'
};

export const POPULAR_SUBSCRIPTIONS = [
  { name: 'Netflix', price: 15.99, logo: '🎬', color: '#E50914' },
  { name: 'Spotify', price: 10.99, logo: '🎵', color: '#1DB954' },
  { name: 'Apple Music', price: 10.99, logo: '🎵', color: '#FA243C' },
  { name: 'YouTube Premium', price: 11.99, logo: '▶️', color: '#FF0000' },
  { name: 'Disney+', price: 7.99, logo: '🎭', color: '#113CCF' },
  { name: 'Amazon Prime', price: 14.99, logo: '📦', color: '#FF9900' },
  { name: 'HBO Max', price: 15.99, logo: '📺', color: '#B200ED' },
  { name: 'Adobe Creative Cloud', price: 54.99, logo: '🎨', color: '#FF0000' },
  { name: 'Microsoft 365', price: 6.99, logo: '💼', color: '#0078D4' },
  { name: 'iCloud+', price: 2.99, logo: '☁️', color: '#007AFF' },
  { name: 'Dropbox', price: 11.99, logo: '📁', color: '#0061FF' },
  { name: 'ChatGPT Plus', price: 20.00, logo: '🤖', color: '#10A37F' },
  { name: 'GitHub Pro', price: 4.00, logo: '💻', color: '#181717' },
  { name: 'Notion', price: 8.00, logo: '📝', color: '#000000' },
  { name: 'Figma', price: 12.00, logo: '🎨', color: '#F24E1E' }
];

export const SAVINGS_TIPS = [
  { title: 'Review subscriptions monthly', description: 'Cancel unused services to save $20-50/month', impact: 'high' },
  { title: 'Cook at home more often', description: 'Reduce dining out from 5 to 2 times per week', impact: 'high' },
  { title: 'Use cashback cards', description: 'Get 1-5% back on purchases', impact: 'medium' },
  { title: 'Buy generic brands', description: 'Save 20-30% on groceries without quality loss', impact: 'medium' },
  { title: 'Set up auto-savings', description: 'Transfer 10% of income to savings automatically', impact: 'high' },
  { title: 'Negotiate bills', description: 'Call providers for better rates on internet/phone', impact: 'medium' }
];

export const ANIMATION_DURATIONS = {
  fast: 0.2,
  modal: 0.3,
  transition: 0.5,
  counter: 1.8,
  stagger: 0.03
};
