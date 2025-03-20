import { useCallback, useEffect, useState } from 'react';
import { Button, Grid, TextField, Typography, Paper, Box } from '@mui/material';
import { Global } from '@emotion/react';
import {
  AlphabetWrapper,
  GameEndWrapper,
  MovieWrapper,
  TitleWrapper,
  GlobalStyles,
  palette,
  theme,
} from './styles/styleguide';
import {
  alphabet,
  calculatePlayerTime,
  calculateScore,
  COUNTDOWN_END,
  COUNTDOWN_START,
  GameStatus,
  getHiddenWord,
  HANGMAN_IMAGE,
  insertInRanking,
  isGameEndedLose,
  isGameEndedWin,
  isGameInProgress,
  isGameToStart,
  parseScore,
  selectRandomMovie,
} from './utils/utility';
import { HangmanSteps, Ranking } from './utils/types';
import { AppWrapper, ButtonHM, RankingBoard } from './utils/components';

function App() {
  const [countdown, setCountdown] = useState<HangmanSteps>(COUNTDOWN_START);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [temporalName, setTemporalName] = useState<string>('');
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [playerTime, setPlayerTime] = useState(new Date());

  const tmpScorePlayer = calculateScore(wrongLetters, guessedLetters);
  const tmpFinalTime = calculatePlayerTime(playerTime, new Date());

  useEffect(() => {
    if (isGameEndedLose(gameStatus) || isGameEndedWin(gameStatus)) {
      const updatedRankings = insertInRanking(
        temporalName,
        tmpScorePlayer,
        tmpFinalTime,
        secretWord,
        rankings
      );
      setRankings(updatedRankings);
    }
  }, [gameStatus]);

  const handleStart = () => {
    if (!temporalName) {
      alert('Enter a player name!');
      return;
    }
    const newSecretWord = selectRandomMovie();
    setSecretWord(newSecretWord.toLowerCase());
    setGuessedLetters([]);
    setGameStatus(GameStatus.InProgress);
    setPlayerTime(new Date());
  };

  const handleWordToGuess = useCallback(
    (letter: string) => {
      if (guessedLetters.includes(letter) || wrongLetters.includes(letter))
        return;

      if (secretWord.includes(letter)) {
        const newGuessedLetters = [...guessedLetters, letter];
        setGuessedLetters(newGuessedLetters);
        if (getHiddenWord(secretWord, newGuessedLetters) === secretWord) {
          setGameStatus(GameStatus.Win);
        }
      } else {
        setWrongLetters([...wrongLetters, letter]);
        let newCountdown = countdown - 1;
        if (newCountdown === COUNTDOWN_END) {
          setGameStatus(GameStatus.Lose);
        } else {
          setCountdown(newCountdown as HangmanSteps);
        }
      }
    },
    [countdown, guessedLetters, secretWord, wrongLetters]
  );

  return (
    <AppWrapper>
      <Global
        styles={{ body: { overflowX: 'hidden', margin: 0, padding: 0 } }}
      />
      {isGameToStart(gameStatus) && (
        <Grid
          container
          spacing={2}
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            width: '100%',
            height: '100%',
            textAlign: 'center',
            background: palette.white,
          }}
        >
          <TitleWrapper>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{
                fontFamily: theme.typography.fontFamily,
                fontWeight: 'bold',
                fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '6rem' },
              }}
            >
              Hangman
            </Typography>
          </TitleWrapper>
          <Grid
            item
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <TextField
              id="outlined-basic"
              label="Type your name"
              onChange={(e) => setTemporalName(e.target.value)}
              sx={{
                width: '80%',
                maxWidth: '400px',
                backgroundColor: palette.white,
                borderRadius: 2,
              }}
            />
          </Grid>
          <Grid item>
            <ButtonHM label={'Start'} onClick={handleStart} />
          </Grid>
        </Grid>
      )}
      {isGameInProgress(gameStatus) && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            minHeight: '100vh',
            width: '100%',
            textAlign: 'center',
            background: palette.white,
            overflowX: 'hidden',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <Typography variant="h4" component="p">
              {HANGMAN_IMAGE[countdown]}
            </Typography>
            <MovieWrapper>
              <Typography
                variant="h4"
                component="p"
                sx={{
                  fontSize: {
                    xs: '1.5rem',
                    sm: '2rem',
                    md: '2.5rem',
                    lg: '3rem',
                  },
                  paddingBottom: 4,
                }}
              >
                {getHiddenWord(secretWord, guessedLetters).toUpperCase()}
              </Typography>
              <AlphabetWrapper container sx={{ width: '100%' }}>
                {alphabet.map((letter) => (
                  <Grid key={letter} sx={{ padding: 0.5 }}>
                    <Button
                      onClick={() => handleWordToGuess(letter)}
                      variant="contained"
                      sx={{
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
                  </Grid>
                ))}
              </AlphabetWrapper>
            </MovieWrapper>
          </Box>
        </Grid>
      )}
    </AppWrapper>
  );
}

export default App;
