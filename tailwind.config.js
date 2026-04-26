/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        mtm: {
          primary: '#1ab1d2',
          accent: '#f18f38',
          navy: '#1c487b',
          softBlue: '#85abbd',
          cream: '#fef4e3',
          white: '#fafdfe',
        },
        severity: {
          critical: '#dc2626',
          high: '#ea580c',
          medium: '#d97706',
        },
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      boxShadow: {
        card: '0 2px 4px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
}
