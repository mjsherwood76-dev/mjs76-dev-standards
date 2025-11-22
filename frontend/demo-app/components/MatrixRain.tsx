'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
  /** Color mode for the overlay background */
  mode: 'light' | 'dark';
  /** Whether the effect should be visible */
  enabled?: boolean;
}

/**
 * Matrix Rain Effect Component
 * 
 * Based on: https://codepen.io/yaclive/pen/EayLYO
 * 
 * Renders a canvas-based Matrix rain effect with falling katakana/latin characters.
 * The effect is placed behind a 50% opacity overlay (white for light mode, black for dark mode).
 * 
 * Usage:
 * ```tsx
 * <MatrixRain mode={mode} enabled={theme === 'cyber-noir'} />
 * ```
 */
export function MatrixRain({ mode, enabled = true }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    // Only show in dark mode
    if (!enabled || mode === 'light') return;

    const canvas = canvasRef.current;
    const overlay = overlayRef.current;
    if (!canvas || !overlay) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size to window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Characters - katakana, latin and numbers
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    // Array to store the y position of each column
    const drops: number[] = [];
    for (let i = 0; i < columns; i++) {
      drops[i] = 1;
    }

    // Function to draw the characters
    function draw() {
      if (!ctx || !canvas) return;

      // Black BG for the canvas with slight transparency to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Green text (neon/accent color)
      ctx.fillStyle = '#0F0'; // Bright green like classic Matrix
      ctx.font = `${fontSize}px monospace`;

      // Loop through drops
      for (let i = 0; i < drops.length; i++) {
        // Random character from alphabet
        const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it crosses the screen
        // Higher number = fewer resets = longer trails
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Increment Y coordinate (0.25 = very slow falling speed)
        drops[i] += 0.25;
      }
    }

    // Animation loop
    function animate() {
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, mode]);

  // Don't render in light mode
  if (!enabled || mode === 'light') return null;

  return (
    <>
      {/* Canvas for Matrix rain effect */}
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      
      {/* 90% opacity overlay to dim the effect (dark mode only) */}
      <div
        ref={overlayRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.9)',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </>
  );
}
