import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';

export const DisappearText = ({ 
  text = "Tracky",
  font = {
    fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Display', sans-serif",
    fontSize: "72px",
    fontWeight: 800
  },
  color = "rgb(255, 255, 255)",
  spread = 5,
  density = 5,
  duration = 2,
  onComplete = () => {}
}) => {
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const particlesRef = useRef([]);
  const [wrapperSize, setWrapperSize] = useState({ width: 0, height: 0 });
  const [isVaporizing, setIsVaporizing] = useState(false);
  const transformedDensity = transformValue(density, [0, 10], [0.3, 1], true);

  const globalDpr = useMemo(() => {
    if (typeof window !== "undefined") {
      return window.devicePixelRatio * 1.5 || 1;
    }
    return 1;
  }, []);

  const fontConfig = useMemo(() => {
    const fontSize = parseInt(font.fontSize?.replace("px", "") || "72");
    const VAPORIZE_SPREAD = calculateVaporizeSpread(fontSize);
    const MULTIPLIED_VAPORIZE_SPREAD = VAPORIZE_SPREAD * spread;
    return {
      fontSize,
      VAPORIZE_SPREAD,
      MULTIPLIED_VAPORIZE_SPREAD,
      font: `${font.fontWeight ?? 800} ${fontSize * globalDpr}px ${font.fontFamily}`,
    };
  }, [font.fontSize, font.fontWeight, font.fontFamily, spread, globalDpr]);

  // Start vaporizing effect
  const startVaporize = useCallback(() => {
    setIsVaporizing(true);
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = wrapper.getBoundingClientRect();
    setWrapperSize({ width: rect.width, height: rect.height });
  }, []);

  useEffect(() => {
    if (!wrapperSize.width || !wrapperSize.height) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = wrapperSize;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(width * globalDpr);
    canvas.height = Math.floor(height * globalDpr);

    const textX = canvas.width / 2;
    const textY = canvas.height / 2;

    const { particles, textBoundaries } = createParticles(
      ctx, 
      canvas, 
      text, 
      textX, 
      textY, 
      fontConfig.font, 
      parseColor(color), 
      "center"
    );

    particlesRef.current = particles;
    canvas.textBoundaries = textBoundaries;

    // Initial render
    renderParticles(ctx, particles, globalDpr);
  }, [wrapperSize, text, fontConfig, color, globalDpr]);

  // Animation loop
  useEffect(() => {
    if (!isVaporizing) return;

    let lastTime = performance.now();
    let progress = 0;
    let frameId;

    const animate = (currentTime) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");

      if (!canvas || !ctx || !particlesRef.current.length) {
        frameId = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      progress += deltaTime * 100 / duration;
      const textBoundaries = canvas.textBoundaries;
      
      if (textBoundaries) {
        const vaporizeX = textBoundaries.left + textBoundaries.width * Math.min(progress, 100) / 100;
        
        const allVaporized = updateParticles(
          particlesRef.current,
          vaporizeX,
          deltaTime,
          fontConfig.MULTIPLIED_VAPORIZE_SPREAD,
          duration * 1000,
          "left-to-right",
          transformedDensity
        );

        renderParticles(ctx, particlesRef.current, globalDpr);

        if (progress >= 100 && allVaporized) {
          cancelAnimationFrame(frameId);
          onComplete();
          return;
        }
      }

      frameId = requestAnimationFrame(animate);
    };

    frameId = requestAnimationFrame(animate);

    return () => {
      if (frameId) cancelAnimationFrame(frameId);
    };
  }, [isVaporizing, duration, fontConfig, transformedDensity, globalDpr, onComplete]);

  return (
    <div ref={wrapperRef} style={{ width: '100%', height: '100%', pointerEvents: 'none' }}>
      <canvas ref={canvasRef} style={{ minWidth: '30px', minHeight: '20px', pointerEvents: 'none' }} />
      {/* Expose startVaporize method */}
      <div style={{ display: 'none' }} ref={el => { if (el) el.startVaporize = startVaporize; }} />
    </div>
  );
};

// Helper function to expose startVaporize
DisappearText.start = (ref) => {
  if (ref.current) {
    const hiddenDiv = ref.current.querySelector('div[style*="display: none"]');
    if (hiddenDiv && hiddenDiv.startVaporize) {
      hiddenDiv.startVaporize();
    }
  }
};

// Helper functions
function createParticles(ctx, canvas, text, textX, textY, font, color, alignment) {
  const particles = [];
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = color;
  ctx.font = font;
  ctx.textAlign = alignment;
  ctx.textBaseline = "middle";
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;

  const metrics = ctx.measureText(text);
  const textWidth = metrics.width;
  const textLeft = textX - textWidth / 2;
  
  const textBoundaries = {
    left: textLeft,
    right: textLeft + textWidth,
    width: textWidth,
  };

  ctx.fillText(text, textX, textY);
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imageData.data;

  const baseDPR = 3;
  const currentDPR = canvas.width / parseInt(canvas.style.width);
  const sampleRate = Math.max(1, Math.round(currentDPR / baseDPR));

  for (let y = 0; y < canvas.height; y += sampleRate) {
    for (let x = 0; x < canvas.width; x += sampleRate) {
      const index = (y * canvas.width + x) * 4;
      const alpha = data[index + 3];
      
      if (alpha > 0) {
        const originalAlpha = alpha / 255 * (sampleRate / currentDPR);
        particles.push({
          x,
          y,
          originalX: x,
          originalY: y,
          color: `rgba(${data[index]}, ${data[index + 1]}, ${data[index + 2]}, ${originalAlpha})`,
          opacity: originalAlpha,
          originalAlpha,
          velocityX: 0,
          velocityY: 0,
          angle: 0,
          speed: 0,
        });
      }
    }
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  return { particles, textBoundaries };
}

function updateParticles(particles, vaporizeX, deltaTime, MULTIPLIED_VAPORIZE_SPREAD, VAPORIZE_DURATION, direction, density) {
  let allParticlesVaporized = true;
  
  particles.forEach(particle => {
    const shouldVaporize = direction === "left-to-right" 
      ? particle.originalX <= vaporizeX 
      : particle.originalX >= vaporizeX;
    
    if (shouldVaporize) {
      if (particle.speed === 0) {
        particle.angle = Math.random() * Math.PI * 2;
        particle.speed = (Math.random() * 1 + 0.5) * MULTIPLIED_VAPORIZE_SPREAD;
        particle.velocityX = Math.cos(particle.angle) * particle.speed;
        particle.velocityY = Math.sin(particle.angle) * particle.speed;
        particle.shouldFadeQuickly = Math.random() > density;
      }
      
      if (particle.shouldFadeQuickly) {
        particle.opacity = Math.max(0, particle.opacity - deltaTime);
      } else {
        const dx = particle.originalX - particle.x;
        const dy = particle.originalY - particle.y;
        const distanceFromOrigin = Math.sqrt(dx * dx + dy * dy);
        const dampingFactor = Math.max(0.95, 1 - distanceFromOrigin / (100 * MULTIPLIED_VAPORIZE_SPREAD));
        
        const randomSpread = MULTIPLIED_VAPORIZE_SPREAD * 3;
        const spreadX = (Math.random() - 0.5) * randomSpread;
        const spreadY = (Math.random() - 0.5) * randomSpread;
        
        particle.velocityX = (particle.velocityX + spreadX + dx * 0.002) * dampingFactor;
        particle.velocityY = (particle.velocityY + spreadY + dy * 0.002) * dampingFactor;
        
        const maxVelocity = MULTIPLIED_VAPORIZE_SPREAD * 2;
        const currentVelocity = Math.sqrt(particle.velocityX * particle.velocityX + particle.velocityY * particle.velocityY);
        
        if (currentVelocity > maxVelocity) {
          const scale = maxVelocity / currentVelocity;
          particle.velocityX *= scale;
          particle.velocityY *= scale;
        }
        
        particle.x += particle.velocityX * deltaTime * 20;
        particle.y += particle.velocityY * deltaTime * 10;
        
        const baseFadeRate = 0.25;
        const durationBasedFadeRate = baseFadeRate * (2000 / VAPORIZE_DURATION);
        particle.opacity = Math.max(0, particle.opacity - deltaTime * durationBasedFadeRate);
      }
      
      if (particle.opacity > 0.01) {
        allParticlesVaporized = false;
      }
    } else {
      allParticlesVaporized = false;
    }
  });
  
  return allParticlesVaporized;
}

function renderParticles(ctx, particles, globalDpr) {
  ctx.save();
  ctx.scale(globalDpr, globalDpr);
  
  particles.forEach(particle => {
    if (particle.opacity > 0) {
      const color = particle.color.replace(/[\d.]+\)$/, `${particle.opacity})`);
      ctx.fillStyle = color;
      ctx.fillRect(particle.x / globalDpr, particle.y / globalDpr, 1, 1);
    }
  });
  
  ctx.restore();
}

function calculateVaporizeSpread(fontSize) {
  const size = typeof fontSize === "string" ? parseInt(fontSize) : fontSize;
  const points = [
    { size: 20, spread: 0.2 },
    { size: 50, spread: 0.5 },
    { size: 100, spread: 1.5 }
  ];
  
  if (size <= points[0].size) return points[0].spread;
  if (size >= points[points.length - 1].size) return points[points.length - 1].spread;
  
  let i = 0;
  while (i < points.length - 1 && points[i + 1].size < size) i++;
  
  const p1 = points[i];
  const p2 = points[i + 1];
  
  return p1.spread + (size - p1.size) * (p2.spread - p1.spread) / (p2.size - p1.size);
}

function parseColor(color) {
  const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  const rgbaMatch = color.match(/rgba\((\d+),\s*(\d+),\s*(\d+),\s*([\d.]+)\)/);
  
  if (rgbaMatch) {
    const [_, r, g, b, a] = rgbaMatch;
    return `rgba(${r}, ${g}, ${b}, ${a})`;
  } else if (rgbMatch) {
    const [_, r, g, b] = rgbMatch;
    return `rgba(${r}, ${g}, ${b}, 1)`;
  }
  
  return "rgba(255, 255, 255, 1)";
}

function transformValue(input, inputRange, outputRange, clamp = false) {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  
  const progress = (input - inputMin) / (inputMax - inputMin);
  let result = outputMin + progress * (outputMax - outputMin);
  
  if (clamp) {
    if (outputMax > outputMin) {
      result = Math.min(Math.max(result, outputMin), outputMax);
    } else {
      result = Math.min(Math.max(result, outputMax), outputMin);
    }
  }
  
  return result;
}
