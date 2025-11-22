'use client';

import { useEffect, useRef } from 'react';

interface ThemeEasterEggsProps {
  theme: string;
  mode: 'light' | 'dark';
  enabled?: boolean;
}

/**
 * Theme Easter Eggs - Subtle atmospheric effects for each theme
 * 
 * THEME DIRECTORY:
 * - default (Aurora): Aurora Borealis flowing gradient waves - APPROVED ✅
 * - cyber-noir (Neon): Matrix rain effect (light/dark modes) - APPROVED ✅
 * - minimalist (Zen): Perlin noise flowing waves in black/white - APPROVED ✅
 * - earthy (Terracotta): Flowing sand/dust clouds - APPROVED ✅
 * - luxury (Opulence): Floating gold dust with sparkles - APPROVED ✅
 * - soft-pastel: Floating bokeh dots with pastel glow - NEW ✅
 * - verdant: Falling rain lines in forest green - Pacific Northwest rain
 * - syntax: Binary rain (1s and 0s) in green - Terminal aesthetic
 * - nexus: Bouncing purple squares - Gaming energy
 * - sterling (Finance): Floating currency symbols - Financial gravity
 * - vogue (Fashion): Pulsing dots - Editorial rhythm
 * - velocity (Action Sports): Speed lines in red - Motion blur
 * - comic: Ben-Day dots grid - Print texture
 * - vitality (Healthcare): Sine wave pulse in blue - Heart monitor
 * - ember (Culinary): Rising embers in warm orange - Kitchen warmth
 * - soft-pastel: Floating pastel bubbles - Dreamy softness
 * - summit (Outdoor): Falling snow particles - Mountain weather
 * - valor (Combat): Tactical grid overlay - Strategic readiness
 * - prism (Creative): Rainbow particles - Creative energy
 */

export function ThemeEasterEggs({ theme, mode, enabled = true }: ThemeEasterEggsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // TypeScript interfaces for different particle types
    interface SoftPastelCircle {
      offsetX: number;
      offsetY: number;
      sizeMultiplier: number;
    }

    interface SoftPastelParticle {
      x: number;
      y: number;
      baseSize: number;
      color: string;
      speedX: number;
      speedY: number;
      pulseSpeed: number;
      pulsePhase: number;
      circles: SoftPastelCircle[];
    }

    let particles: any[] = [];

    // ============================================================================
    // THEME: AURORA (DEFAULT) - Aurora Borealis waves
    // Inspired by: https://codepen.io/Cancepto/pen/OMQdJx
    // ============================================================================
    const initAurora = () => {
      // Initialize multiple aurora layers
      for (let i = 0; i < 5; i++) {
        particles.push({
          offset: Math.random() * Math.PI * 2,
          speed: 0.002 + Math.random() * 0.003,
          amplitude: 60 + Math.random() * 40,
          baseY: canvas.height * 0.4 + i * 20,
          hue: i * 20, // Varies the color across layers
          opacity: 0.15 + Math.random() * 0.15
        });
      }
    };

    const animateAurora = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Light mode: Blue/cyan aurora colors
        // Dark mode: Green/teal aurora colors (classic northern lights)
        const baseColor = mode === 'dark' 
          ? { h: 150 + p.hue, s: 70, l: 50 } // Green/teal
          : { h: 200 + p.hue, s: 80, l: 60 }; // Blue/cyan
        
        // Create gradient for aurora effect
        const gradient = ctx.createLinearGradient(0, p.baseY - 100, 0, p.baseY + 100);
        gradient.addColorStop(0, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0)`);
        gradient.addColorStop(0.5, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${baseColor.h}, ${baseColor.s}%, ${baseColor.l}%, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        
        // Draw flowing wave shape
        ctx.moveTo(0, canvas.height);
        for (let x = 0; x <= canvas.width; x += 5) {
          const y1 = p.baseY + Math.sin(x * 0.005 + p.offset) * p.amplitude;
          const y2 = y1 + Math.sin(x * 0.008 + p.offset * 1.5) * (p.amplitude * 0.5);
          ctx.lineTo(x, y2);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();
        ctx.fill();
        
        p.offset += p.speed;
      });
    };

    // ============================================================================
    // THEME: CYBER-NOIR (NEON) - Matrix rain effect
    // ============================================================================
    const initCyberNoir = () => {
      const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const nums = '0123456789';
      const alphabet = katakana + latin + nums;
      const columns = Math.floor(canvas.width / 16);
      for (let i = 0; i < columns; i++) {
        particles.push({
          x: i * 16,
          y: Math.random() * canvas.height,
          speed: 0.25 * 16,
          char: alphabet.charAt(Math.floor(Math.random() * alphabet.length)),
          alphabet: alphabet
        });
      }
    };

    const animateCyberNoir = () => {
      // Semi-transparent background to create trail effect
      ctx.fillStyle = mode === 'dark' ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255, 255, 255, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Matrix characters - bright green for dark mode, grey for light mode
      ctx.fillStyle = mode === 'dark' ? '#0F0' : '#666';
      ctx.font = '16px monospace';
      
      particles.forEach(p => {
        ctx.fillText(p.char, p.x, p.y);
        p.y += p.speed;
        
        if (p.y > canvas.height && Math.random() > 0.975) {
          p.y = 0;
          p.char = p.alphabet.charAt(Math.floor(Math.random() * p.alphabet.length));
        }
      });
    };

    // ============================================================================
    // THEME: VERDANT - Pacific Northwest rain
    // ============================================================================
    const initVerdant = () => {
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speed: 1 + Math.random() * 2,
          length: 10 + Math.random() * 20,
          opacity: 0.2 + Math.random() * 0.3 // Increased visibility
        });
      }
    };

    const animateVerdant = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.strokeStyle = `rgba(100, 150, 120, ${p.opacity})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x, p.y + p.length);
        ctx.stroke();
        p.y += p.speed;
        if (p.y > canvas.height) p.y = -p.length;
      });
    };

    // ============================================================================
    // THEME: EARTHY (TERRACOTTA) - Flowing sand/dust clouds
    // ============================================================================
    
    const initEarthy = () => {
      // Create dust cloud particles with varying sizes and speeds
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 30 + Math.random() * 50,
          speedX: 0.2 + Math.random() * 0.4,
          speedY: (Math.random() - 0.5) * 0.3,
          angle: Math.random() * Math.PI * 2,
          angleSpeed: 0.01 + Math.random() * 0.02,
          opacity: 0.15 + Math.random() * 0.15,
          hue: 15 + Math.random() * 25 // Orange to brown range (15-40)
        });
      }
    };

    const animateEarthy = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        // Create gradient for dust cloud effect
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        
        // Mode-aware colors: warm terracotta tones
        const color = mode === 'dark'
          ? `${p.hue}, 55%, 40%` // Warmer, more saturated in dark mode
          : `${p.hue}, 45%, 55%`; // Lighter, softer in light mode
        
        gradient.addColorStop(0, `hsla(${color}, ${p.opacity})`);
        gradient.addColorStop(0.4, `hsla(${color}, ${p.opacity * 0.6})`);
        gradient.addColorStop(1, `hsla(${color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Organic drift movement with slight sinusoidal variation
        const drift = Math.sin(p.angle) * 0.5;
        p.x += p.speedX + drift;
        p.y += p.speedY;
        p.angle += p.angleSpeed;
        
        // Wrap around edges
        if (p.x > canvas.width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = canvas.width + p.size;
        if (p.y > canvas.height + p.size) p.y = -p.size;
        if (p.y < -p.size) p.y = canvas.height + p.size;
      });
    };

    // ============================================================================
    // THEME: SYNTAX (DEVELOPER) - 3D Particle Wave Grid
    // Particle wave with perspective depth - recedes into distance
    // Uses primary blue color from Syntax theme
    // ============================================================================

    let syntaxCount = 0;
    const SEPARATION = 50; // Distance between particles
    let AMOUNTX = 60; // Horizontal particles
    let AMOUNTY = 40; // Vertical particles (depth) - extended further back

    const initSyntax = () => {
      // Create grid of particles
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          particles.push({
            ix: ix,
            iy: iy,
          });
        }
      }
    };

    const animateSyntax = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use subtle colors - cyan for light, purple/pink for dark
      const baseColor = mode === 'dark'
        ? 'rgba(212, 102, 237, ' // Purple/pink
        : 'rgba(34, 195, 195, '; // Cyan

      let i = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          const particle = particles[i++];
          
          // Calculate wave motion
          const waveY = 
            Math.sin((ix + syntaxCount) * 0.5) * 15 + 
            Math.sin((iy + syntaxCount) * 0.5) * 15;
          
          // Calculate scale/size based on wave (for pulsing effect)
          const waveScale = 
            (Math.sin((ix + syntaxCount) * 0.5) + 2) * 4 + 
            (Math.sin((iy + syntaxCount) * 0.5) + 1) * 4;
          
          // Calculate 3D perspective
          // iy represents depth (z-axis) - larger iy = further away
          const perspective = 1 - (iy / AMOUNTY) * 0.8; // 1.0 at front, 0.2 at back (deeper)
          const depth = 180 - (iy * 5); // Camera distance effect (extended)
          
          // Position with perspective
          const baseX = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2);
          particle.x = (baseX * perspective) + canvas.width / 2;
          particle.y = canvas.height - depth + waveY * perspective;
          
          // Size decreases with distance
          const size = (waveScale * 0.15) * perspective; // Much smaller particles
          
          // Opacity decreases with distance (fade into background)
          const opacity = Math.max(0.15, Math.min(0.7, perspective * 0.8));
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
          ctx.fillStyle = baseColor + opacity + ')';
          ctx.fill();
        }
      }

      // Increment counter for animation (speed control - slower)
      syntaxCount += 0.035;
    };

    // ============================================================================
    // THEME: NEXUS (GAMING) - Pac-Man eating dots with wandering ghosts
    // Classic arcade aesthetic with character movement and ghost AI
    // Uses purple, cyan, and pink from Nexus gaming theme
    // ============================================================================
    
    let pacman = {
      x: 0,
      y: 0,
      size: 12,
      speed: 1.5,
      direction: 0, // 0=right, 1=down, 2=left, 3=up
      mouthOpen: 0,
      mouthSpeed: 0.15,
      color: mode === 'dark' ? 'rgb(34, 211, 238)' : 'rgb(6, 182, 212)', // Cyan
    };
    
    let ghosts: Array<{
      x: number;
      y: number;
      color: string;
      speed: number;
      direction: number;
      changeTimer: number;
    }> = [];
    
    let dots: Array<{ x: number; y: number; eaten: boolean }> = [];
    let dotsEaten = 0;
    
    const initNexus = () => {
      // Initialize Pac-Man position
      pacman.x = canvas.width / 2;
      pacman.y = canvas.height / 2;
      
      // Create dot grid (smaller grid for performance)
      const dotSpacing = 40;
      const offsetX = (canvas.width % dotSpacing) / 2;
      const offsetY = (canvas.height % dotSpacing) / 2;
      
      for (let x = offsetX + dotSpacing; x < canvas.width - dotSpacing; x += dotSpacing) {
        for (let y = offsetY + dotSpacing; y < canvas.height - dotSpacing; y += dotSpacing) {
          dots.push({ x, y, eaten: false });
        }
      }
      
      // Create 3 ghosts with different colors from Nexus theme
      const ghostColors = mode === 'dark' 
        ? ['rgb(168, 85, 247)', 'rgb(236, 72, 153)', 'rgb(34, 211, 238)'] // Purple, Pink, Cyan
        : ['rgb(147, 51, 234)', 'rgb(219, 39, 119)', 'rgb(6, 182, 212)'];
      
      for (let i = 0; i < 3; i++) {
        ghosts.push({
          x: (canvas.width / 4) * (i + 1),
          y: canvas.height / 4,
          color: ghostColors[i],
          speed: 0.8 + Math.random() * 0.4,
          direction: Math.floor(Math.random() * 4),
          changeTimer: 0,
        });
      }
    };
    
    const animateNexus = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update Pac-Man color based on mode
      pacman.color = mode === 'dark' ? 'rgb(34, 211, 238)' : 'rgb(6, 182, 212)';
      
      // Draw dots
      dots.forEach(dot => {
        if (!dot.eaten) {
          ctx.beginPath();
          ctx.arc(dot.x, dot.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = mode === 'dark' ? 'rgba(168, 85, 247, 0.4)' : 'rgba(147, 51, 234, 0.3)';
          ctx.fill();
        }
      });
      
      // Move Pac-Man
      const directions = [
        { dx: 1, dy: 0 },   // Right
        { dx: 0, dy: 1 },   // Down
        { dx: -1, dy: 0 },  // Left
        { dx: 0, dy: -1 },  // Up
      ];
      
      const dir = directions[pacman.direction];
      pacman.x += dir.dx * pacman.speed;
      pacman.y += dir.dy * pacman.speed;
      
      // Wrap around edges
      if (pacman.x < -pacman.size) pacman.x = canvas.width + pacman.size;
      if (pacman.x > canvas.width + pacman.size) pacman.x = -pacman.size;
      if (pacman.y < -pacman.size) pacman.y = canvas.height + pacman.size;
      if (pacman.y > canvas.height + pacman.size) pacman.y = -pacman.size;
      
      // Change direction occasionally
      if (Math.random() < 0.02) {
        pacman.direction = Math.floor(Math.random() * 4);
      }
      
      // Animate mouth
      pacman.mouthOpen += pacman.mouthSpeed;
      if (pacman.mouthOpen > 0.5 || pacman.mouthOpen < 0) {
        pacman.mouthSpeed *= -1;
      }
      
      // Check for dot eating
      dots.forEach(dot => {
        if (!dot.eaten) {
          const dx = pacman.x - dot.x;
          const dy = pacman.y - dot.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < pacman.size) {
            dot.eaten = true;
            dotsEaten++;
            
            // Reset dots when most are eaten
            if (dotsEaten >= dots.length * 0.8) {
              dots.forEach(d => d.eaten = false);
              dotsEaten = 0;
            }
          }
        }
      });
      
      // Draw Pac-Man
      ctx.save();
      ctx.translate(pacman.x, pacman.y);
      ctx.rotate((pacman.direction * Math.PI) / 2);
      
      ctx.beginPath();
      const mouthAngle = pacman.mouthOpen * 0.6; // Max 0.6 radians
      ctx.arc(0, 0, pacman.size, mouthAngle, Math.PI * 2 - mouthAngle);
      ctx.lineTo(0, 0);
      ctx.fillStyle = pacman.color;
      ctx.fill();
      
      ctx.restore();
      
      // Move and draw ghosts
      ghosts.forEach(ghost => {
        // Simple AI - change direction occasionally or when hitting edges
        ghost.changeTimer++;
        if (ghost.changeTimer > 60 || Math.random() < 0.015) {
          ghost.direction = Math.floor(Math.random() * 4);
          ghost.changeTimer = 0;
        }
        
        const ghostDir = directions[ghost.direction];
        ghost.x += ghostDir.dx * ghost.speed;
        ghost.y += ghostDir.dy * ghost.speed;
        
        // Bounce off edges
        if (ghost.x < 20 || ghost.x > canvas.width - 20) {
          ghost.direction = ghost.direction === 0 ? 2 : 0; // Flip horizontal
          ghost.x = Math.max(20, Math.min(canvas.width - 20, ghost.x));
        }
        if (ghost.y < 20 || ghost.y > canvas.height - 20) {
          ghost.direction = ghost.direction === 1 ? 3 : 1; // Flip vertical
          ghost.y = Math.max(20, Math.min(canvas.height - 20, ghost.y));
        }
        
        // Draw ghost body (rounded top, wavy bottom)
        ctx.beginPath();
        ctx.arc(ghost.x, ghost.y - 2, 10, Math.PI, 0, false);
        ctx.lineTo(ghost.x + 10, ghost.y + 8);
        
        // Wavy bottom
        for (let i = 0; i < 4; i++) {
          const waveX = ghost.x + 10 - (i * 5);
          const waveY = ghost.y + 8 + (i % 2 === 0 ? -3 : 0);
          ctx.lineTo(waveX, waveY);
        }
        
        ctx.lineTo(ghost.x - 10, ghost.y + 8);
        ctx.closePath();
        ctx.fillStyle = ghost.color;
        ctx.fill();
        
        // Eyes
        ctx.beginPath();
        ctx.arc(ghost.x - 4, ghost.y - 2, 3, 0, Math.PI * 2);
        ctx.arc(ghost.x + 4, ghost.y - 2, 3, 0, Math.PI * 2);
        ctx.fillStyle = mode === 'dark' ? '#1a1a1a' : '#ffffff';
        ctx.fill();
        
        // Pupils (look in movement direction)
        const pupilOffset = 1.5;
        const pupilX = ghostDir.dx * pupilOffset;
        const pupilY = ghostDir.dy * pupilOffset;
        
        ctx.beginPath();
        ctx.arc(ghost.x - 4 + pupilX, ghost.y - 2 + pupilY, 1.5, 0, Math.PI * 2);
        ctx.arc(ghost.x + 4 + pupilX, ghost.y - 2 + pupilY, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = mode === 'dark' ? 'rgb(34, 211, 238)' : 'rgb(6, 182, 212)';
        ctx.fill();
      });
    };

    // ============================================================================
    // THEME: OPULENCE (LUXURY) - Floating gold dust with sparkles
    // ============================================================================
    const initOpulence = () => {
      // Mix of larger gold particles and tiny sparkles
      for (let i = 0; i < 50; i++) {
        const isSparkle = Math.random() > 0.6;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 0.3,
          speedY: -0.1 - Math.random() * 0.3, // Float upward slowly
          size: isSparkle ? 1 + Math.random() * 1.5 : 2 + Math.random() * 3,
          opacity: isSparkle ? 0.5 + Math.random() * 0.3 : 0.3 + Math.random() * 0.3,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: 0.03 + Math.random() * 0.05,
          isSparkle: isSparkle,
          wobble: Math.random() * Math.PI * 2,
          wobbleSpeed: 0.02 + Math.random() * 0.03
        });
      }
    };

    const animateOpulence = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        const wobbleX = Math.sin(p.wobble) * 2;
        
        // Twinkle effect - brightness varies
        const twinkle = Math.sin(p.twinklePhase) * 0.3 + 0.7; // 0.4 to 1.0
        const currentOpacity = p.opacity * twinkle;
        
        if (p.isSparkle) {
          // Sparkles: bright white-gold with glow
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#FFD700';
          ctx.fillStyle = `rgba(255, 223, 0, ${currentOpacity})`; // Brighter gold
        } else {
          // Larger gold dust particles
          ctx.shadowBlur = 7;
          ctx.shadowColor = '#FFD700';
          ctx.fillStyle = `rgba(255, 200, 50, ${currentOpacity})`; // More vibrant gold
        }
        
        ctx.beginPath();
        ctx.arc(p.x + wobbleX, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        
        // Reset shadow for next particle
        ctx.shadowBlur = 0;
        
        // Float upward with gentle wobble
        p.x += p.speedX;
        p.y += p.speedY;
        p.wobble += p.wobbleSpeed;
        p.twinklePhase += p.twinkleSpeed;
        
        // Wrap around edges
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
      });
    };

    // ============================================================================
    // THEME: STERLING (FINANCE) - Connected network
    // ============================================================================
    // Sophisticated particle network representing financial connections, markets, data flow
    // Particles drift subtly and connect to nearby neighbors
    // Conservative movement matches Sterling's formal aesthetic
    // ============================================================================
    
    let mouseX = canvas.width / 2;
    let mouseY = canvas.height / 2;

    const initSterling = () => {
      // Create grid of network nodes - 20% more points
      const gridSize = 22; // Increased from 20 for more density
      const spacingX = canvas.width / gridSize;
      const spacingY = canvas.height / gridSize;

      for (let x = 0; x < canvas.width; x += spacingX) {
        for (let y = 0; y < canvas.height; y += spacingY) {
          const px = x + Math.random() * spacingX;
          const py = y + Math.random() * spacingY;
          
          particles.push({
            x: px,
            y: py,
            originX: px,
            originY: py,
            vx: (Math.random() - 0.5) * 1.2,
            vy: (Math.random() - 0.5) * 1.2,
            radius: 1 + Math.random() * 1,
            baseRadius: 1 + Math.random() * 1, // Store base radius for z-axis effect
            scale: 1, // Z-axis scale (depth)
            scaleSpeed: 0.01 + Math.random() * 0.01, // Speed of z movement
            scalePhase: Math.random() * Math.PI * 2, // Random starting phase
            active: 0.15,
            closest: [],
          });
        }
      }

      // For each particle, find 5 closest neighbors
      particles.forEach((p1, i) => {
        const distances: Array<{ particle: typeof p1; distance: number }> = [];
        
        particles.forEach((p2, j) => {
          if (i !== j) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            const distance = dx * dx + dy * dy;
            distances.push({ particle: p2, distance });
          }
        });

        // Sort and take 5 closest
        distances.sort((a, b) => a.distance - b.distance);
        p1.closest = distances.slice(0, 5).map(d => d.particle);
      });
    };

    const animateSterling = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Sterling colors - more muted for subtlety
      const baseColor = mode === 'dark' 
        ? 'rgba(179, 188, 204, ' // Light slate - more muted
        : 'rgba(51, 60, 77, '; // Dark navy - more muted
      
      const accentColor = mode === 'dark'
        ? 'rgba(217, 171, 64, ' // Muted gold
        : 'rgba(180, 140, 50, '; // Darker muted gold

      particles.forEach((p) => {
        // Calculate distance from mouse for interaction
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Update activation based on mouse proximity (more subtle)
        if (distance < 150) {
          p.active = 0.45; // Less intense highlight
        } else if (distance < 300) {
          p.active = 0.3;
        } else if (distance < 500) {
          p.active = 0.2;
        } else {
          p.active = 0.15; // Base state - always visible
        }

        // Draw connections to closest neighbors - always visible
        p.closest.forEach((neighbor: any) => {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(neighbor.x, neighbor.y);
          
          // Use gold accent for highly active connections, base color otherwise
          const color = p.active > 0.35 ? accentColor : baseColor;
          // Adjust line opacity based on both particles' z-depth
          const depthOpacity = (p.scale + neighbor.scale) / 2;
          ctx.strokeStyle = color + (p.active * 0.6 * depthOpacity) + ')';
          ctx.lineWidth = 0.5; // Slightly thicker for better visibility
          ctx.stroke();
        });

        // Update z-axis scale (depth effect)
        p.scalePhase += p.scaleSpeed;
        p.scale = 0.6 + Math.sin(p.scalePhase) * 0.4; // Oscillate between 0.6 and 1.0

        // Draw particle node with z-axis scaling
        ctx.beginPath();
        const scaledRadius = p.baseRadius * p.scale;
        ctx.arc(p.x, p.y, scaledRadius, 0, Math.PI * 2);
        const color = p.active > 0.35 ? accentColor : baseColor;
        ctx.fillStyle = color + (p.active * 0.8 * p.scale) + ')'; // Opacity affected by depth
        ctx.fill();

        // More movement with return to origin
        p.vx += (p.originX - p.x) * 0.003;
        p.vy += (p.originY - p.y) * 0.003;
        
        // Add more random drift
        p.vx += (Math.random() - 0.5) * 0.05;
        p.vy += (Math.random() - 0.5) * 0.05;
        
        // Less damping for more movement
        p.vx *= 0.95;
        p.vy *= 0.95;
        
        // Update position (40% greater distance)
        p.x += p.vx;
        p.y += p.vy;
        
        // Keep within larger drift range - 40% greater distance
        const maxDrift = 70; // Increased from 50px (40% more)
        if (Math.abs(p.x - p.originX) > maxDrift) {
          p.x = p.originX + Math.sign(p.x - p.originX) * maxDrift;
          p.vx *= -0.5;
        }
        if (Math.abs(p.y - p.originY) > maxDrift) {
          p.y = p.originY + Math.sign(p.y - p.originY) * maxDrift;
          p.vy *= -0.5;
        }
      });
    };

    // ============================================================================
    // THEME: VOGUE (FASHION) - Flowing fabric waves
    // Diagonal flowing waves like draped silk fabric from upper-left to lower-right
    // Red and pink shades with overlapping fabric darkening effect
    // Similar to Aurora but with fashion color palette and converging/diverging lines
    // ============================================================================
    const initVogue = () => {
      // Create 9 flowing fabric waves with varied thickness
      // Thickness pattern: thicker in middle, thinner at edges for visual interest
      const thicknessMultipliers = [0.7, 1.0, 1.3, 0.9, 1.5, 1.1, 0.8, 1.2, 0.9];
      
      for (let i = 0; i < 9; i++) {
        particles.push({
          offset: (i * Math.PI * 2) / 9, // Phase offset for each wave
          waveIndex: i, // Track which wave for spacing calculation
          amplitude: 30 + i * 10, // Increasing amplitude (narrower top, wider bottom)
          frequency: 0.003 + i * 0.0003,
          speed: 0.01 + i * 0.0015,
          hue: mode === 'dark' ? 348 + i * 1.5 : 348 + i * 1.5, // Red-pink range
          hueShift: 0, // For color cycling
          thicknessMultiplier: thicknessMultipliers[i],
        });
      }
    };

    const animateVogue = () => {
      // Use globalCompositeOperation for silk fabric layering effect
      // Multiple passes will naturally darken where fabrics overlap
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, index) => {
        ctx.beginPath();
        
        // Spacing between waves: moderate at upper-left, very wide at lower-right
        const waveSpacing = (p.waveIndex - 4) * 18; // Center around middle wave, wider spread
        
        // Start point (upper left, moderately spaced)
        const startSpacing = waveSpacing * 0.6; // 60% spacing at start (more visible gap)
        let startY = (canvas.height * 0.12) + startSpacing + Math.sin(p.offset) * 10;
        ctx.moveTo(0, startY);

        // Draw flowing wave across canvas diagonally
        for (let x = 0; x <= canvas.width; x += 3) {
          // Diagonal flow: y increases as x increases
          const diagonalProgress = x / canvas.width;
          
          // Spacing expands from left to right (moderate to very wide)
          const expandedSpacing = waveSpacing * (0.6 + diagonalProgress * 3.2);
          
          const baseY = (canvas.height * 0.12) + expandedSpacing + (diagonalProgress * canvas.height * 0.75);
          
          // Wave amplitude increases from left to right (narrow to wide)
          const dynamicAmplitude = p.amplitude * (0.3 + diagonalProgress * 0.7);
          
          // Sine wave for flowing fabric effect - REVERSED to flow from right to left
          // Negative frequency creates right-to-left wave motion
          const wave = Math.sin(-x * p.frequency + p.offset) * dynamicAmplitude;
          const y = baseY + wave;
          
          ctx.lineTo(x, y);
        }

        // Fashion colors: shades of red and pink with subtle hue cycling
        const saturation = mode === 'dark' ? 85 : 75;
        const lightness = mode === 'dark' ? 54 + index * 2 : 44 + index * 2;
        
        // Cycle hue slightly for movement
        p.hueShift = (p.hueShift + 0.05) % 10;
        const currentHue = p.hue + Math.sin(p.hueShift) * 3; // Subtle ±3 degree hue shift
        
        // Gradient for depth - more opaque for layering effect
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, `hsla(${currentHue}, ${saturation}%, ${lightness}%, 0.18)`);
        gradient.addColorStop(0.5, `hsla(${currentHue}, ${saturation}%, ${lightness}%, 0.24)`);
        gradient.addColorStop(1, `hsla(${currentHue}, ${saturation}%, ${lightness}%, 0.18)`);

        ctx.strokeStyle = gradient;
        // Varied thickness: base 14-38px, multiplied by per-line thickness factor
        ctx.lineWidth = (14 + index * 3) * p.thicknessMultiplier;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        
        // Silk fabric layering: overlapping areas naturally darken
        ctx.globalCompositeOperation = 'multiply'; // Darkens where fabrics overlap
        ctx.stroke();
        ctx.globalCompositeOperation = 'source-over'; // Reset for next draw

        // Advance wave
        p.offset += p.speed;
      });
    };

    // ============================================================================
    // THEME: VELOCITY (ACTION SPORTS) - Speed lines
    // Horizontal streaking speed lines in hot pink and cyan
    // High-energy motion blur effect with fast whooshing across screen
    // ============================================================================
    const initVelocity = () => {
      // Hot pink and cyan speed lines (theme colors)
      const velocityColors = mode === 'dark'
        ? [
            { r: 255, g: 77, b: 153 },   // Hot pink (hsl 340 100% 60%)
            { r: 0, g: 229, b: 255 },    // Cyan (hsl 180 100% 55%)
          ]
        : [
            { r: 230, g: 26, b: 128 },   // Hot pink (hsl 340 90% 50%)
            { r: 0, g: 186, b: 204 },    // Cyan (hsl 180 90% 45%)
          ];

      for (let i = 0; i < 20; i++) {
        const color = velocityColors[Math.floor(Math.random() * velocityColors.length)];
        particles.push({
          x: -100,
          y: Math.random() * canvas.height,
          speed: 4 + Math.random() * 8,     // Very fast
          length: 40 + Math.random() * 80,   // Varying lengths
          thickness: 1 + Math.random() * 2,  // 1-3px thickness
          opacity: 0.3 + Math.random() * 0.4, // 0.3-0.7
          color: color,
          delay: Math.random() * 100,        // Stagger starts
        });
      }
    };

    const animateVelocity = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        if (p.delay > 0) {
          p.delay--;
          return;
        }

        // Create gradient from opaque to transparent
        const gradient = ctx.createLinearGradient(p.x, p.y, p.x - p.length, p.y);
        gradient.addColorStop(0, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity})`);
        gradient.addColorStop(0.7, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, ${p.opacity * 0.3})`);
        gradient.addColorStop(1, `rgba(${p.color.r}, ${p.color.g}, ${p.color.b}, 0)`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = 'round';
        
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x - p.length, p.y);
        ctx.stroke();
        
        // Move line
        p.x += p.speed;
        
        // Reset when off screen
        if (p.x > canvas.width + p.length) {
          p.x = -p.length;
          p.y = Math.random() * canvas.height;
          p.speed = 4 + Math.random() * 8;
          p.delay = Math.random() * 50; // New delay before restarting
        }
      });
    };

    // ============================================================================
    // THEME: COMIC - Floating bold dots
    // Bold, colorful dots matching Comic theme's vibrant blue/yellow/red palette
    // Pop-art style with bouncy motion
    // ============================================================================
    const initComic = () => {
      // Use theme colors: primary blue, secondary yellow, accent red
      const comicColors = mode === 'dark' 
        ? [
            'hsla(220, 100%, 60%, 0.4)',  // Bright blue (primary)
            'hsla(40, 100%, 60%, 0.4)',   // Yellow (secondary)
            'hsla(350, 100%, 65%, 0.4)',  // Red (accent)
          ]
        : [
            'hsla(220, 100%, 50%, 0.3)',  // Blue (primary)
            'hsla(40, 100%, 55%, 0.3)',   // Yellow (secondary)
            'hsla(350, 100%, 55%, 0.3)',  // Red (accent)
          ];

      // Create 30 floating dots
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: 8 + Math.random() * 12, // 8-20px dots
          color: comicColors[Math.floor(Math.random() * comicColors.length)],
          speedX: (Math.random() - 0.5) * 1.2,
          speedY: (Math.random() - 0.5) * 1.2,
          pulsePhase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.03 + Math.random() * 0.02,
        });
      }
    };

    const animateComic = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Bouncy pulse effect
        const pulse = Math.sin(p.pulsePhase) * 0.3 + 1; // 0.7-1.3x
        const currentSize = p.size * pulse;

        // Draw bold dot
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, currentSize, 0, Math.PI * 2);
        ctx.fill();

        // Move dot
        p.x += p.speedX;
        p.y += p.speedY;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;

        // Keep within bounds
        p.x = Math.max(0, Math.min(canvas.width, p.x));
        p.y = Math.max(0, Math.min(canvas.height, p.y));

        // Update pulse
        p.pulsePhase += p.pulseSpeed;
      });
    };

    // ============================================================================
    // THEME: VITALITY (HEALTHCARE) - Heartbeat/Pulse Waves
    // Multiple smooth sine waves like medical monitor/EKG
    // Healthcare blue and teal colors representing life force and vitality
    // ============================================================================
    const initVitality = () => {
      // Healthcare colors from Vitality theme
      const vitalityColors = mode === 'dark'
        ? [
            'hsla(210, 70%, 55%, 0.5)',  // Primary blue
            'hsla(170, 45%, 55%, 0.35)', // Secondary teal
            'hsla(195, 75%, 60%, 0.4)',  // Accent cyan
            'hsla(210, 70%, 55%, 0.25)',  // Lighter blue
          ]
        : [
            'hsla(210, 65%, 45%, 0.4)',  // Primary blue
            'hsla(170, 40%, 50%, 0.3)',  // Secondary teal
            'hsla(195, 75%, 55%, 0.35)', // Accent cyan
            'hsla(210, 65%, 45%, 0.2)',  // Lighter blue
          ];

      // Create 4 sine wave layers
      particles.push(
        {
          time: 0,
          timeModifier: 1,
          amplitude: 80,
          wavelength: 200,
          speed: 5,
          lineWidth: 3,
          color: vitalityColors[0],
          segmentLength: 20,
        },
        {
          time: 0,
          timeModifier: 1,
          amplitude: 120,
          wavelength: 200,
          speed: 5,
          lineWidth: 2,
          color: vitalityColors[1],
          segmentLength: 15,
        },
        {
          time: 0,
          timeModifier: 1,
          amplitude: -70,
          wavelength: 50,
          speed: 5,
          lineWidth: 2.5,
          color: vitalityColors[2],
          segmentLength: 10,
        },
        {
          time: 0,
          timeModifier: 1,
          amplitude: -50,
          wavelength: 100,
          speed: 5,
          lineWidth: 1.5,
          color: vitalityColors[3],
          segmentLength: 20,
        }
      );
    };

    const animateVitality = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const yAxis = canvas.height / 2;
      const waveWidth = canvas.width * 0.97;  // 97% width - closer to edges
      const waveLeft = canvas.width * 0.015;  // Start at 1.5% left - closer to edge

      particles.forEach((wave) => {
        ctx.lineWidth = wave.lineWidth;
        ctx.strokeStyle = wave.color;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();

        // Starting line from left edge to wave start
        ctx.moveTo(0, yAxis);
        ctx.lineTo(waveLeft, yAxis);

        // Draw sine wave
        for (let i = 0; i < waveWidth; i += wave.segmentLength) {
          const x = (wave.time * wave.speed) + (-yAxis + i) / wave.wavelength;
          const y = Math.sin(x);

          // Ease amplitude from center outwards
          const easePercent = i / waveWidth;
          const easedAmplitude = wave.amplitude * (Math.sin(easePercent * Math.PI * 2 - Math.PI / 2) + 1) * 0.5;

          ctx.lineTo(i + waveLeft, easedAmplitude * y + yAxis);
        }

        // Ending line to right edge
        ctx.lineTo(canvas.width, yAxis);

        ctx.stroke();

        // Advance wave time (slower)
        wave.time -= 0.004;
      });
    };

    // ============================================================================
    // THEME: EMBER (CULINARY) - Rising flame particles
    // Warm orange/yellow embers rising from bottom with wavering motion
    // Particles fade and shrink as they rise with glow effect
    // ============================================================================
    const numberOfEmberParticles = 150; // Reduced for better performance

    const initEmber = () => {
      for (let i = 0; i < numberOfEmberParticles; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: canvas.height + Math.random() * 50,
          radius: Math.random() * 6 + 3, // 3-9px (bigger)
          initialRadius: 0,
          speedY: Math.random() * 1.5 + 0.8, // 0.8-2.3px per frame
          life: Math.random() * 350 + 250, // 250-600 frames (longer life = higher)
          maxLife: 0,
          hue: Math.random() * 30 + 10, // 10-40 (orange to yellow)
          waver: Math.random() * 2 - 1,
          waverSpeed: Math.random() * 0.05 + 0.01,
        });
        
        // Store initial values
        particles[i].initialRadius = particles[i].radius;
        particles[i].maxLife = particles[i].life;
      }
    };

    const animateEmber = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // Update life
        p.life--;
        
        // Move upward
        p.y -= p.speedY;
        
        // Wavering horizontal movement (like heat distortion)
        p.waver += p.waverSpeed;
        p.x += Math.sin(p.waver) * 1.0;
        
        // Shrink radius as particle ages
        p.radius = p.initialRadius * (p.life / p.maxLife);
        
        // Reset if dead or too small
        if (p.life <= 0 || p.radius <= 0.1) {
          p.x = Math.random() * canvas.width;
          p.y = canvas.height + Math.random() * 50;
          p.radius = Math.random() * 6 + 3; // 3-9px (bigger)
          p.initialRadius = p.radius;
          p.speedY = Math.random() * 1.5 + 0.8;
          p.life = Math.random() * 350 + 250; // 250-600 frames (longer life = higher)
          p.maxLife = p.life;
          p.hue = Math.random() * 30 + 10;
          p.waver = Math.random() * 2 - 1;
          p.waverSpeed = Math.random() * 0.05 + 0.01;
        }
        
        // Calculate opacity based on life
        const opacity = (p.life / p.maxLife) * 0.7;
        
        // Mute colors for light mode (lower saturation and brightness)
        const saturation = mode === 'dark' ? 100 : 70;
        const lightness = mode === 'dark' ? 50 : 45;
        
        // Draw particle with glow
        ctx.shadowColor = `hsl(${p.hue}, ${saturation}%, ${lightness}%)`;
        ctx.shadowBlur = mode === 'dark' ? 15 : 10;
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, ${saturation}%, ${lightness}%, ${opacity})`;
        ctx.fill();
        
        // Reset shadow
        ctx.shadowBlur = 0;
      });
    };

    // ============================================================================
    // THEME: ZEN (MINIMALIST) - Perlin noise flowing waves
    // ============================================================================
    
    // Simple Perlin noise implementation
    class PerlinNoise {
      private p: number[];
      
      constructor() {
        this.p = [];
        for (let i = 0; i < 256; i++) this.p[i] = Math.floor(Math.random() * 256);
        for (let i = 0; i < 256; i++) this.p[i + 256] = this.p[i];
      }
      
      fade(t: number): number {
        return t * t * t * (t * (t * 6 - 15) + 10);
      }
      
      lerp(t: number, a: number, b: number): number {
        return a + t * (b - a);
      }
      
      grad(hash: number, x: number, y: number): number {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
      }
      
      noise(x: number, y: number): number {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        
        const u = this.fade(x);
        const v = this.fade(y);
        
        const a = this.p[X] + Y;
        const aa = this.p[a];
        const ab = this.p[a + 1];
        const b = this.p[X + 1] + Y;
        const ba = this.p[b];
        const bb = this.p[b + 1];
        
        return this.lerp(v,
          this.lerp(u, this.grad(this.p[aa], x, y), this.grad(this.p[ba], x - 1, y)),
          this.lerp(u, this.grad(this.p[ab], x, y - 1), this.grad(this.p[bb], x - 1, y - 1))
        );
      }
    }
    
    let perlin: PerlinNoise;
    let variators: number[] = [];
    const variation = 0.0025;
    const amp = 300;
    const maxLines = 40;
    
    const initZen = () => {
      perlin = new PerlinNoise();
      variators = [];
      for (let i = 0, u = 0; i < maxLines; i++, u += 0.02) {
        variators[i] = u;
      }
    };

    const animateZen = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const startY = canvas.height / 2;
      
      // Draw flowing Perlin noise waves
      for (let i = 0; i <= maxLines; i++) {
        ctx.beginPath();
        ctx.moveTo(0, startY);
        
        let lastY = 0;
        for (let x = 0; x <= canvas.width; x++) {
          const y = perlin.noise(x * variation + variators[i], x * variation);
          ctx.lineTo(x, startY + amp * y);
          lastY = y;
        }
        
        // Mode-aware colors: black waves on light theme, white waves on dark theme
        const alpha = Math.min(Math.abs(lastY) + 0.05, 0.05);
        if (mode === 'dark') {
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 2})`;
        } else {
          ctx.strokeStyle = `rgba(0, 0, 0, ${alpha * 2})`;
        }
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.closePath();
        
        // Increment variators for animation
        variators[i] += 0.005;
      }
    };

    // ============================================================================
    // THEME: SOFT-PASTEL - Watercolor blobs with soft edges
    // Organic shapes created from overlapping circles with radial gradients
    // Gentle floating motion with slow morphing/pulsing
    // ============================================================================
    const initSoftPastel = () => {
      // Soft pastel color palette matching theme
      const pastelColors = [
        'hsla(330, 100%, 85%, 0.6)',  // Baby pink
        'hsla(270, 100%, 85%, 0.6)',  // Lavender
        'hsla(200, 100%, 85%, 0.6)',  // Baby blue
        'hsla(150, 100%, 85%, 0.6)',  // Mint green
        'hsla(40, 100%, 85%, 0.6)',   // Peach
        'hsla(290, 100%, 85%, 0.6)',  // Light purple
      ];

      // Create 15 watercolor blobs
      for (let i = 0; i < 15; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          baseSize: 60 + Math.random() * 80, // 60-140px base size
          color: pastelColors[Math.floor(Math.random() * pastelColors.length)],
          speedX: (Math.random() - 0.5) * 0.3, // Slow drift
          speedY: (Math.random() - 0.5) * 0.3,
          pulseSpeed: 0.001 + Math.random() * 0.002, // Slow pulsing
          pulsePhase: Math.random() * Math.PI * 2, // Random starting phase
          // Each blob has 3-5 overlapping circles for organic shape
          circles: Array.from({ length: 3 + Math.floor(Math.random() * 3) }, () => ({
            offsetX: (Math.random() - 0.5) * 40,
            offsetY: (Math.random() - 0.5) * 40,
            sizeMultiplier: 0.6 + Math.random() * 0.6, // 0.6-1.2x
          })),
        });
      }
    };

    const animateSoftPastel = () => {
      if (!ctx || !canvas) return;

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Use screen blend mode for overlapping brightness
      ctx.globalCompositeOperation = 'screen';

      const now = Date.now();

      particles.forEach((p) => {
        // Slow pulsing animation (organic breathing)
        const pulseValue = Math.sin(now * p.pulseSpeed + p.pulsePhase) * 0.15 + 0.85; // 0.7-1.0
        const currentSize = p.baseSize * pulseValue;

        // Draw each blob as multiple overlapping circles with radial gradients
        p.circles.forEach((circle: SoftPastelCircle) => {
          const circleSize = currentSize * circle.sizeMultiplier;
          const finalX = p.x + circle.offsetX;
          const finalY = p.y + circle.offsetY;

          // Create radial gradient from center (opaque) to edge (transparent)
          const gradient = ctx.createRadialGradient(
            finalX, finalY, 0,
            finalX, finalY, circleSize
          );

          // Parse color to adjust alpha
          const colorMatch = p.color.match(/hsla\(([^,]+),\s*([^,]+),\s*([^,]+),\s*([^)]+)\)/);
          if (colorMatch) {
            const [, h, s, l] = colorMatch;
            gradient.addColorStop(0, `hsla(${h}, ${s}, ${l}, 0.5)`); // Opaque center
            gradient.addColorStop(0.5, `hsla(${h}, ${s}, ${l}, 0.25)`); // Mid fade
            gradient.addColorStop(1, `hsla(${h}, ${s}, ${l}, 0)`); // Transparent edge
          }

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(finalX, finalY, circleSize, 0, Math.PI * 2);
          ctx.fill();
        });

        // Gentle floating motion with wrapping
        p.x += p.speedX;
        p.y += p.speedY;

        // Wrap around edges
        if (p.x < -150) p.x = canvas.width + 150;
        if (p.x > canvas.width + 150) p.x = -150;
        if (p.y < -150) p.y = canvas.height + 150;
        if (p.y > canvas.height + 150) p.y = -150;
      });

      // Reset blend mode
      ctx.globalCompositeOperation = 'source-over';
    };

    // ============================================================================
    // THEME: SUMMIT (OUTDOOR) - Falling snow
    // Multi-layered snowflakes with depth and realistic physics
    // Inspired by advanced snowfall effect with layered depth
    // ============================================================================
    const initSummit = () => {
      // Create three layers of snowflakes for depth effect
      // Layer 1: Foreground (larger, faster, fewer)
      for (let i = 0; i < 40; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          radius: Math.random() * 2 + 2, // 2-4px
          speedY: Math.random() * 1.5 + 1.5, // 1.5-3
          speedX: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.3 + 0.6, // 0.6-0.9
          layer: 1,
        });
      }
      // Layer 2: Midground (medium)
      for (let i = 0; i < 30; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          radius: Math.random() * 1 + 1.5, // 1.5-2.5px
          speedY: Math.random() * 0.75 + 0.75, // 0.75-1.5
          speedX: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.25 + 0.4, // 0.4-0.65
          layer: 2,
        });
      }
      // Layer 3: Background (smaller, slower, more numerous)
      for (let i = 0; i < 50; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * -canvas.height,
          radius: Math.random() * 0.7 + 0.8, // 0.8-1.5px
          speedY: Math.random() * 0.5 + 0.3, // 0.3-0.8
          speedX: Math.random() * 0.6 - 0.3,
          opacity: Math.random() * 0.2 + 0.25, // 0.25-0.45
          layer: 3,
        });
      }
    };

    const animateSummit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Color based on mode: cool blue-gray for light, white for dark
      const snowColor = mode === 'dark' 
        ? { r: 255, g: 255, b: 255 } 
        : { r: 160, g: 180, b: 200 }; // Cool blue-gray

      particles.forEach((p) => {
        // Sine wave sway for natural movement
        const sway = Math.sin(p.y * 0.01) * 0.5;

        // Draw snowflake with mode-appropriate color
        ctx.fillStyle = `rgba(${snowColor.r}, ${snowColor.g}, ${snowColor.b}, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x + p.speedX + sway, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        // Update position
        p.y += p.speedY;
        p.x += p.speedX + sway;

        // Reset when off screen
        if (p.y > canvas.height) {
          p.y = 0;
          p.x = Math.random() * canvas.width;
        }

        // Wrap horizontally
        if (p.x > canvas.width) p.x = 0;
        if (p.x < 0) p.x = canvas.width;
      });
    };

    // ============================================================================
    // THEME: VALOR (COMBAT SPORTS) - Impact ripples
    // Circular shockwaves like punch impacts on the screen
    // Red ripples with gold outer rings - kinetic combat energy
    // ============================================================================
    const initValor = () => {
      // Start with a few initial impacts
      for (let i = 0; i < 3; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 120 + Math.random() * 80,
          speed: 2 + Math.random() * 1.5,
          opacity: 0.8,
          fadeSpeed: 0.012,
          color: Math.random() > 0.5 ? 'red' : 'gold',
          delay: i * 30, // Stagger the initial impacts
        });
      }
    };

    const animateValor = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Theme colors: red and gold for combat sports
      const colors = mode === 'dark'
        ? {
            red: { r: 255, g: 77, b: 77 },    // hsl(0 90% 55%) - bright red
            gold: { r: 255, g: 204, b: 77 },  // hsl(45 100% 60%) - bright gold
          }
        : {
            red: { r: 179, g: 23, b: 23 },    // hsl(0 75% 45%) - deep red
            gold: { r: 255, g: 191, b: 0 },   // hsl(45 100% 50%) - gold
          };

      // Random new impacts
      if (Math.random() < 0.015) { // ~1.5% chance per frame for new impact
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0,
          maxRadius: 120 + Math.random() * 80,
          speed: 2 + Math.random() * 1.5,
          opacity: 0.8,
          fadeSpeed: 0.012,
          color: Math.random() > 0.5 ? 'red' : 'gold',
          delay: 0,
        });
      }

      // Draw and update ripples
      particles = particles.filter(p => {
        if (p.delay > 0) {
          p.delay--;
          return true;
        }

        if (p.opacity <= 0) return false;

        const colorRGB = p.color === 'red' ? colors.red : colors.gold;

        // Draw multiple rings for impact effect
        // Inner ring (brighter, thicker)
        ctx.strokeStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${p.opacity})`;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Middle ring (medium)
        if (p.radius > 15) {
          ctx.strokeStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${p.opacity * 0.6})`;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius - 8, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Outer ring (faint, wider)
        if (p.radius > 30) {
          ctx.strokeStyle = `rgba(${colorRGB.r}, ${colorRGB.g}, ${colorRGB.b}, ${p.opacity * 0.3})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius + 12, 0, Math.PI * 2);
          ctx.stroke();
        }

        // Expand and fade
        p.radius += p.speed;
        p.opacity -= p.fadeSpeed;

        // Speed up expansion as it grows
        if (p.radius > p.maxRadius * 0.5) {
          p.speed *= 1.02;
        }

        return p.radius < p.maxRadius && p.opacity > 0;
      });
    };

    // ============================================================================
    // THEME: PRISM (CREATIVE) - Rainbow particles
    // ============================================================================
    const initPrism = () => {
      for (let i = 0; i < 25; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          speedX: (Math.random() - 0.5) * 0.4,
          speedY: (Math.random() - 0.5) * 0.4,
          hue: Math.random() * 360,
          hueSpeed: 0.5,
          size: 2 + Math.random() * 3,
          opacity: 0.25 + Math.random() * 0.3 // Increased visibility
        });
      }
    };

    const animatePrism = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        ctx.fillStyle = `hsla(${p.hue}, 70%, 60%, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        p.x += p.speedX;
        p.y += p.speedY;
        p.hue = (p.hue + p.hueSpeed) % 360;
        if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
      });
    };

    // ============================================================================
    // ROUTER: Initialize and animate based on theme
    // ============================================================================
    const initializeEffect = () => {
      particles = [];
      
      switch(theme) {
        case 'default': initAurora(); break;
        case 'cyber-noir': initCyberNoir(); break;
        case 'verdant': initVerdant(); break;
        case 'earthy': initEarthy(); break;
        case 'syntax': initSyntax(); break;
        case 'nexus': initNexus(); break;
        case 'luxury': initOpulence(); break;
        case 'sterling': initSterling(); break;
        case 'vogue': initVogue(); break;
        case 'velocity': initVelocity(); break;
        case 'comic': initComic(); break;
        case 'vitality': initVitality(); break;
        case 'ember': initEmber(); break;
        case 'minimalist': initZen(); break;
        case 'soft-pastel': initSoftPastel(); break;
        case 'summit': initSummit(); break;
        case 'valor': initValor(); break;
        case 'prism': initPrism(); break;
      }
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      switch(theme) {
        case 'default': animateAurora(); break;
        case 'cyber-noir': animateCyberNoir(); break;
        case 'verdant': animateVerdant(); break;
        case 'earthy': animateEarthy(); break;
        case 'syntax': animateSyntax(); break;
        case 'nexus': animateNexus(); break;
        case 'luxury': animateOpulence(); break;
        case 'sterling': animateSterling(); break;
        case 'vogue': animateVogue(); break;
        case 'velocity': animateVelocity(); break;
        case 'comic': animateComic(); break;
        case 'vitality': animateVitality(); break;
        case 'ember': animateEmber(); break;
        case 'minimalist': animateZen(); break;
        case 'soft-pastel': animateSoftPastel(); break;
        case 'summit': animateSummit(); break;
        case 'valor': animateValor(); break;
        case 'prism': animatePrism(); break;
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initializeEffect();
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (theme === 'sterling' && canvas) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    initializeEffect();
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, theme, mode]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: -2,
        }}
      />
      {theme === 'cyber-noir' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1,
            backgroundColor: 'hsl(var(--background))',
            opacity: 0.9,
          }}
        />
      )}
      {theme === 'soft-pastel' && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: -1,
            backgroundColor: mode === 'dark' ? '#000' : '#fff',
            opacity: 0.2,
          }}
        />
      )}
    </>
  );
}
