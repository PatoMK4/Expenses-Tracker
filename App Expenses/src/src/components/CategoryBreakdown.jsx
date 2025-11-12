import React from 'react';
import { motion } from 'framer-motion';

export const CategoryBreakdown = ({ categoryData, darkMode }) => {
  const theme = {
    card: darkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)',
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'
  };

  if (!categoryData || categoryData.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      style={{
        marginBottom: '24px',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div style={{
        fontSize: '14px',
        fontWeight: '600',
        marginBottom: '12px',
        letterSpacing: '-0.01em',
        color: theme.textSecondary,
        textTransform: 'uppercase',
        fontSize: '11px'
      }}>
        Spending by Category
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {categoryData.map((cat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 + index * 0.05, duration: 0.4 }}
            style={{
              background: theme.card,
              backdropFilter: 'blur(20px)',
              borderRadius: '10px',
              padding: '12px',
              border: `1px solid ${theme.border}`,
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            {/* Color indicator */}
            <div style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: cat.color,
              flexShrink: 0
            }} />
            
            {/* Category name and amount */}
            <div style={{ 
              flex: 1, 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center' 
            }}>
              <span style={{ fontSize: '14px', fontWeight: '500' }}>
                {cat.name}
              </span>
              <span style={{ 
                fontSize: '13px', 
                fontWeight: '600', 
                color: theme.textSecondary 
              }}>
                ${cat.spent.toFixed(0)}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
