import { useCallback, useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { Global } from '@emotion/react';
import { GlobalStylesApp, theme } from './styles/styleguide';
import {
  calculatePlayerTime,
  calculateScore,
  COUNTDOWN_END,
  COUNTDOWN_START,
  GameStatus,
  getHiddenWord,
  insertInRanking,
  isGameEndedLose,
  isGameEndedWin,
  isGameInProgress,
  isGameToStart,
  selectRandomMovie,
} from './utils/utility';
import { HangmanSteps, Ranking } from './utils/types';
import { AppWrapper } from './components/StyledComponents';
import GameToStartSection from './sections/GameToStartSection';
import GameInProgressSection from './sections/GameInProgressSection';
import { GameEndedSection } from './sections/GameEndedSection';

export const Timer = () => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <Box>
      <Typography
        variant="body1"
        sx={{ fontFamily: theme.typography.fontFamily, fontWeight: 'bold' }}
      >
        Time:
      </Typography>
      <Typography variant="h5">{formatTime(time)}</Typography>
    </Box>
  );
};

//TODO: Implement a customHook for this functionality

function App() {
  const [countdown, setCountdown] = useState<HangmanSteps>(COUNTDOWN_START);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>('');
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [temporalName, setTemporalName] = useState<string>('');
  const [playersList, setPlayersList] = useState<string[]>([]);
  const [rankings, setRankings] = useState<Ranking[]>([]);
  const [playerTime, setPlayerTime] = useState(new Date());
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

  useEffect(() => {
    localStorage.setItem('rankings', JSON.stringify(rankings));
    localStorage.setItem('playersList', JSON.stringify(playersList));
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

      if (!playersList.includes(temporalName)) {
        const updatedPlayersList = [...playersList, temporalName];
        setPlayersList(updatedPlayersList);
      }
    }
  }, [gameStatus]);

  const handleStart = () => {
    const newSecretWord = selectRandomMovie();
    setSecretWord(newSecretWord.toLowerCase());
    setGuessedLetters([]);
    setWrongLetters([]);
    setGameStatus(GameStatus.InProgress);
    setPlayerTime(new Date());
    setCountdown(COUNTDOWN_START);
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
    setCountdown(COUNTDOWN_START);
  };

  const handleSelectPlayer = (playerName: string) => {
    setTemporalName(playerName);
    handleStart();
  };

  return (
    <AppWrapper container>
      <Global styles={GlobalStylesApp} />

      {isGameToStart(gameStatus) && (
        <GameToStartSection
          playersList={playersList}
          handleSelectPlayer={handleSelectPlayer}
          temporalName={temporalName}
          setTemporalName={setTemporalName}
          handleStart={handleStart}
        />
      )}
      {isGameInProgress(gameStatus) && (
        <GameInProgressSection
          secretWord={secretWord}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          handleWordToGuess={handleWordToGuess}
          handleRestart={handleRestart}
          countdown={countdown}
        />
      )}

      {(isGameEndedLose(gameStatus) || isGameEndedWin(gameStatus)) && (
        <GameEndedSection
          secretWord={secretWord}
          rankings={rankings}
          handleRestart={handleRestart}
          gameStatus={gameStatus}
        />
      )}
    </AppWrapper>
  );
}

export default App;
