'use client';

import { useEffect, useMemo, useState } from 'react';
import { Heart, Pencil, Settings, Search, Folder, FolderOpen, MailOpen } from 'lucide-react';

const MODE_OPTIONS = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
] as const;

const THEME_OPTIONS = [
  { value: 'default', label: 'Aurora', description: 'Balanced SaaS baseline with rounded geometry and friendly gradients.' },
  { value: 'minimalist', label: 'Zen', description: 'Monochrome, typography-led calm layouts with subtle contrast.' },
  { value: 'earthy', label: 'Terracotta', description: 'Organic editorial spacing, serif headings, and warm accents.' },
  { value: 'cyber-noir', label: 'Neon', description: 'Retro-tech 8-bit aesthetic with terminal greens, pixelated borders, and stepped animations.' },
  { value: 'luxury', label: 'Opulence', description: 'Jewel tones, metallic gold accents, and luxurious spacing for premium experiences.' },
  { value: 'soft-pastel', label: 'Soft Pastel', description: 'Gentle baby blues, blush pinks, and lavender with airy rounded layouts.' },
  { value: 'comic', label: 'Comic', description: 'Bold comic book energy with thick borders, vibrant colors, and dynamic bounce.' },
  { value: 'summit', label: 'Summit', description: 'Technical outdoor gear aesthetic inspired by North Face and Patagonia.' },
  { value: 'velocity', label: 'Velocity', description: 'Sharp angles and high energy for extreme sports content.' },
  { value: 'valor', label: 'Valor', description: 'Bold championship styling with heavy borders for fighting sports.' },
  { value: 'vogue', label: 'Vogue', description: 'Minimalist editorial with dramatic serif typography.' },
  { value: 'vitality', label: 'Vitality', description: 'Clean healthcare design with trust-building blues and accessible contrast.' },
  { value: 'sterling', label: 'Sterling', description: 'Professional finance theme with navy, gold accents, and conservative styling.' },
  { value: 'syntax', label: 'Syntax', description: 'Developer-focused theme with code editor aesthetics and syntax-inspired colors.' },
  { value: 'nexus', label: 'Nexus', description: 'Modern gaming and esports theme with vibrant purples and dynamic energy.' },
  { value: 'ember', label: 'Ember', description: 'Warm culinary design with appetizing reds and golden accents.' },
  { value: 'prism', label: 'Prism', description: 'Bold creative agency theme with gradient effects and experimental typography.' },
  { value: 'verdant', label: 'Verdant', description: 'Pacific Northwest forest green with natural, wilderness-inspired design.' },
] as const;

const DENSITY_OPTIONS = [
  { value: 'comfortable', label: 'Comfortable' },
  { value: 'compact', label: 'Compact' },
] as const;

const COLOR_TOKENS = ['--background', '--foreground', '--primary', '--accent', '--secondary', '--success', '--warning', '--info'] as const;
const SUPPORT_TOKENS = ['--card-radius', '--button-radius', '--control-height', '--stack-gap', '--section-gap', '--motion-duration-base', '--motion-ease', '--icon-stroke'] as const;

const TOKEN_LIST = [...COLOR_TOKENS, ...SUPPORT_TOKENS] as const;

type ThemeValue = (typeof THEME_OPTIONS)[number]['value'];
type ModeValue = (typeof MODE_OPTIONS)[number]['value'];
type DensityValue = (typeof DENSITY_OPTIONS)[number]['value'];

type TokenMap = Partial<Record<(typeof TOKEN_LIST)[number], string>>;

export default function Page() {
  const [mode, setMode] = useState<ModeValue>('light');
  const [theme, setTheme] = useState<ThemeValue>('default');
  const [density, setDensity] = useState<DensityValue>('comfortable');
  const [tokens, setTokens] = useState<TokenMap>({});

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.mode = mode;
    root.style.setProperty('color-scheme', mode === 'dark' ? 'dark' : 'light');
  }, [mode]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    document.body.dataset.density = density;
  }, [density]);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const snapshot: TokenMap = {};
    TOKEN_LIST.forEach((tokenName) => {
      snapshot[tokenName] = styles.getPropertyValue(tokenName).trim();
    });
    setTokens(snapshot);
  }, [mode, theme]);

  const themeDescription = useMemo(() => {
    return THEME_OPTIONS.find((option) => option.value === theme)?.description ?? 'Selected theme applies live token overrides.';
  }, [theme]);

  return (
    <main>
      <section>
        <header>
          <h1>Developer Standards Showcase</h1>
          <p>
            Explore the canonical theme tokens from <code>design/ui-standards.md</code> and preview how buttons, cards, forms, tables, and alerts respond to
            light/dark mode, 18 comprehensive themes, and comfort vs. compact density.
          </p>
          <details style={{ marginTop: '1rem', padding: '1rem', background: 'hsl(var(--muted))', borderRadius: 'var(--card-radius)' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 600, marginBottom: '0.5rem' }}>Implementation Guide</summary>
            <div style={{ paddingLeft: '1rem' }}>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>For Admins: Quick Theme Switching</h4>
              <p style={{ marginBottom: '0.75rem' }}>To implement user-configurable themes in your application:</p>
              <ol style={{ marginLeft: '1.25rem', marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>Copy the CSS:</strong> Import <code>globals.css</code> from this demo into your project</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Add Theme Switcher:</strong> Use <code>document.documentElement.dataset.theme = 'theme-name'</code> to switch themes</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Store Preferences:</strong> Save user theme selection to localStorage or database</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>Available Themes:</strong> Aurora, Zen, Terracotta, Neon, Opulence, Soft Pastel, Comic, Summit, Velocity, Valor, Vogue, Vitality, Sterling, Syntax, Nexus, Ember, Prism, Verdant</li>
              </ol>
              <h4 style={{ marginTop: '1rem', marginBottom: '0.5rem' }}>Code Example:</h4>
              <pre style={{ background: 'hsl(var(--background))', padding: '1rem', borderRadius: '0.25rem', overflow: 'auto', fontSize: '0.875rem' }}>
{`// Set theme programmatically
const setTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
};

// Load saved theme on app start
const savedTheme = localStorage.getItem('theme') || 'default';
setTheme(savedTheme);`}
              </pre>
              <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'hsl(var(--muted-foreground))' }}>All components automatically adapt to theme changes via CSS custom properties. No component updates required.</p>
            </div>
          </details>
        </header>
        <div className="controls">
          <div className="control-group">
            <strong>Color Mode</strong>
            <div className="button-row">
              {MODE_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className="ghost"
                  aria-pressed={mode === value}
                  onClick={() => setMode(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <strong>Style Theme</strong>
            <div className="button-row">
              {THEME_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className="secondary"
                  aria-pressed={theme === value}
                  onClick={() => setTheme(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div className="control-group">
            <strong>Density</strong>
            <div className="button-row">
              {DENSITY_OPTIONS.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  className="ghost"
                  aria-pressed={density === value}
                  onClick={() => setDensity(value)}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p id="theme-description">{themeDescription}</p>
            <small>Tokens below and every component on this page respond live to your selections.</small>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Buttons & CTAs</h2>
          <p>Buttons inherit tokenized radius, font weight, focus treatments, and motion curves so style changes propagate automatically.</p>
        </header>
        <div className="button-row">
          <button type="button">Primary action</button>
          <button type="button" className="secondary">
            Secondary
          </button>
          <button type="button" className="accent">
            Accent
          </button>
          <button type="button" className="ghost">
            Ghost
          </button>
          <button type="button" disabled>
            Disabled
          </button>
        </div>
        <hr />
        <div className="badge-row">
          <div className="badge success">Success badge</div>
          <div className="badge warning">Warning badge</div>
          <div className="badge info">Info badge</div>
        </div>
      </section>

      <section>
        <header>
          <h2>Cards, Content & Navigation</h2>
          <p>Card curvature, elevation, and spacing values pipe straight from `--card-radius`, `--card-shadow`, and `--stack-gap`.</p>
        </header>
        <div className="card-grid">
          <article className="card">
            <h4>Guidance</h4>
            <p>Keep primitives token-driven. Update theme CSS instead of hardcoding values in components.</p>
            <button type="button" className="ghost">
              View tokens
            </button>
          </article>
          <article className="card">
            <h4>Motion</h4>
            <p>Animate within the timing curve for the active theme and honor <code>prefers-reduced-motion</code>.</p>
            <button type="button" className="accent">
              Play animation
            </button>
          </article>
          <article className="card">
            <h4>Spacing</h4>
            <p>Use <code>--stack-gap</code> for vertical rhythm and <code>--section-gap</code> between major regions.</p>
            <button type="button">Inspect spacing</button>
          </article>
        </div>
      </section>

      <section>
        <header>
          <h2>Forms & Inputs</h2>
          <p>Inputs share control height, radius, and focus treatments so density toggles never break layout consistency.</p>
        </header>
        <div className="form-grid">
          <label>
            Name
            <input type="text" placeholder="Jane Doe" />
          </label>
          <label>
            Theme preference
            <select>
              {THEME_OPTIONS.map(({ value, label }) => (
                <option key={value}>{label}</option>
              ))}
            </select>
          </label>
          <label>
            Notes
            <textarea placeholder="What should we refine next?"></textarea>
          </label>
        </div>
      </section>

      <section>
        <header>
          <h2>Table, Alerts & Tokens</h2>
          <p>Tables, alerts, and live token swatches all bind to the same CSS variables defined in the standards.</p>
        </header>
        <div className="card-grid">
          <div className="card">
            <h4>Sample table</h4>
            <table className="table-demo">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Purpose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>--control-height</td>
                  <td>Buttons & inputs share this value for density consistency.</td>
                </tr>
                <tr>
                  <td>--motion-duration-base</td>
                  <td>Primary transition timing for hover and focus states.</td>
                </tr>
                <tr>
                  <td>--icon-stroke</td>
                  <td>Standard stroke width for glyphs and iconography.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="card">
            <h4>Alerts</h4>
            <div className="alerts">
              <div className="alert success">Success — Token changes saved.</div>
              <div className="alert warning">Warning — Contrast is borderline.</div>
              <div className="alert destructive">Destructive — Token missing.</div>
              <div className="alert info">Info — Hover states ease per theme.</div>
            </div>
          </div>
          <div className="card">
            <h4>Live token swatches</h4>
            <div className="token-grid">
              {TOKEN_LIST.map((tokenName) => {
                const value = tokens[tokenName] ?? '';
                const isColor = COLOR_TOKENS.includes(tokenName as (typeof COLOR_TOKENS)[number]);
                return (
                  <div key={tokenName} className="token-tile">
                    <strong>{tokenName}</strong>
                    {isColor && <div className="token-swatch" style={{ background: `hsl(${value})` }} />}
                    <pre>{value || '—'}</pre>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Navigation Components</h2>
          <p>Navigation bars, breadcrumbs, and tabs provide consistent wayfinding across themes.</p>
        </header>
        <div className="card-stack">
          <div className="card">
            <h4>Navigation Bar</h4>
            <nav className="navbar">
              <a href="#" className="navbar-brand">Brand</a>
              <ul className="navbar-links">
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">Products</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </nav>
          </div>
          <div className="card">
            <h4>Breadcrumbs</h4>
            <nav className="breadcrumbs">
              <a href="#">Home</a>
              <span className="breadcrumbs-separator">/</span>
              <a href="#">Products</a>
              <span className="breadcrumbs-separator">/</span>
              <span>Current Page</span>
            </nav>
          </div>
          <div className="card">
            <h4>Tabs</h4>
            <div className="tabs">
              <button className="tab active">Overview</button>
              <button className="tab">Details</button>
              <button className="tab">Settings</button>
            </div>
            <p>Tab content goes here.</p>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Interactive Feedback</h2>
          <p>Loading states, progress indicators, and notifications provide user feedback.</p>
        </header>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          <div className="card">
            <h4>Loading States</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Spinner</strong>
              <div className="spinner"></div>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Skeleton</strong>
              <div className="skeleton" style={{ height: '1.5rem', marginBottom: '0.5rem' }}></div>
              <div className="skeleton" style={{ height: '1rem', width: '80%' }}></div>
            </div>
          </div>
          <div className="card">
            <h4>Progress & Tooltip</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Progress Bar</strong>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: '65%' }}></div>
              </div>
              <small>65% complete</small>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Tooltip</strong>
              <div className="tooltip">
                <button type="button" className="secondary">Hover me</button>
                <span className="tooltip-text">This is a tooltip!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>List Components</h2>
          <p>Styled lists, definitions, and chips for organizing content.</p>
        </header>
        <div className="card-grid">
          <div className="card">
            <h4>Unordered List</h4>
            <ul className="styled-list">
              <li>First item with marker</li>
              <li>Second item</li>
              <li>Third item</li>
            </ul>
          </div>
          <div className="card">
            <h4>Ordered List</h4>
            <ol className="styled-list">
              <li>Step one</li>
              <li>Step two</li>
              <li>Step three</li>
            </ol>
          </div>
          <div className="card">
            <h4>Definition List</h4>
            <dl className="definition-list">
              <dt>Term</dt>
              <dd>Definition goes here</dd>
              <dt>Another</dt>
              <dd>More details</dd>
            </dl>
          </div>
          <div className="card">
            <h4>Chip List</h4>
            <div className="chip-list">
              <span className="chip">React <button className="chip-remove">×</button></span>
              <span className="chip">TypeScript <button className="chip-remove">×</button></span>
              <span className="chip">Tailwind <button className="chip-remove">×</button></span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Data Display</h2>
          <p>Statistics cards and empty states for data visualization.</p>
        </header>
        <div className="card-stack">
          <div className="stats-grid">
            <div className="stat-card">
              <h3 className="stat-value">12,458</h3>
              <p className="stat-label">Total Users</p>
              <p className="stat-change positive">↑ 12% from last month</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">$45,231</h3>
              <p className="stat-label">Revenue</p>
              <p className="stat-change positive">↑ 8% from last month</p>
            </div>
            <div className="stat-card">
              <h3 className="stat-value">98.5%</h3>
              <p className="stat-label">Uptime</p>
              <p className="stat-change negative">↓ 0.5% from last month</p>
            </div>
          </div>
          <div className="card">
            <div className="empty-state">
              <div className="empty-state-icon"><MailOpen size={48} /></div>
              <h4>No items found</h4>
              <p>Get started by creating your first item.</p>
              <button type="button">Create Item</button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Extended Form Elements</h2>
          <p>Checkboxes, radios, toggles, sliders, and more.</p>
        </header>
        <div className="card-grid">
          <div className="card">
            <h4>Selection Controls</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Checkboxes</strong>
              <div className="checkbox-group">
                <label className="checkbox">
                  <input type="checkbox" defaultChecked />
                  <span>Option one</span>
                </label>
                <label className="checkbox">
                  <input type="checkbox" />
                  <span>Option two</span>
                </label>
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Radio Buttons</strong>
              <div className="radio-group">
                <label className="radio">
                  <input type="radio" name="choice" defaultChecked />
                  <span>Choice A</span>
                </label>
                <label className="radio">
                  <input type="radio" name="choice" />
                  <span>Choice B</span>
                </label>
              </div>
            </div>
          </div>
          <div className="card">
            <h4>Inputs & Controls</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Toggle Switch</strong>
              <label className="toggle">
                <input type="checkbox" />
                <span className="toggle-slider"></span>
              </label>
              <p style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>Enable notifications</p>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Range Slider</strong>
              <input type="range" className="range-slider" min="0" max="100" defaultValue="50" />
            </div>
          </div>
          <div className="card">
            <h4>Search Input</h4>
            <div className="search-input">
              <span className="search-icon"><Search size={18} /></span>
              <input type="search" placeholder="Search..." />
            </div>
          </div>
          <div className="card">
            <h4>File Upload</h4>
            <div className="file-upload">
              <Folder size={48} style={{ marginBottom: '0.5rem' }} />
              <p>Drop files here or click to browse</p>
              <small>Supports: PDF, PNG, JPG (max 10MB)</small>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Rich Components</h2>
          <p>Accordions, avatars, steppers, and timelines.</p>
        </header>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          <div className="card">
            <h4>Accordion</h4>
            <div className="accordion-item">
              <button className="accordion-header">
                <span>Section 1</span>
                <span>▼</span>
              </button>
              <div className="accordion-content open">
                <p>Content for section 1 goes here.</p>
              </div>
            </div>
            <div className="accordion-item">
              <button className="accordion-header">
                <span>Section 2</span>
                <span>▼</span>
              </button>
              <div className="accordion-content open">
                <p>Content for section 2 goes here.</p>
              </div>
            </div>
          </div>
          <div className="card">
            <h4>Avatars & Icons</h4>
            <div style={{ marginBottom: '1.5rem' }}>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Avatars</strong>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div className="avatar sm">JS</div>
                <div className="avatar">MJ</div>
                <div className="avatar lg">AB</div>
              </div>
            </div>
            <div>
              <strong style={{ display: 'block', marginBottom: '0.5rem' }}>Icon Buttons</strong>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button type="button" className="icon-button"><Heart size={20} /></button>
                <button type="button" className="icon-button secondary"><Pencil size={20} /></button>
                <button type="button" className="icon-button ghost"><Settings size={20} /></button>
              </div>
            </div>
          </div>
          <div className="card">
            <h4>Stepper</h4>
            <div className="stepper">
              <div className="step completed">
                <div className="step-number">✓</div>
                <span>Complete</span>
              </div>
              <div className="step active">
                <div className="step-number">2</div>
                <span>In Progress</span>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <span>Pending</span>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <span>Review</span>
              </div>
            </div>
          </div>
          <div className="card">
            <h4>Timeline</h4>
            <div className="timeline">
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <strong>Project Started</strong>
                  <p>Initial planning phase completed</p>
                  <small>2 days ago</small>
                </div>
              </div>
              <div className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-content">
                  <strong>Milestone Reached</strong>
                  <p>First major feature delivered</p>
                  <small>1 day ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Form Validation</h2>
          <p>Visual feedback for form validation states.</p>
        </header>
        <div className="card">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            <div className="input-wrapper">
              <label>Valid Input</label>
              <input type="text" className="input-success" defaultValue="john@example.com" />
              <span className="success-message">✓ Email is valid</span>
            </div>
            <div className="input-wrapper">
              <label>Invalid Input</label>
              <input type="text" className="input-error" defaultValue="invalid-email" />
              <span className="error-message">⚠ Please enter a valid email</span>
            </div>
          </div>
        </div>
      </section>

      <section>
        <header>
          <h2>Extended Typography</h2>
          <p>Blockquotes and link variants for richer text content.</p>
        </header>
        <div className="card">
          <blockquote>
            "Design is not just what it looks like and feels like. Design is how it works."
            <cite>— Steve Jobs</cite>
          </blockquote>
          <hr style={{ margin: '1.5rem 0' }} />
          <h4>Link Styles</h4>
          <p>
            This is a <a href="#" className="link-primary">primary link</a> and here's an{' '}
            <a href="#" className="link-underline">underlined link</a> for reference.
          </p>
        </div>
      </section>
    </main>
  );
}
