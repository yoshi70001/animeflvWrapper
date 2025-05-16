/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          hover: '#0056b3',
          focus: '#004095'
        },
        light: {
          gray: '#f8f9fa',
          DEFAULT: '#ffffff'
        },
        medium: {
          gray: '#e0e0e0',
          DEFAULT: '#cccccc'
        },
        dark: {
          gray: '#333333',
          DEFAULT: '#212121'
        }
      },
      borderRadius: {
        card: '12px'
      },
      boxShadow: {
        card: '0 4px 6px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 12px rgba(0, 0, 0, 0.15)'
      },
      transitionProperty: {
        'transform-shadow': 'transform, box-shadow'
      }
    },
  },
  plugins: [],
};