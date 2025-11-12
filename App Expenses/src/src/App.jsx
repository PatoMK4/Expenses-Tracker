import React, { useState } from 'react';
import { LoadingScreen } from './pages/LoadingScreen';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { Dashboard } from './pages/Dashboard';
import { TransactionDetail } from './pages/TransactionDetail';

function App() {
  const [screen, setScreen] = useState('loading');
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  
  // Demo data
  const [transactions] = useState([
    { 
      id: '1', 
      name: 'Salary Deposit', 
      category: 'Income', 
      amount: 5000, 
      date: 'November 10, 2025', 
      time: '09:00 AM', 
      type: 'income',
      recurring: true
    },
    { 
      id: '2', 
      name: 'Grocery Shopping', 
      category: 'Dining', 
      amount: -85.50, 
      date: 'November 10, 2025', 
      time: '02:30 PM', 
      type: 'expense',
      recurring: false
    },
    { 
      id: '3', 
      name: 'Uber Ride', 
      category: 'Transport', 
      amount: -22.00, 
      date: 'November 9, 2025', 
      time: '06:15 PM', 
      type: 'expense',
      recurring: false
    }
  ]);
  
  const [subscriptions] = useState([
    { name: 'Netflix', price: 15.99, logo: '🎬', color: '#E50914' },
    { name: 'Spotify', price: 10.99, logo: '🎵', color: '#1DB954' }
  ]);
  
  const [monthlySavings] = useState(500);

  const handleSelectTransaction = (transaction) => {
    setSelectedTransaction(transaction);
    setScreen('detail');
  };

  const handleAddTransaction = () => {
    alert('Add transaction modal coming soon!');
  };

  return (
    <>
      {screen === 'loading' && (
        <LoadingScreen onComplete={() => setScreen('landing')} />
      )}
      
      {screen === 'landing' && (
        <LandingPage 
          darkMode={darkMode}
          onGetStarted={() => setScreen('login')} 
        />
      )}
      
      {screen === 'login' && (
        <LoginPage 
          darkMode={darkMode}
          onSignIn={() => setScreen('dashboard')}
          onBackToLanding={() => setScreen('landing')}
        />
      )}

      {screen === 'dashboard' && (
        <Dashboard 
          transactions={transactions}
          subscriptions={subscriptions}
          monthlySavings={monthlySavings}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
          onSelectTransaction={handleSelectTransaction}
          onAddTransaction={handleAddTransaction}
        />
      )}

      {screen === 'detail' && (
        <TransactionDetail 
          transaction={selectedTransaction}
          onClose={() => setScreen('dashboard')}
          darkMode={darkMode}
        />
      )}
    </>
  );
}

export default App;
