import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { CATEGORY_COLORS } from '../utils/constants';

export const TransactionList = ({ 
  transactions, 
  onSelectTransaction, 
  darkMode 
}) => {
  const theme = {
    card: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    bg: darkMode ? '#000000' : '#FFFFFF',
    positive: '#10B981',
    negative: '#EF4444'
  };

  if (transactions.length === 0) {
    return (
      <div style={{
        background: theme.card,
        backdropFilter: 'blur(20px)',
        borderRadius: '14px',
        padding: '48px',
        border: `1px solid ${theme.border}`,
        textAlign: 'center',
        color: theme.textSecondary
      }}>
        <p style={{ fontSize: '15px', marginBottom: '8px', color: theme.text }}>
          No transactions yet
        </p>
        <p style={{ fontSize: '13px' }}>
          Click the + button to add your first transaction
        </p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {transactions.slice(0, 20).map((tx, index) => {
        const prevTx = transactions[index - 1];
        const showDateHeader = !prevTx || prevTx.date !== tx.date;

        return (
          <React.Fragment key={tx.id}>
            {showDateHeader && (
              <div style={{
                fontSize: '11px',
                fontWeight: '600',
                color: theme.textSecondary,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                marginTop: index > 0 ? '8px' : '0',
                marginBottom: '4px',
                marginLeft: '4px'
              }}>
                {tx.date}
              </div>
            )}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 + index * 0.03, duration: 0.4 }}
              whileHover={{
                x: 4,
                backgroundColor: darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)'
              }}
              onClick={() => onSelectTransaction(tx)}
              style={{
                background: theme.card,
                backdropFilter: 'blur(20px)',
                borderRadius: '14px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                border: `1px solid ${theme.border}`,
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flex: 1 }}>
                {/* Icon with category indicator */}
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: darkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.04)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  position: 'relative'
                }}>
                  {tx.type === 'income' ? (
                    <ArrowDownRight size={18} color={theme.positive} />
                  ) : (
                    <ArrowUpRight size={18} color={theme.negative} />
                  )}
                  {/* Category indicator dot */}
                  <div style={{
                    position: 'absolute',
                    bottom: '-2px',
                    right: '-2px',
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: CATEGORY_COLORS[tx.category] || '#64748B',
                    border: `2px solid ${theme.bg}`
                  }} />
                </div>

                {/* Transaction info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ 
                    fontSize: '15px', 
                    fontWeight: '600', 
                    marginBottom: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span style={{ 
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                      {tx.name}
                    </span>
                    {tx.recurring && (
                      <span style={{
                        fontSize: '9px',
                        padding: '2px 6px',
                        background: 'rgba(59,130,246,0.15)',
                        color: '#3B82F6',
                        borderRadius: '4px',
                        fontWeight: '600',
                        letterSpacing: '0.03em'
                      }}>
                        AUTO
                      </span>
                    )}
                  </div>
                  <div style={{ 
                    fontSize: '13px', 
                    color: theme.textSecondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <span>{tx.category}</span>
                    <span>·</span>
                    <span>{tx.time}</span>
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div style={{
                fontSize: '16px',
                fontWeight: '700',
                color: tx.type === 'income' ? theme.positive : theme.text,
                letterSpacing: '-0.01em',
                textAlign: 'right',
                flexShrink: 0
              }}>
                {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </div>
            </motion.div>
          </React.Fragment>
        );
      })}
    </div>
  );
};
