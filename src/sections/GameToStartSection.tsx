import {
  Grid,
  TextField,
  Typography,
  Button,
  styled,
  Snackbar,
  SnackbarCloseReason,
  IconButton,
} from '@mui/material';
import { palette, theme } from '../styles/styleguide';
import { ButtonHM } from '../components/StyledComponents';
import { GameToStartSectionProps } from '../utils/types';
import { useState } from 'react';

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
  fontFamily: 'VT323',
  fontSize: '2rem',
  color: palette.white,
  [props.theme.breakpoints.up('xs')]: {
    fontSize: '6rem',
  },
  [props.theme.breakpoints.up('sm')]: {
    fontSize: '8rem',
  },
  [props.theme.breakpoints.up('md')]: {
    fontSize: '8rem',
  },
  [props.theme.breakpoints.up('lg')]: {
    fontSize: '10rem',
  },
  [props.theme.breakpoints.up('xl')]: {
    fontSize: '10rem',
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

const PrevPlayersTitle = styled(Typography)(({ theme }) => ({
  fontFamily: 'VT323',

  color: palette.white,
  fontSize: '2rem',
  padding: 5,
  [theme.breakpoints.up('xs')]: {
    fontSize: '2rem',
  },
  [theme.breakpoints.up('sm')]: {
    fontSize: '2.0rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.5rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '3.5rem',
  },
  [theme.breakpoints.up('xl')]: {
    fontSize: '5rem',
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
  width: 'fit-content',
  '&:hover': {
    backgroundColor: palette.gray,
    transform: 'scale(1.1)',
  },
});

const GameToStartSection = ({
  playersList,
  handleSelectPlayer,
  temporalName,
  setTemporalName,
  handleStart,
}: GameToStartSectionProps) => {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        x
      </IconButton>
    </>
  );

  return (
    <GameTostartContainerStyle container spacing={2}>
      <HangmanTitleStyle>Hangman</HangmanTitleStyle>

      <TempNameStyle
        id="outlined-basic"
        label="Type your name"
        onChange={(e) => setTemporalName(e.target.value)}
        inputProps={{ maxLength: 8 }}
      />

      <PrevPlayersContainerStyle item>
        <PrevPlayersTitle>Previous Players</PrevPlayersTitle>

        <Grid container spacing={2} justifyContent="center" padding={2}>
          {playersList.map((playerName, index) => (
            <Grid item key={index}>
              <PlayerNameButton
                variant="contained"
                onClick={() => handleSelectPlayer(playerName)}
              >
                {playerName.substring(0, 10)}
              </PlayerNameButton>
            </Grid>
          ))}
        </Grid>
      </PrevPlayersContainerStyle>

      <ButtonHM
        variant="contained"
        onClick={() => {
          if (temporalName) {
            handleStart();
          } else {
            setSnackbarMessage('Please enter your name before starting!');
            setOpen(true);
          }
        }}
      >
        Start
      </ButtonHM>

      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
      />
    </GameTostartContainerStyle>
  );
};

export default GameToStartSection;
