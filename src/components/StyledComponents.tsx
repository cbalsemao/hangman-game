import {
  Button,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from '@mui/material';
import { palette, theme } from '../styles/styleguide';

export const TitleWrapper = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: theme.typography.fontFamily,
  color: palette.black,
  textTransform: 'uppercase',
  fontSize: '30px',

  '@media (max-width: 768px)': {
    fontSize: '24px',
  },

  '@media (max-width: 480px)': {
    fontSize: '18px',
  },
});

export const ButtonWrapper = styled('div')({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
});

export const MovieWrapper = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',

  fontSize: '30px',
  flexDirection: 'column',

  '@media (max-width: 1000px)': {
    flexDirection: 'column',
  },
});

export const AlphabetWrapper = styled(Grid)({
  flexDirection: 'row',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '70%',
  margin: '0 auto',
});

export const GameEndWrapper = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '16px',
  height: '100vh',
  width: '100vw',
});

export const RankingBdWrapper = styled(CardContent)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 1.5rem;
`;

export const RankingList = styled('ul')`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

export const ButtonHM = styled(Button)({
  color: palette.black,
  backgroundColor: palette.white,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  fontSize: '18px',
  padding: '10px 20px',
  borderRadius: '25px',
  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
  transition:
    'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',
  width: 'fit-content',

  '&:hover': {
    backgroundColor: palette.black,
    transform: 'scale(1.1)',
    color: palette.white,
    boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
  },
});

export const AppWrapper = styled(Grid)({
  top: 0,
  left: 0,
  height: '100%',
  width: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  flexDirection: 'column',
  backgroundImage: 'url(./background-img.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  margin: 0,
  padding: 0,
});
export const LeaderBoardTitle = styled(Typography)({
  paddingBottom: 10,
  textAlign: 'center',
  fontWeight: 'bold',
  color: palette.black,
  marginBottom: 3,
  letterSpacing: '1px',
  fontFamily: theme.typography.fontFamily,
  fontSize: '2rem',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
  textTransform: 'uppercase',
});

export const RankBoardContainerStyled = styled(Card)({
  width: '65%',
  padding: 3,
  backgroundColor: palette.white,
  boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
  borderRadius: '15px',
  margin: '0 auto',
});
