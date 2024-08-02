'use client';

import {
  Autocomplete,
  createTheme,
  NumberInput,
  PasswordInput,
  Select,
  Textarea,
  TextInput,
} from '@mantine/core';

export const theme = createTheme({
  /* Put your mantine theme override here */
  fontFamily: 'Inter',
  headings: {
    fontFamily: 'Inter',
  },
  components: {
    TextInput: TextInput.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    NumberInput: NumberInput.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    PasswordInput: PasswordInput.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    Select: Select.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    Autocomplete: Autocomplete.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    TagsInput: TextInput.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
    Textarea: Textarea.extend({
      defaultProps: {
        size: 'md',
        radius: 'md',
      },
    }),
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
