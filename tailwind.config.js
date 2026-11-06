/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Dark mode is keyed off `[data-theme="dark"]` on the html element so the
  // same attribute drives both the CSS-variable tokens (in globals.css) and
  // any optional `dark:` Tailwind variants.
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        debug: 'violet',
        // brand tokens — wired to CSS variables so they respect the active
        // theme. `bg-brgray` and `bg-brblue` keep working everywhere they
        // were already used (LetsTalk, AboutUs button hover, etc.) but now
        // automatically swap palettes when the theme changes.
        brgray: 'var(--color-btn-light-bg)',
        brblue: 'var(--color-accent)',
        // generic theme tokens for new code
        bg: 'var(--color-bg)',
        'bg-alt': 'var(--color-bg-alt)',
        fg: 'var(--color-text)',
        'fg-muted': 'var(--color-text-muted)',
        'fg-subtle': 'var(--color-text-subtle)',
        accent: 'var(--color-accent)',
        'accent-soft': 'var(--color-accent-soft)',
        'theme-border': 'var(--color-border)',
      },
    },
    fontFamily: {
      sans: ["var(--font-aeonik)", "sans-serif"],
      title: ["var(--font-title)", "Georgia", "serif"],
      serif: ["var(--font-title)", "Georgia", "serif"],
      redaction: ["var(--font-title)", "Georgia", "serif"],
      Inter: ["var(--font-aeonik)", "sans-serif"],
      Aeonik: ["var(--font-aeonik)", "sans-serif"],
      AeonikBold: ["var(--font-aeonik)", "sans-serif"],
      AeonikMedium: ["var(--font-aeonik)", "sans-serif"],
      caveat: ["var(--font-title)", "serif"],
    },
  },
  plugins: [
    require('tailwindcss-3d')
  ],
};
