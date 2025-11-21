const docEl = document.documentElement;
const bodyEl = document.body;
const themeDescriptionEl = document.getElementById("theme-description");
const tokenGridEl = document.getElementById("token-grid");

const THEME_DETAILS = {
  default: "Aurora is the balanced SaaS baseline with rounded geometry and friendly gradients.",
  minimalist: "Zen keeps things monochrome and typography-led with slim strokes and dotted dividers.",
  earthy: "Terracotta leans organic with editorial spacing, serif headings, and warm accents.",
  "cyber-noir": "Neon brings sci-fi energy, glassmorphism, and ultra-snappy motion curves.",
  luxury: "Opulence uses jewel tones, elongated spacing, and capsule buttons for premium feel.",
};

const COLOR_TOKENS = [
  "--background",
  "--foreground",
  "--primary",
  "--accent",
  "--secondary",
  "--success",
  "--warning",
  "--info",
];

const SUPPORT_TOKENS = [
  "--card-radius",
  "--button-radius",
  "--control-height",
  "--stack-gap",
  "--section-gap",
  "--motion-duration-base",
  "--motion-ease",
  "--icon-stroke",
];

function updateMode(mode) {
  docEl.dataset.mode = mode;
  docEl.style.setProperty("color-scheme", mode === "dark" ? "dark" : "light");
  syncPressedState(`[data-mode]`, `[data-mode="${mode}"]`);
  renderTokens();
}

function updateTheme(theme) {
  docEl.dataset.theme = theme;
  const message = THEME_DETAILS[theme] || "Selected theme applies live token overrides.";
  themeDescriptionEl.textContent = message;
  syncPressedState(`[data-theme-option]`, `[data-theme-option="${theme}"]`);
  renderTokens();
}

function updateDensity(density) {
  bodyEl.dataset.density = density;
  syncPressedState(`[data-density]`, `[data-density="${density}"]`);
}

function syncPressedState(selector, activeSelector) {
  document.querySelectorAll(selector).forEach((btn) => btn.setAttribute("aria-pressed", "false"));
  const active = document.querySelector(activeSelector);
  if (active) {
    active.setAttribute("aria-pressed", "true");
  }
}

function createTokenTile(name, value, type) {
  const wrapper = document.createElement("div");
  wrapper.className = "token-tile";

  const title = document.createElement("strong");
  title.textContent = name;
  wrapper.appendChild(title);

  if (type === "color") {
    const swatch = document.createElement("div");
    swatch.className = "token-swatch";
    swatch.style.background = `hsl(${value.trim()})`;
    swatch.style.borderColor = name === "--background" ? "hsl(var(--border))" : "transparent";
    wrapper.appendChild(swatch);
  }

  const pre = document.createElement("pre");
  pre.textContent = value.trim();
  wrapper.appendChild(pre);

  return wrapper;
}

function renderTokens() {
  if (!tokenGridEl) return;
  const styles = getComputedStyle(docEl);
  tokenGridEl.innerHTML = "";
  const tokens = [
    ...COLOR_TOKENS.map((token) => ({ name: token, type: "color" })),
    ...SUPPORT_TOKENS.map((token) => ({ name: token, type: "text" })),
  ];

  tokens.forEach(({ name, type }) => {
    const value = styles.getPropertyValue(name);
    if (!value) return;
    tokenGridEl.appendChild(createTokenTile(name, value, type));
  });
}

function init() {
  document.querySelectorAll("[data-mode]").forEach((button) => {
    button.addEventListener("click", () => updateMode(button.dataset.mode));
  });

  document.querySelectorAll("[data-theme-option]").forEach((button) => {
    button.addEventListener("click", () => updateTheme(button.dataset.themeOption));
  });

  document.querySelectorAll("[data-density]").forEach((button) => {
    button.addEventListener("click", () => updateDensity(button.dataset.density));
  });

  // Initialize defaults
  updateMode(docEl.dataset.mode || "light");
  updateTheme(docEl.dataset.theme || "default");
  updateDensity(bodyEl.dataset.density || "comfortable");
  renderTokens();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
