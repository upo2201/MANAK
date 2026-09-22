/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        foreground: '#0B1324',
        card: '#FFFFFF',
        'card-hover': '#F1F5F9',
        border: '#E2E8F0',
        accent: {
          DEFAULT: '#059669', // Emerald BIS authority green
          hover: '#047857',
          gold: '#D97706',   // Indian BIS gold / hallmarking accent
          blue: '#2563EB',
          teal: '#0F766E',
        },
        muted: {
          DEFAULT: '#64748B',
          foreground: '#94A3B8',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
};
