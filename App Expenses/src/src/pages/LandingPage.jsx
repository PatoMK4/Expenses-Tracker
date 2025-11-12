import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { WaveBackground } from '../backgrounds/WaveBackground';

export const LandingPage = ({ onGetStarted, darkMode = true }) => {
  const theme = {
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: darkMode ? '#000000' : '#FFFFFF',
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '80px 40px'
    }}>
      {/* Wave Background */}
      <WaveBackground />

      {/* Content */}
      <div style={{ 
        position: 'relative', 
        zIndex: 10, 
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        >
          {/* Logo */}
          <div style={{
            fontSize: '64px',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            background: darkMode 
              ? 'linear-gradient(135deg, #FFFFFF 0%, #999999 100%)'
              : 'linear-gradient(135deg, #000000 0%, #666666 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            marginBottom: '20px',
            textShadow: darkMode 
              ? '0 4px 12px rgba(0,0,0,0.5)'
              : '0 4px 12px rgba(0,0,0,0.2)'
          }}>
            Tracky
          </div>

          {/* Headline */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: '700',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            color: theme.text,
            textShadow: darkMode 
              ? '0 2px 8px rgba(0,0,0,0.4)'
              : '0 2px 8px rgba(0,0,0,0.15)'
          }}>
            Financial clarity,<br />
            beautifully simple.
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            color: theme.textSecondary,
            lineHeight: '1.6',
            marginBottom: '48px',
            maxWidth: '480px',
            fontWeight: '400',
            margin: '0 auto 48px',
            textShadow: darkMode 
              ? '0 1px 4px rgba(0,0,0,0.3)'
              : '0 1px 4px rgba(0,0,0,0.1)'
          }}>
            Track expenses, manage budgets, and achieve your financial goals with precision and elegance.
          </p>

          {/* CTA Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onGetStarted}
            style={{
              background: darkMode ? '#FFFFFF' : '#000000',
              color: darkMode ? '#000000' : '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              padding: '18px 36px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: darkMode
                ? '0 8px 32px rgba(255,255,255,0.12)'
                : '0 8px 32px rgba(0,0,0,0.2)',
              transition: 'all 0.2s ease',
              fontFamily: 'inherit'
            }}
          >
            <span>Get Started</span>
            <ArrowRight size={18} />
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};
