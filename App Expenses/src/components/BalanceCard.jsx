import React from 'react';
import { motion } from 'framer-motion';
import { AnimatedCounter } from './AnimatedCounter';

export const BalanceCard = ({ 
  balance, 
  totalIncome, 
  totalExpenses, 
  subscriptionsCost,
  monthlySavings,
  monthlyBudget,
  percentageUsed,
  darkMode,
  animationKey 
}) => {
  const theme = {
    positive: '#10B981',
    negative: '#EF4444'
  };

  const cardBg = darkMode ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)';
  const textColor = darkMode ? '#000000' : '#FFFFFF';
  const secondaryColor = darkMode ? 'rgba(0,0,0,0.5)' : 'rgba(255,255,255,0.5)';
  const progressBg = darkMode ? 'rgba(0,0,0,0.06)' : 'rgba(255,255,255,0.1)';

  const getProgressGradient = () => {
    if (percentageUsed > 90) return 'linear-gradient(90deg, #EF4444, #F87171)';
    if (percentageUsed > 70) return 'linear-gradient(90deg, #F59E0B, #FBBF24)';
    return 'linear-gradient(90deg, #10B981, #34D399)';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1, duration: 0.6 }}
      whileHover={{
        scale: 1.01,
        boxShadow: darkMode 
          ? '0 16px 48px rgba(255,255,255,0.1)'
          : '0 16px 48px rgba(0,0,0,0.1)'
      }}
      style={{
        background: cardBg,
        backdropFilter: 'blur(20px)',
        borderRadius: '20px',
        padding: '32px',
        marginBottom: '20px',
        border: `1px solid ${darkMode ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.08)'}`,
        position: 'relative',
        overflow: 'hidden',
        zIndex: 10,
        transition: 'all 0.2s ease',
        cursor: 'pointer'
      }}
    >
      <div style={{ position: 'relative', zIndex: 2 }}>
        {/* Label */}
        <div style={{ 
          fontSize: '13px', 
          color: secondaryColor,
          marginBottom: '8px',
          fontWeight: '500',
          letterSpacing: '0.02em',
          textTransform: 'uppercase'
        }}>
          Current Balance
        </div>
        
        {/* Balance */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'baseline', 
          gap: '4px', 
          marginBottom: '24px',
          color: textColor
        }}>
          <span style={{ fontSize: '20px', fontWeight: '600', opacity: 0.6 }}>$</span>
          <AnimatedCounter value={balance} fontSize="56px" decimals={2} animationKey={animationKey} />
        </div>

        {/* Progress Bar */}
        <div style={{
          width: '100%',
          height: '4px',
          background: progressBg,
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '20px'
        }}>
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: `${percentageUsed}%` }}
            transition={{ duration: 1.2, ease: [0.4, 0.0, 0.2, 1] }}
            style={{
              height: '100%',
              background: getProgressGradient(),
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Income & Expenses */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          <div>
            <div style={{ fontSize: '12px', color: secondaryColor, marginBottom: '4px' }}>
              Income
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: theme.positive,
              letterSpacing: '-0.01em'
            }}>
              ${totalIncome.toFixed(0)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: secondaryColor, marginBottom: '4px' }}>
              Expenses
            </div>
            <div style={{ 
              fontSize: '18px', 
              fontWeight: '700', 
              color: theme.negative,
              letterSpacing: '-0.01em'
            }}>
              ${totalExpenses.toFixed(0)}
            </div>
          </div>
        </div>

        {/* Subscriptions, Savings, Budget */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '12px', color: secondaryColor, marginBottom: '4px' }}>
              Subscriptions
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '700',
              letterSpacing: '-0.01em',
              color: subscriptionsCost > 0 ? '#F59E0B' : textColor
            }}>
              ${subscriptionsCost.toFixed(0)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: secondaryColor, marginBottom: '4px' }}>
              Savings
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '700',
              letterSpacing: '-0.01em',
              color: monthlySavings > 0 ? theme.positive : textColor
            }}>
              ${monthlySavings.toFixed(0)}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '12px', color: secondaryColor, marginBottom: '4px' }}>
              Budget
            </div>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '700',
              letterSpacing: '-0.01em',
              color: textColor
            }}>
              ${monthlyBudget.toFixed(0)}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
