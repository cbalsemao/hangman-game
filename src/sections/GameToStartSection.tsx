import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  styled,
} from '@mui/material';
import { palette, theme } from '../styles/styleguide';
import { ButtonHM } from '../utils/components';
import { GameToStartSectionProps } from '../utils/types';

const GameTostartContainerStyle = styled(Grid)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100vw',
  height: '100vh',
  textAlign: 'center',
  backgroundImage: 'url(./background-img.jpg)',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  margin: 0,
  padding: 0,
});

const HangmanTitleStyle = styled(Typography)((props) => ({
  textAlign: 'center',
  fontFamily: 'Papyrus, fantasy',
  fontWeight: 'bold',
  fontSize: '2rem',
  color: palette.white,
  [props.theme.breakpoints.up('xs')]: {
    fontSize: '4rem',
  },
  [props.theme.breakpoints.up('sm')]: {
    fontSize: '3rem',
  },
  [props.theme.breakpoints.up('md')]: {
    fontSize: '4rem',
  },
  [props.theme.breakpoints.up('lg')]: {
    fontSize: '5rem',
  },
  [props.theme.breakpoints.up('xl')]: {
    fontSize: '6rem',
  },
}));

const TempNameStyle = styled(TextField)({
  width: '80%',
  maxWidth: '400px',
  backgroundColor: palette.white,
  borderRadius: '25px',
  padding: '10px',
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: palette.gray,
      borderRadius: '25px',
    },
    '&:hover fieldset': {
      borderColor: palette.black,
    },
    '&.Mui-focused fieldset': {
      borderColor: palette.black,
    },
  },
  '& .MuiInputLabel-root': {
    fontFamily: theme.typography.fontFamily,
    color: palette.gray,
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  '& .MuiInputBase-input': {
    fontFamily: theme.typography.fontFamily,
    fontSize: '1rem',
    color: palette.black,
    padding: '10px',
  },
});

const PrevPlayersContainerStyle = styled(Grid)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 10,
});

const PrevPlayersButtonsStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: 10,
});

const PrevPlayersTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'Papyrus, fantasy',

  color: palette.white,
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: 5,
  [theme.breakpoints.up('xs')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '3rem',
  },
}));

const PlayerNameButton = styled(Button)({
  backgroundColor: palette.black,
  color: palette.white,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  fontSize: '1rem',
  padding: '10px',
  borderRadius: '10px',
  border: `2px solid ${palette.white}`,
  transition: 'transform 0.3s ease, background-color 0.3s ease',

  '&:hover': {
    backgroundColor: palette.gray,
    transform: 'scale(1.1)',
  },
});

const GameToStartSection = ({
  playersList,
  handleSelectPlayer,
  setTemporalName,
  handleStart,
}: GameToStartSectionProps) => {
  return (
    <GameTostartContainerStyle container spacing={2}>
      <HangmanTitleStyle>Hangman</HangmanTitleStyle>

      <TempNameStyle
        id="outlined-basic"
        label="Type your name"
        onChange={(e) => setTemporalName(e.target.value)}
      />

      <PrevPlayersContainerStyle item>
        <PrevPlayersTitle>Previous Players</PrevPlayersTitle>
        <PrevPlayersButtonsStyle>
          <Grid container spacing={2} justifyContent="center">
            {playersList.map((playerName, index) => (
              <Grid item xs={6} sm={3} md={3} key={index}>
                <PlayerNameButton
                  variant="contained"
                  fullWidth
                  onClick={() => handleSelectPlayer(playerName)}
                >
                  {playerName}
                </PlayerNameButton>
              </Grid>
            ))}
          </Grid>
        </PrevPlayersButtonsStyle>
      </PrevPlayersContainerStyle>

      <ButtonHM label={'Start'} onClick={handleStart} />
    </GameTostartContainerStyle>
  );
};

export default GameToStartSection;
