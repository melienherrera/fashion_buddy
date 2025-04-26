module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'ui-sans-serif', 'system-ui'],
    },
    extend: {
      colors: {
        background: '#F7F6F3', // off-white
        surface: '#FFFFFF',
        accent: '#4B2E2B', // deep brown
        muted: '#EADBC8', // warm nude
        border: '#C8B6A6', // taupe
        primary: '#222222', // soft black
        secondary: '#C8B6A6', // taupe
        highlight: '#F8E1D9', // peach
        nude: '#EADBC8',
        brown: '#4B2E2B',
        peach: '#F8E1D9',
        taupe: '#C8B6A6',
        offwhite: '#F7F6F3',
      },
      borderRadius: {
        xl: '1.5rem',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 2px 16px 0 rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}; 