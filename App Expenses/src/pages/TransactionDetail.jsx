import React from 'react';
import { motion } from 'framer-motion';
import { X, ArrowUpRight, ArrowDownRight } from 'lucide-react';

export const TransactionDetail = ({ transaction, onClose, darkMode }) => {
  const theme = {
    bg: darkMode ? '#000000' : '#FFFFFF',
    card: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  };

  if (!transaction) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: theme.bg,
        color: theme.text,
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        padding: '32px 24px',
        position: 'relative'
      }}
    >
      <motion.div
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.4, 0.0, 0.2, 1] }}
        style={{
          background: theme.card,
          backdropFilter: 'blur(20px)',
          borderRadius: '24px',
          padding: '32px',
          border: `1px solid ${theme.border}`,
          position: 'relative'
        }}
      >
        {/* Close button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '24px',
            right: '24px',
            background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
            border: 'none',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: theme.text,
            transition: 'all 0.2s ease'
          }}
        >
          <X size={18} />
        </motion.button>

        {/* Icon */}
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '16px',
          background: transaction.type === 'income' 
            ? 'rgba(16,185,129,0.15)' 
            : 'rgba(239,68,68,0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px'
        }}>
          {transaction.type === 'income' ? (
            <ArrowDownRight size={28} color="#10B981" />
          ) : (
            <ArrowUpRight size={28} color="#EF4444" />
          )}
        </div>

        {/* Name & Category */}
        <div style={{ fontSize: '22px', fontWeight: '700', marginBottom: '6px', letterSpacing: '-0.02em' }}>
          {transaction.name}
        </div>

        <div style={{ fontSize: '15px', color: theme.textSecondary, marginBottom: '28px' }}>
          {transaction.category}
        </div>

        {/* Amount */}
        <div style={{ 
          fontSize: '48px', 
          fontWeight: '700',
          color: transaction.type === 'income' ? '#10B981' : '#EF4444',
          marginBottom: '6px',
          letterSpacing: '-0.03em'
        }}>
          {transaction.type === 'income' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
        </div>

        {/* Date & Time */}
        <div style={{ fontSize: '14px', color: theme.textSecondary, marginBottom: '32px' }}>
          {transaction.date} · {transaction.time}
        </div>

        {/* Recurring badge */}
        {transaction.recurring && (
          <div style={{
            padding: '10px 16px',
            background: 'rgba(59,130,246,0.1)',
            borderRadius: '10px',
            marginBottom: '24px',
            display: 'inline-block'
          }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#3B82F6' }}>
              Recurring transaction
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}>
          {['Edit', 'Duplicate', 'Delete'].map((action, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              style={{
                flex: 1,
                padding: '14px',
                background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                border: `1px solid ${theme.border}`,
                borderRadius: '12px',
                textAlign: 'center',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                color: theme.text,
                transition: 'all 0.2s ease'
              }}
            >
              {action}
            </motion.button>
          ))}
        </div>

        {/* Details section */}
        <div style={{ fontSize: '18px', fontWeight: '700', marginBottom: '20px', letterSpacing: '-0.02em' }}>
          Details
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {[
            { label: 'Payment Method', value: 'Card •••• 7289' },
            { label: 'Transaction Type', value: 'Card Payment' },
            { label: 'Reference', value: '#TRX8751923687' },
            { label: 'Status', value: 'Completed', isSuccess: true }
          ].map((detail, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '16px',
                borderBottom: i < 3 ? `1px solid ${theme.border}` : 'none'
              }}
            >
              <span style={{ color: theme.textSecondary, fontSize: '14px', fontWeight: '500' }}>
                {detail.label}
              </span>
              <span style={{
                fontWeight: '600',
                fontSize: '14px',
                color: detail.isSuccess ? '#10B981' : theme.text
              }}>
                {detail.value}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
