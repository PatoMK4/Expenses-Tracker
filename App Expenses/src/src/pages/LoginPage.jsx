import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';

const GoogleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 48 48">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s12-5.373 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-2.641-.21-5.236-.611-7.743z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.022 35.026 44 30.038 44 24c0-2.641-.21-5.236-.611-7.743z" />
  </svg>
);

const GlassInputWrapper = ({ children }) => (
  <div style={{
    borderRadius: '16px',
    border: '1px solid rgba(255,255,255,0.08)',
    background: 'rgba(255,255,255,0.03)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.2s ease'
  }}>
    {children}
  </div>
);

export const LoginPage = ({ onSignIn, onBackToLanding, darkMode = true }) => {
  const [showPassword, setShowPassword] = useState(false);

  const theme = {
    bg: darkMode ? '#000000' : '#FFFFFF',
    card: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)',
    text: darkMode ? '#FFFFFF' : '#000000',
    textSecondary: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.5)',
    border: darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSignIn?.();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.bg,
      color: theme.text,
      fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          width: '100%',
          maxWidth: '440px'
        }}
      >
        {/* Back button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          onClick={onBackToLanding}
          style={{
            background: 'transparent',
            border: 'none',
            color: theme.textSecondary,
            fontSize: '14px',
            marginBottom: '32px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'color 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.color = theme.text}
          onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
        >
          ← Back to home
        </motion.button>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ marginBottom: '48px' }}
        >
          <h1 style={{
            fontSize: '42px',
            fontWeight: '700',
            marginBottom: '12px',
            letterSpacing: '-0.02em',
            textShadow: darkMode ? '0 2px 8px rgba(0,0,0,0.3)' : '0 2px 8px rgba(0,0,0,0.1)'
          }}>
            Welcome back
          </h1>
          <p style={{
            fontSize: '15px',
            color: theme.textSecondary
          }}>
            Sign in to continue to Tracky
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '8px',
              color: theme.text
            }}>
              Email
            </label>
            <GlassInputWrapper>
              <input
                type="email"
                placeholder="your@email.com"
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'transparent',
                  border: 'none',
                  color: theme.text,
                  fontSize: '15px',
                  outline: 'none',
                  fontFamily: 'inherit',
                  borderRadius: '16px'
                }}
              />
            </GlassInputWrapper>
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
          >
            <label style={{
              display: 'block',
              fontSize: '13px',
              fontWeight: '500',
              marginBottom: '8px',
              color: theme.text
            }}>
              Password
            </label>
            <GlassInputWrapper>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '14px 48px 14px 16px',
                    background: 'transparent',
                    border: 'none',
                    color: theme.text,
                    fontSize: '15px',
                    outline: 'none',
                    fontFamily: 'inherit',
                    borderRadius: '16px'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: theme.textSecondary,
                    cursor: 'pointer',
                    padding: '4px',
                    display: 'flex',
                    alignItems: 'center',
                    transition: 'color 0.2s'
                  }}
                  onMouseEnter={(e) => e.target.style.color = theme.text}
                  onMouseLeave={(e) => e.target.style.color = theme.textSecondary}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </GlassInputWrapper>
          </motion.div>

          {/* Remember me & Forgot password */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '14px'
            }}
          >
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              cursor: 'pointer',
              color: theme.text
            }}>
              <input
                type="checkbox"
                style={{
                  width: '16px',
                  height: '16px',
                  cursor: 'pointer'
                }}
              />
              Remember me
            </label>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: '#10B981',
                textDecoration: 'none',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Forgot password?
            </a>
          </motion.div>

          {/* Sign in button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            style={{
              width: '100%',
              padding: '14px',
              background: darkMode 
                ? 'linear-gradient(135deg, #10B981, #059669)'
                : 'linear-gradient(135deg, #000000, #1a1a1a)',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              boxShadow: darkMode
                ? '0 4px 16px rgba(16,185,129,0.3)'
                : '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.2s'
            }}
          >
            Sign in
          </motion.button>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.4 }}
            style={{
              position: 'relative',
              textAlign: 'center',
              margin: '8px 0'
            }}
          >
            <div style={{
              position: 'absolute',
              top: '50%',
              left: 0,
              right: 0,
              height: '1px',
              background: theme.border
            }} />
            <span style={{
              position: 'relative',
              background: theme.bg,
              padding: '0 16px',
              fontSize: '13px',
              color: theme.textSecondary
            }}>
              Or continue with
            </span>
          </motion.div>

          {/* Google sign in */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.4 }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="button"
            style={{
              width: '100%',
              padding: '14px',
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: '12px',
              fontSize: '15px',
              fontWeight: '600',
              cursor: 'pointer',
              fontFamily: 'inherit',
              color: theme.text,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s'
            }}
          >
            <GoogleIcon />
            Continue with Google
          </motion.button>

          {/* Sign up link */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            style={{
              textAlign: 'center',
              fontSize: '14px',
              color: theme.textSecondary,
              marginTop: '8px'
            }}
          >
            Don't have an account?{' '}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              style={{
                color: '#10B981',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'opacity 0.2s'
              }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Sign up
            </a>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};
