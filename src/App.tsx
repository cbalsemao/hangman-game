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
  const [playersList, setPlayersList] = useState<string[]>([]); // Estado para los jugadores anteriores

  const tmpScorePlayer = calculateScore(wrongLetters, guessedLetters);
  const tmpFinalTime = calculatePlayerTime(playerTime, new Date());

  useEffect(() => {
    const storedRankings = JSON.parse(localStorage.getItem('rankings') || '[]');
    setRankings(storedRankings);

    const storedPlayers = JSON.parse(
      localStorage.getItem('playersList') || '[]'
    );
    setPlayersList(storedPlayers);
  }, []);

  // Guardar los rankings y la lista de jugadores en localStorage
  useEffect(() => {
    localStorage.setItem('rankings', JSON.stringify(rankings));
    localStorage.setItem('playersList', JSON.stringify(playersList)); // Guardar la lista de jugadores
  }, [rankings, playersList]);

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

      // Agregar el nombre del jugador a la lista si no está ya presente
      if (!playersList.includes(temporalName)) {
        const updatedPlayersList = [...playersList, temporalName];
        setPlayersList(updatedPlayersList);
      }
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
    setWrongLetters([]);
    setGameStatus(GameStatus.InProgress);
    setPlayerTime(new Date());
    setCountdown(COUNTDOWN_START); // Reset countdown to the start
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

  const handleRestart = () => {
    setTemporalName('');
    setGameStatus(GameStatus.ToStart);
    setSecretWord('');
    setGuessedLetters([]);
    setWrongLetters([]);
    setCountdown(COUNTDOWN_START); // Reset countdown to start
  };

  const handleSelectPlayer = (playerName: string) => {
    setTemporalName(playerName);
    handleStart();
  };

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

          {/* Previous players */}
          <Grid
            item
            sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
          >
            <Typography variant="h5" sx={{ marginTop: 3 }}>
              Previous Players
            </Typography>
            <Box
              sx={{
                marginTop: 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              {playersList.map((playerName, index) => (
                <Button
                  key={index}
                  variant="contained"
                  sx={{ margin: 1 }}
                  onClick={() => handleSelectPlayer(playerName)}
                >
                  {playerName}
                </Button>
              ))}
            </Box>
          </Grid>

          <Grid item>
            <ButtonHM label={'Start'} onClick={handleStart} />
          </Grid>
        </Grid>
      )}

      {isGameInProgress(gameStatus) && (
        <Paper
          sx={{
            width: '80%',
            maxWidth: '900px',
            margin: 'auto',
            padding: 4,
            borderRadius: '16px',
            boxShadow: 3,
            backgroundColor: palette.white,
            textAlign: 'center',
          }}
        >
          <Grid
            container
            spacing={3}
            justifyContent="center"
            alignItems="center"
          >
            <Grid item xs={12} md={5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                {HANGMAN_IMAGE[countdown]}
                <Typography variant="h5" sx={{ marginTop: 2 }}>
                  HANGMAN GAME
                </Typography>
                <Paper
                  sx={{
                    padding: 1,
                    borderRadius: 2,
                    marginTop: 1,
                    backgroundColor: '#555',
                    color: '#fff',
                  }}
                >
                  <Typography variant="body1">Time left:</Typography>
                  <Typography variant="h6">0:00</Typography>
                </Paper>
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
                {alphabet.map((letter) => (
                  <Grid item key={letter} sx={{ padding: 0.5 }}>
                    <Button
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
                  </Grid>
                ))}
              </AlphabetWrapper>
            </Grid>
          </Grid>
        </Paper>
      )}

      {/* Game End */}
      {isGameEndedLose(gameStatus) && (
        <GameEndWrapper>
          <Typography variant="h4" color="error" gutterBottom>
            You Lost! The movie was: {secretWord.toUpperCase()}
          </Typography>

          <RankingBoard rankings={rankings} />
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart Game
          </Button>
        </GameEndWrapper>
      )}
      {isGameEndedWin(gameStatus) && (
        <GameEndWrapper>
          <Typography
            variant="h4"
            color="success"
            gutterBottom
            sx={{ color: palette.white }}
          >
            Congratulations! You Won! The movie was: {secretWord.toUpperCase()}
          </Typography>

          <RankingBoard rankings={rankings} />
          <Button variant="contained" color="primary" onClick={handleRestart}>
            Restart Game
          </Button>
        </GameEndWrapper>
      )}
    </AppWrapper>
  );
}

export default App;
