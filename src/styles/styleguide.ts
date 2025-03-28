import { createTheme } from '@mui/material';
import { css } from '@emotion/react';

export const palette = {
  white: '#fafafa',
  darkWhite: '#F4CCE9',
  black: '#0c0c0c',
  burgundy: '#56021F',
  gray: '#1e1e1e',
  maroon: '#8D0B41',
  red: '#C40233',
  beige: '#b7ab98',
};

export const theme = createTheme({
  typography: {
    fontFamily: 'VT323',
    fontSize: 25,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const GlobalStylesApp = css`
  html {
    font-family: ${theme.typography.fontFamily};
  }
  body {
    background-color: ${palette.white};
    margin: 0;
  }
`;
