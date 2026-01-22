/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'funnel': ['Funnel Display', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        accent: '#0960ae',
        primary: '#0052FF',
      },
      accentColor: {
        DEFAULT: '#2563eb',
      },
    },
  },
  plugins: [],
};
