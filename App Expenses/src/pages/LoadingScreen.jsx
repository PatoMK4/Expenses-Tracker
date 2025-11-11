import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { DisappearText } from '../components/DisappearText';

export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showDisappear, setShowDisappear] = useState(false);
  const textRef = useRef(null);
  const barRef = useRef(null);

  useEffect(() => {
    // Progress animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start disappear effect when loading complete
          setTimeout(() => {
            setShowDisappear(true);
            // Trigger disappear on both elements
            if (textRef.current) {
              const hiddenDiv = textRef.current.querySelector('div[style*="display: none"]');
              if (hiddenDiv && hiddenDiv.startVaporize) {
                hiddenDiv.startVaporize();
              }
            }
            if (barRef.current) {
              const hiddenDiv = barRef.current.querySelector('div[style*="display: none"]');
              if (hiddenDiv && hiddenDiv.startVaporize) {
                hiddenDiv.startVaporize();
              }
            }
          }, 300);
          return 100;
        }
        return prev + (100 / 2500) * 50; // 2.5s to complete
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handleTextDisappearComplete = () => {
    // Wait 90% of disappear animation before changing page
    setTimeout(() => {
      onComplete();
    }, 1800); // 90% of 2s default disappear duration
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#000000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      position: 'relative'
    }}>
      {!showDisappear ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.4, 0.0, 0.2, 1] }}
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center'
          }}
        >
          {/* Logo text */}
          <div style={{
            fontSize: '72px',
            fontWeight: '800',
            fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #888888 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '-0.03em',
            marginBottom: '40px'
          }}>
            Tracky
          </div>

          {/* Progress bar */}
          <div style={{
            width: '200px',
            height: '2px',
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '2px',
            overflow: 'hidden',
            margin: '0 auto'
          }}>
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.3,
                ease: [0.4, 0.0, 0.2, 1]
              }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #10B981, #3B82F6, #8B5CF6)',
                borderRadius: '2px'
              }}
            />
          </div>
        </motion.div>
      ) : (
        <>
          {/* Disappear effect for text */}
          <div 
            ref={textRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -60%)',
              width: '400px',
              height: '100px',
              zIndex: 10
            }}
          >
            <DisappearText
              text="Tracky"
              font={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "72px",
                fontWeight: 800
              }}
              color="rgb(255, 255, 255)"
              spread={5}
              density={5}
              duration={2}
              onComplete={handleTextDisappearComplete}
            />
          </div>

          {/* Disappear effect for progress bar */}
          <div 
            ref={barRef}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, 20%)',
              width: '200px',
              height: '20px',
              zIndex: 10
            }}
          >
            <DisappearText
              text="━━━━━━━━━━━━━━━━━━━━"
              font={{
                fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
                fontSize: "12px",
                fontWeight: 400
              }}
              color="rgb(136, 136, 136)"
              spread={3}
              density={7}
              duration={2}
              onComplete={() => {}}
            />
          </div>
        </>
      )}
    </div>
  );
};
