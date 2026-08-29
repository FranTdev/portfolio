/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,html}"
  ],
  theme: {
    extend: {
      colors: {
        "on-secondary-fixed-variant": "#5516be",
        "border-glow": "rgba(16, 185, 129, 0.2)",
        "inverse-on-surface": "#283044",
        "on-secondary": "#3c0091",
        "background": "#0b1326",
        "error-container": "#93000a",
        "on-primary-container": "#00422b",
        "on-surface": "#dae2fd",
        "tertiary-fixed": "#c4e7ff",
        "secondary-fixed-dim": "#d0bcff",
        "secondary": "#d0bcff",
        "surface-card": "#1e293b",
        "on-surface-variant": "#bbcabf",
        "primary-fixed": "#6ffbbe",
        "surface-bright": "#31394d",
        "tertiary": "#7bd0ff",
        "surface-container-lowest": "#060e20",
        "secondary-fixed": "#e9ddff",
        "on-primary-fixed-variant": "#005236",
        "inverse-surface": "#dae2fd",
        "primary": "#4edea3",
        "surface-container-low": "#131b2e",
        "on-error": "#690005",
        "inverse-primary": "#006c49",
        "on-background": "#dae2fd",
        "text-muted": "#94a3b8",
        "tertiary-container": "#19aee8",
        "primary-container": "#10b981",
        "outline": "#86948a",
        "surface-main": "#0f172a",
        "on-secondary-container": "#c4abff",
        "on-tertiary-fixed-variant": "#004c69",
        "surface-variant": "#2d3449",
        "surface": "#0b1326",
        "on-error-container": "#ffdad6",
        "surface-container-highest": "#2d3449",
        "error": "#ffb4ab",
        "secondary-container": "#571bc1",
        "on-primary": "#003824",
        "surface-dim": "#0b1326",
        "surface-container": "#171f33",
        "on-tertiary-fixed": "#001e2c",
        "on-secondary-fixed": "#23005c",
        "outline-variant": "#3c4a42",
        "on-tertiary": "#00354a",
        "surface-container-high": "#222a3d",
        "surface-tint": "#4edea3",
        "on-tertiary-container": "#003e55",
        "text-primary": "#f8fafc",
        "on-primary-fixed": "#002113",
        "tertiary-fixed-dim": "#7bd0ff",
        "primary-fixed-dim": "#4edea3"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "margin-mobile": "16px",
        "margin-desktop": "64px",
        "gutter": "24px",
        "bento-gap": "16px",
        "base": "4px"
      },
      fontFamily: {
        "code-sm": ["JetBrains Mono", "monospace"],
        "headline-xl": ["Geist", "sans-serif"],
        "label-caps": ["JetBrains Mono", "monospace"],
        "body-md": ["Geist", "sans-serif"],
        "headline-lg": ["Geist", "sans-serif"],
        "headline-lg-mobile": ["Geist", "sans-serif"]
      },
      fontSize: {
        "code-sm": ["14px", { "lineHeight": "20px", "fontWeight": "500" }],
        "headline-xl": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "600" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "headline-lg": ["32px", { "lineHeight": "40px", "letterSpacing": "-0.01em", "fontWeight": "600" }],
        "headline-lg-mobile": ["24px", { "lineHeight": "32px", "fontWeight": "600" }]
      }
    }
  },
  plugins: []
};
