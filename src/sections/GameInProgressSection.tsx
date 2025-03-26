import { Box, Button, Grid, Paper, styled, Typography } from '@mui/material';
import { AlphabetWrapper, palette, theme } from '../styles/styleguide';
import { alphabet, getHiddenWord, HANGMAN_IMAGE } from '../utils/utility';
import { Timer } from '../App';
import { GameInProgressSectionProps } from '../utils/types';
import { ReturnMenuButton } from '../utils/components';

const GameInProgContainerStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  height: '100vh',
  overflow: 'auto',
  [theme.breakpoints.down('sm')]: {
    height: '100%',
  },
  gap: '16px',
}));

const BoxContainerGame = styled(Box)(({ theme }) => ({
  maxWidth: '1000px',
  padding: theme.spacing(5, 0),
  borderRadius: '16px',
  backgroundColor: palette.white,
  textAlign: 'center',
  color: palette.black,
}));

const TimerContainerStyled = styled(Paper)({
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  backgroundColor: palette.white,
  color: palette.black,
  boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  fontSize: '1.2rem',
  border: `1px solid ${palette.black}`,
  padding: '8px',
});

const GameInProgressSection = ({
  secretWord,
  guessedLetters,
  wrongLetters,
  handleWordToGuess,
  handleRestart,
  countdown,
}: GameInProgressSectionProps) => {
  return (
    <GameInProgContainerStyle>
      <BoxContainerGame>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={5}>
            <Box display="flex" flexDirection="column" alignItems="center">
              <Typography
                variant="h5"
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 'bold',
                }}
              >
                HANGMAN GAME
              </Typography>
              {HANGMAN_IMAGE[countdown as keyof typeof HANGMAN_IMAGE]}
              <TimerContainerStyled>
                <Timer />
              </TimerContainerStyled>
            </Box>
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography variant="h4" gutterBottom>
              {getHiddenWord(secretWord, guessedLetters).toUpperCase()}
            </Typography>

            <Typography variant="body1" sx={{ marginBottom: 2 }}>
              Incorrect guesses: {wrongLetters.length} / 6
            </Typography>

            <AlphabetWrapper container spacing={1} justifyContent="center">
              {alphabet.map((letter, index) => (
                <Button
                  key={letter + index}
                  onClick={() => handleWordToGuess(letter)}
                  variant="contained"
                  sx={{
                    minWidth: '40px',
                    minHeight: '40px',
                    borderRadius: '50%',
                    backgroundColor: guessedLetters.includes(letter)
                      ? 'green'
                      : wrongLetters.includes(letter)
                      ? 'red'
                      : palette.black,
                    fontWeight: 'bold',
                  }}
                >
                  {letter.toUpperCase()}
                </Button>
              ))}
            </AlphabetWrapper>
          </Grid>
        </Grid>
      </BoxContainerGame>
      <ReturnMenuButton handleStart={handleRestart} />
    </GameInProgContainerStyle>
  );
};

export default GameInProgressSection;
