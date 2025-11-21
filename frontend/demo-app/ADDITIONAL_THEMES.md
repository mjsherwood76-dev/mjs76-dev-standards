# Additional Theme Suggestions

Based on your request for Outdoor, Action Sports, and Fighting themes, here are comprehensive design specifications for three new themes:

---

## 🏔️ OUTDOOR / NATURE EXPLORER Theme

**Target Audience:** Hiking apps, camping sites, outdoor gear, nature photography, adventure travel

### Color Palette
**Light Mode:**
- Background: `145 25% 96%` (Misty morning)
- Foreground: `160 45% 15%` (Deep forest)
- Primary: `145 55% 35%` (Forest green)
- Primary Foreground: `0 0% 100%`
- Secondary: `35 45% 70%` (Sandy trail)
- Accent: `160 70% 42%` (Pine green)
- Accent Foreground: `0 0% 100%`
- Muted: `145 20% 88%` (Foggy morning)
- Success: `120 50% 38%` (Moss green)
- Warning: `35 75% 50%` (Campfire orange)
- Destructive: `10 65% 48%` (Warning red)
- Info: `200 70% 42%` (Lake blue)

**Dark Mode:**
- Background: `160 30% 12%` (Night forest)
- Foreground: `145 35% 90%` (Moonlight)
- Primary: `145 60% 48%` (Bright evergreen)
- Accent: `35 85% 55%` (Campfire glow)
- Muted: `160 20% 20%` (Twilight)

### Typography
- **Font Sans:** "Overpass", "Nunito", system-ui
- **Font Heading:** "Outfit", "Overpass", sans-serif
- **Font Mono:** "JetBrains Mono", monospace

### Spacing & Radius
- **Radius LG:** `1rem` (Smooth stone)
- **Radius MD:** `0.625rem`
- **Radius SM:** `0.375rem`
- **Button Radius:** `0.625rem`
- **Control Height:** `2.875rem`
- **Section Gap:** `3.5rem`

### Motion
- **Duration Fast:** `140ms`
- **Duration Base:** `220ms`
- **Duration Slow:** `350ms`
- **Ease:** `cubic-bezier(0.33, 1, 0.68, 1)` (Organic movement)

### Icons
- **Library:** Tabler Icons or Iconoir
- **Stroke:** `2px` (sturdy, reliable)
- **Corner:** `5px` (natural curves)
- **Style:** Outlined with organic curves

### Special Effects
```css
--shadow-ambient: 0 2px 8px rgba(0, 50, 20, 0.15);
--shadow-elevation: 0 8px 24px rgba(0, 50, 20, 0.2);
--texture-overlay: url('data:image/svg+xml,...'); /* Wood grain or topographic */
```

### Component Styling
- Add subtle texture overlays (wood grain, topographic lines)
- Use organic, asymmetric shapes where appropriate
- Buttons feel sturdy and tactile
- Cards have subtle depth like layers of a map

---

## 🏂 ACTION SPORTS / EXTREME Theme

**Target Audience:** Skateboarding, snowboarding, BMX, surfing, parkour, extreme sports content

### Color Palette
**Light Mode:**
- Background: `0 0% 98%` (Concrete)
- Foreground: `0 0% 8%` (Asphalt black)
- Primary: `340 85% 52%` (Energy red)
- Primary Foreground: `0 0% 100%`
- Secondary: `0 0% 20%` (Skate black)
- Accent: `180 95% 45%` (Electric cyan)
- Accent Foreground: `0 0% 0%`
- Muted: `0 0% 88%` (Worn concrete)
- Success: `145 75% 42%` (Go green)
- Warning: `35 100% 52%` (Caution orange)
- Destructive: `0 85% 55%` (Danger red)
- Info: `220 90% 52%` (Speed blue)

**Dark Mode:**
- Background: `0 0% 8%` (Night street)
- Foreground: `0 0% 95%` (Street light)
- Primary: `340 100% 60%` (Hot red)
- Accent: `180 100% 55%` (Neon cyan)
- Muted: `0 0% 18%` (Shadow)

### Typography
- **Font Sans:** "Barlow", "Rajdhani", "Bebas Neue", sans-serif
- **Font Heading:** "Bebas Neue", "Oswald", sans-serif (all caps)
- **Font Mono:** "Share Tech Mono", monospace
- **Letter Spacing:** `0.05em` (expanded for impact)

### Spacing & Radius
- **Radius LG:** `0.25rem` (Sharp edges)
- **Radius MD:** `0.125rem` (Minimal)
- **Radius SM:** `0px` (Cut sharp)
- **Button Radius:** `0.125rem`
- **Control Height:** `3rem` (Bold)
- **Section Gap:** `4rem`

### Motion
- **Duration Fast:** `80ms` (Snappy)
- **Duration Base:** `150ms` (Quick)
- **Duration Slow:** `250ms`
- **Ease:** `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (Overshoot/bounce)
- **Ease Emphasis:** `cubic-bezier(0.87, 0, 0.13, 1)` (Sharp acceleration)

### Icons
- **Library:** Bootstrap Icons or Font Awesome (Solid)
- **Stroke:** `2.5px` (Bold, aggressive)
- **Corner:** `2px` (Sharp)
- **Style:** Solid fills, angular

### Special Effects
```css
--shadow-aggressive: 4px 4px 0 rgba(0, 0, 0, 0.8);
--border-skate: 2px solid currentColor;
--transform-tilt: rotate(-2deg);
--filter-intensity: brightness(1.1) contrast(1.15);
```

### Component Styling
- Diagonal cuts and angles (transform: skew(-2deg))
- Bold, thick borders (2-3px)
- Offset shadows for depth
- High contrast
- Motion feels snappy and aggressive
- Buttons "pop" with transforms
- Use uppercase text liberally

---

## 🥊 FIGHTING / COMBAT / MMA Theme

**Target Audience:** MMA gyms, boxing clubs, martial arts schools, combat sports streaming, fitness apps

### Color Palette
**Light Mode:**
- Background: `0 0% 96%` (Canvas mat)
- Foreground: `0 0% 10%` (Black belt)
- Primary: `0 75% 45%` (Blood red)
- Primary Foreground: `0 0% 100%`
- Secondary: `0 0% 25%` (Iron gray)
- Accent: `45 100% 50%` (Championship gold)
- Accent Foreground: `0 0% 0%`
- Muted: `0 0% 85%` (Gym floor)
- Success: `120 40% 35%` (Victory green)
- Warning: `35 95% 52%` (Corner orange)
- Destructive: `0 85% 48%` (Knockout red)
- Info: `210 75% 45%` (Focus blue)

**Dark Mode:**
- Background: `0 0% 8%` (Ring darkness)
- Foreground: `0 0% 92%` (Spotlight)
- Primary: `0 90% 55%` (Fighting red)
- Accent: `45 100% 60%` (Gold shine)
- Muted: `0 0% 18%` (Mat shadow)

### Typography
- **Font Sans:** "Rajdhani", "Oswald", "Bebas Neue", sans-serif
- **Font Heading:** "Bebas Neue", "Impact", sans-serif (UPPERCASE)
- **Font Mono:** "Share Tech Mono", "Roboto Mono", monospace
- **Font Weight:** `700-900` (Bold to Black)
- **Letter Spacing:** `0.03em`

### Spacing & Radius
- **Radius LG:** `0.25rem` (Tactical angles)
- **Radius MD:** `0.125rem`
- **Radius SM:** `0px` (Sharp)
- **Button Radius:** `0.125rem`
- **Control Height:** `3.25rem` (Solid presence)
- **Section Gap:** `4rem`

### Motion
- **Duration Fast:** `100ms` (Strike speed)
- **Duration Base:** `180ms` (Punch timing)
- **Duration Slow:** `300ms` (Heavy impact)
- **Ease:** `cubic-bezier(0.87, 0, 0.13, 1)` (Explosive power)
- **Ease Emphasis:** `cubic-bezier(0.68, -0.55, 0.265, 1.55)` (Impact bounce)

### Icons
- **Library:** Font Awesome (Solid) or Material Icons (Filled)
- **Stroke:** `3px` (Heavy weight)
- **Corner:** `1px` (Tactical)
- **Style:** Bold, solid fills

### Special Effects
```css
--shadow-impact: 6px 6px 0 rgba(0, 0, 0, 0.4), 
                 inset -2px -2px 0 rgba(0, 0, 0, 0.2);
--border-fight: 3px solid currentColor;
--transform-impact: scale(0.98);
--filter-grit: contrast(1.15) brightness(0.95);
--texture-canvas: /* Canvas texture overlay */;
```

### Component Styling
- Heavy borders (3px+)
- Deep offset shadows (6px 6px)
- Uppercase text for headings
- Solid, weighty buttons
- Stats displayed like fight cards
- Use stacked/layered shadows for depth
- Aggressive hover states (scale, shadow increase)
- Red/gold accent for CTAs
- Texture overlays (canvas, grit)

### Special Components

**Fight Card:**
```tsx
<div className="fight-card">
  <div className="fighter">Name 1</div>
  <div className="vs">VS</div>
  <div className="fighter">Name 2</div>
  <div className="stats">Record • Weight • Rank</div>
</div>
```

**Stat Display:**
```css
.combat-stat {
  font-size: 3rem;
  font-weight: 900;
  line-height: 1;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: hsl(var(--accent));
  text-shadow: 3px 3px 0 rgba(0, 0, 0, 0.3);
}
```

---

## Implementation Priority

Based on popular use cases, I'd recommend implementing in this order:

1. **Outdoor/Nature** - Broad appeal, growing market
2. **Action Sports** - Niche but passionate audience
3. **Fighting/Combat** - Specific but high engagement

---

## Theme Comparison Table

| Aspect | Outdoor | Action Sports | Fighting |
|--------|---------|---------------|----------|
| **Feel** | Organic, calm | Energetic, edgy | Powerful, intense |
| **Radius** | Medium (1rem) | Sharp (0.25rem) | Tactical (0.25rem) |
| **Motion** | Organic ease | Bouncy overshoot | Explosive power |
| **Typography** | Friendly sans | Condensed, caps | Bold, heavy |
| **Icons** | Organic curves | Angular, bold | Solid, heavy |
| **Shadow** | Soft ambient | Offset blocks | Deep impact |
| **Best For** | Hiking, camping | Skating, surfing | MMA, boxing |

---

## Quick Start Commands

To add any of these themes to the demo app:

1. Add theme definitions to `globals.css`
2. Add theme option to `THEME_OPTIONS` array in `page.tsx`
3. Define all CSS custom properties (see specifications above)
4. Test in both light and dark modes
5. Verify WCAG contrast ratios

Would you like me to implement any of these themes in the demo app?
