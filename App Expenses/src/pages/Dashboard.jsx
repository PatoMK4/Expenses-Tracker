import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Moon, Sun, Plus } from 'lucide-react';
import { BalanceCard } from '../components/BalanceCard';
import { TransactionList } from '../components/TransactionList';
import { CategoryBreakdown } from '../components/CategoryBreakdown';
import { calculateBalance, calculateCategoryData, calculatePercentageUsed } from '../utils/calculations';

export const Dashboard = ({ 
  transactions = [],
  subscriptions = [],
  monthlySavings = 0,
  darkMode,
  onToggleDarkMode,
  onSelectTransaction,
  onAddTransaction
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [balanceAnimationKey, setBalanceAnimationKey] = useState(null);

  const theme = {
    bg: darkMode ? '#000000' : '#FFFFFF',
    card: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  };

  const monthlyBudget = 5000.00;
  const { balance, totalIncome, totalExpenses, subscriptionsCost } = calculateBalance(
    transactions, 
    subscriptions, 
    monthlySavings
  );
  const percentageUsed = calculatePercentageUsed(totalExpenses, subscriptionsCost, monthlyBudget);
  const categoryData = calculateCategoryData(transactions);

  useEffect(() => {
    if (!balanceAnimationKey) {
      setBalanceAnimationKey(Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollTop = e.target.scrollTop;
      setScrolled(scrollTop > 100);
    };

    const container = document.getElementById('dashboard-container');
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div 
      id="dashboard-container"
      style={{
        minHeight: '100vh',
        height: '100vh',
        overflowY: 'auto',
        background: theme.bg,
        color: theme.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        padding: '32px 24px 80px',
        position: 'relative'
      }}
    >
      {/* Animated Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: darkMode ? 0.15 : 0.05,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      >
        <source src="https://static.vecteezy.com/system/resources/thumbnails/069/703/487/large/sleek-black-diagonal-lines-background-with-subtle-gradient-lighting-evokes-a-modern-professional-and-minimalist-aesthetic-full-hd-loop-suitable-for-technology-luxury-and-corporate-branding-free-video.jpg" type="video/mp4" />
      </video>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          marginBottom: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 10
        }}
      >
        <div>
          <div style={{
            fontSize: '28px',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            letterSpacing: '-0.03em',
            marginBottom: '4px'
          }}>
            Tracky
          </div>
          <div style={{ 
            fontSize: '14px', 
            color: theme.textSecondary,
            fontWeight: '400'
          }}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          {/* Add button - desktop */}
          <AnimatePresence>
            {!scrolled && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddTransaction}
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  background: darkMode 
                    ? 'linear-gradient(135deg, #10B981, #059669)'
                    : 'linear-gradient(135deg, #000000, #1a1a1a)',
                  color: '#FFFFFF',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  boxShadow: darkMode
                    ? '0 4px 16px rgba(16,185,129,0.3)'
                    : '0 4px 16px rgba(0,0,0,0.2)'
                }}
              >
                <Plus size={18} />
                <span>Add</span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Dark mode toggle */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onToggleDarkMode}
            style={{ 
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: theme.card,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text,
              transition: 'all 0.2s ease'
            }}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>
          
          {/* Search button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            style={{ 
              cursor: 'pointer',
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: theme.card,
              backdropFilter: 'blur(20px)',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: theme.text,
              transition: 'all 0.2s ease'
            }}
          >
            <Search size={18} />
          </motion.button>
        </div>
      </motion.div>

      {/* Balance Card */}
      <BalanceCard
        balance={balance}
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        subscriptionsCost={subscriptionsCost}
        monthlySavings={monthlySavings}
        monthlyBudget={monthlyBudget}
        percentageUsed={percentageUsed}
        darkMode={darkMode}
        animationKey={balanceAnimationKey}
      />

      {/* Stats Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '12px', 
        marginBottom: '24px',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
          }}
          style={{
            background: theme.card,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.border}`,
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(16,185,129,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '16px' }}>📊</span>
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#10B981',
              fontWeight: '600',
              padding: '4px 8px',
              background: 'rgba(16,185,129,0.15)',
              borderRadius: '6px'
            }}>
              +12%
            </div>
          </div>
          <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '4px' }}>
            Avg. Daily
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>
            ${transactions.length > 0 ? (totalExpenses / 30).toFixed(0) : '0'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          whileHover={{
            scale: 1.02,
            backgroundColor: darkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'
          }}
          style={{
            background: theme.card,
            backdropFilter: 'blur(20px)',
            borderRadius: '16px',
            padding: '20px',
            border: `1px solid ${theme.border}`,
            transition: 'all 0.2s ease',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: 'rgba(59,130,246,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <span style={{ fontSize: '16px' }}>💰</span>
            </div>
            <div style={{ 
              fontSize: '11px', 
              color: '#3B82F6',
              fontWeight: '600',
              padding: '4px 8px',
              background: 'rgba(59,130,246,0.15)',
              borderRadius: '6px'
            }}>
              85%
            </div>
          </div>
          <div style={{ fontSize: '12px', color: theme.textSecondary, marginBottom: '4px' }}>
            Savings Rate
          </div>
          <div style={{ fontSize: '24px', fontWeight: '700', letterSpacing: '-0.02em' }}>
            {totalIncome > 0 ? ((balance / totalIncome) * 100).toFixed(0) : '0'}%
          </div>
        </motion.div>
      </div>

      {/* Category Breakdown */}
      <CategoryBreakdown categoryData={categoryData} darkMode={darkMode} />

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        style={{
          position: 'relative',
          zIndex: 10
        }}
      >
        <div style={{
          fontSize: '18px',
          fontWeight: '700',
          marginBottom: '16px',
          letterSpacing: '-0.02em'
        }}>
          Recent Transactions
        </div>

        <TransactionList 
          transactions={transactions}
          onSelectTransaction={onSelectTransaction}
          darkMode={darkMode}
        />
      </motion.div>

      {/* Floating Add Button */}
      <AnimatePresence>
        {scrolled && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onAddTransaction}
            style={{
              position: 'fixed',
              bottom: '32px',
              right: '24px',
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: darkMode 
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'linear-gradient(135deg, #000000, #1a1a1a)',
              color: '#FFFFFF',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: darkMode
                ? '0 8px 32px rgba(16,185,129,0.4)'
                : '0 8px 32px rgba(0,0,0,0.3)',
              zIndex: 1000
            }}
          >
            <Plus size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
