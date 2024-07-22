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
        // primary: '#012651',
        // secondary: '#1e3a8a',
        // darkPrimary: '#011d3e',
        // lightBlue: '#1c4dd4',
        // textPrimary: '#ffffff',
        // textSecondary: '#FACC15',
        primary: '#ffffff',
        secondary: '#f1faff',
        tertiary: '#f1faff',
        quaternary: '#1e3a8a',
        senary: '#012651',
        textPrimary: '#555',
        textSecondary: '#007bc2',
        textTertiary: '#edf2f7',
        textFooter: '#555',
        textSP: '#ffbe0b',
        textMRP: '#ffbe0b',
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
