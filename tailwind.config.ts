import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      sm: '1024px',
      md: '1024px',
      lg: '1200px',
      xl: '1536px',
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '150ch', // add required value here
          },
        },
      },
      colors: {
        primary: '#ffffff',
        secondary: '#5541ef', //dark blue
        tertiary: '#95979e', //gray
        quaternary: '#be64c8', //purple pink
        senary: '#c8a6c9', //light pink
        lightGreen: '#4db9ab', //light green
        lightPurple: '#f1f3fb', //light purple
        lightBlue: '#473aa3', //light blue
        textPrimary: '#0e1416', //black
        textSecondary: '#999ea3', //gray
        textTertiary: '#7c73ce', //purple
        iconPrimary: '#000000',
        iconSecondary: '#60A5FA',
        textHeader: '#FACC15',
        iconTertiary: '#6366F1',
      },
    },
    fontFamily: {
      display: 'Roboto', // Adds a new `font-display` class
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
