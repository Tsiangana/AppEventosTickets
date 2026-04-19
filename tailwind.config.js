/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Event brand
        primary: {
          DEFAULT: '#7C3AED',
          light: '#A78BFA',
          dark: '#5B21B6',
          alpha: 'rgba(124,58,237,0.12)',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          light: '#BAE6FD',
          dark: '#0369A1',
        },
        rose: '#F43F5E',
        // Light surfaces
        surface: '#FFFFFF',
        'surface-alt': '#EDE9FE',
        'bg-light': '#FAFAFF',
        'bg-dark': '#0D0B1A',
        'card-dark': '#1C1830',
        // Semantic
        'text-primary': '#1A1033',
        'text-secondary': '#64748B',
        'text-tertiary': '#94A3B8',
        'border-light': '#E2E8F0',
        'border-dark': '#2D2A4A',
      },
      borderRadius: {
        '2xl': '16px',
        '3xl': '24px',
        '4xl': '32px',
      },
      fontFamily: {
        sans: ['System', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
