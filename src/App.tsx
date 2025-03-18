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

  const buttonColorHandler = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      return 'green';
    } else if (wrongLetters.includes(letter)) {
      return 'red';
    } else {
      return palette.black;
    }
  };

  const flushGame = () => {
    setGameStatus(GameStatus.ToStart);
    setCountdown(COUNTDOWN_START);
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  return (
    <AppWrapper>
      <Global styles={GlobalStyles} />
      <>
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
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '8rem' },
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
                InputProps={{
                  sx: {
                    backgroundColor: palette.white,
                    borderRadius: 10,
                    '&.Mui-focused fieldset': {
                      borderRadius: 10,
                      borderColor: palette.black,
                    },
                    '&:hover fieldset': {
                      borderRadius: 10,
                      borderColor: palette.black,
                    },
                    '& fieldset': {
                      borderRadius: 10,
                      borderColor: palette.black,
                    },
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: palette.black,
                  },
                }}
              />
            </Grid>
            <Grid item>
              <ButtonHM label={'Start'} onClick={handleStart} />
            </Grid>
            <Grid item sx={{ color: palette.black }}>
              <Typography
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  fontWeight: 'bold',
                }}
                variant="h5"
                component="h2"
                gutterBottom
              >
                Previous Players
              </Typography>
              {rankings.map((player) => (
                <Button
                  key={player.name}
                  onClick={() => {
                    setTemporalName(player.name);
                    handleStart();
                  }}
                >
                  {player.name}
                </Button>
              ))}
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
                  fontSize: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
                }}
              >
                Hangman
              </Typography>
            </TitleWrapper>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box>
                <Typography variant="h4" component="p">
                  {HANGMAN_IMAGE[countdown]}
                </Typography>
              </Box>
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
                <AlphabetWrapper container spacing={1}>
                  {alphabet.map((letter) => (
                    <Grid item key={letter} xs={2} sm={2}>
                      <Button
                        onClick={() => handleWordToGuess(letter)}
                        variant="contained"
                        sx={{
                          backgroundColor: buttonColorHandler(letter),
                          fontFamily: 'Courier New, Courier, monospace',
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
        {isGameEndedWin(gameStatus) && (
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              minHeight: '100vh',
              textAlign: 'center',
              background: palette.white,
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: 'center', margin: 3 }}
            >
              <GameEndWrapper container spacing={1}>
                <Grid item sx={{ color: palette.darkWhite }}>
                  <Typography variant="h4" component="h1" align="center">
                    {'MOVIE WAS: ' + secretWord + ' !!! 😊'}
                  </Typography>
                  <Typography variant="h6" component="p" align="center">
                    {temporalName}, your score is {parseScore(tmpScorePlayer)}
                  </Typography>
                </Grid>
                <ButtonHM
                  title={'You win!'}
                  label={'Play Again'}
                  onClick={() => {
                    flushGame();
                    handleStart();
                  }}
                />
                <ButtonHM label={'Menu'} onClick={() => flushGame()} />
              </GameEndWrapper>
            </Paper>
          </Grid>
        )}
        {isGameEndedLose(gameStatus) && (
          <Grid
            container
            spacing={2}
            direction="column"
            justifyContent="center"
            alignItems="center"
            sx={{
              height: '100vh',
              width: '100vh',
              textAlign: 'center',
              background: palette.white,
            }}
          >
            <Paper
              elevation={3}
              sx={{ padding: 3, textAlign: 'center', margin: 3 }}
            >
              <GameEndWrapper container spacing={1}>
                <Grid item sx={{ color: palette.darkWhite }}>
                  <Typography variant="h4" component="h1" align="center">
                    {'MOVIE WAS: ' + secretWord + ' !!! 😢'}
                  </Typography>
                  <Typography variant="h6" component="p" align="center">
                    {temporalName}, your score is {parseScore(tmpScorePlayer)}
                  </Typography>
                </Grid>
                <ButtonHM
                  title={'You Lose!'}
                  label={'Play Again'}
                  onClick={() => {
                    flushGame();
                    handleStart();
                  }}
                />
                <ButtonHM
                  label={'Menu'}
                  onClick={() => {
                    setTemporalName('');
                    flushGame();
                  }}
                />
              </GameEndWrapper>
            </Paper>
          </Grid>
        )}

        {(isGameEndedLose(gameStatus) || isGameEndedWin(gameStatus)) && (
          <RankingBoard rankings={rankings} />
        )}
      </>
    </AppWrapper>
  );
}

export default App;
