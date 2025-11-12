import { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

export const AnimatedCounter = ({ 
  value, 
  fontSize = '48px', 
  decimals = 2, 
  animationKey 
}) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => latest.toFixed(decimals));

  useEffect(() => {
    const controls = animate(count, Math.abs(value), { 
      duration: 1.8,
      ease: [0.4, 0.0, 0.2, 1]
    });
    return () => controls.stop();
  }, [value, animationKey]);

  return (
    <motion.span 
      style={{ 
        fontSize, 
        fontWeight: '700',
        fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif',
        letterSpacing: '-0.04em'
      }}
    >
      {rounded}
    </motion.span>
  );
};
