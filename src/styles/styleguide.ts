import styled from '@emotion/styled';
import { CardContent, createTheme, Grid } from '@mui/material';
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
    fontFamily: 'Courier New, Courier, monospace',
    fontSize: 16,
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

export const GlobalStyles = css`
  body {
    font-family: ${theme.typography.fontFamily};
    background-color: ${palette.white};
    margin: 0;
  }
`;

export const TitleWrapper = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: palette.darkWhite,
  textTransform: 'uppercase',
  fontSize: '30px',

  '@media (max-width: 768px)': {
    fontSize: '24px',
  },

  '@media (max-width: 480px)': {
    fontSize: '18px',
  },
});

export const ButtonWrapper = styled.div({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const MovieWrapper = styled.div({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '40%',
  fontSize: '30px',
});

export const AlphabetWrapper = styled(Grid)({
  width: '500px',
  flexDirection: 'row',
  borderRadius: '42px',
  padding: '25px',
  minWidth: '500px',
});

export const GameEndWrapper = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export const RankingBdWrapper = styled(CardContent)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const RankingList = styled('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
