'use client';

import { createTheme } from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: 'Inter',
  headings: {
    fontFamily: 'Inter',
  },
  breakpoints: {
    xs: '375px',
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1536px',
  },
  colors: {
    primary: ['#000000', '', '', '', '', '', '', '', '', '', ''],
  },
});
