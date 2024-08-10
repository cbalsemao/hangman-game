import { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import { Grid, TextField } from "@mui/material";
import {
  AlphabetWrapper,
  GameOverWrapper,
  MovieWrapper,
  TitleWrapper,
  Wrapper,
} from "./styles/styleguide";
import {
  alphabet,
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
  selectRandomMovie,
} from "./utils/utility";
import { HangmanSteps, Ranking } from "./utils/types";
import { ButtonHM, RankingBoard } from "./utils/components";

function App() {
  const [countdown, setCountdown] = useState<HangmanSteps>(COUNTDOWN_START);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);
  const [wrongLetters, setWrongLetters] = useState<string[]>([]);
  const [name, setName] = useState<string>("");

  let scorePlayer = calculateScore(wrongLetters, guessedLetters);

  const handleStart = () => {
    const newSecretWord = selectRandomMovie();
    setSecretWord(newSecretWord.toLowerCase());
    setGuessedLetters([]);
    setGameStatus(GameStatus.InProgress);
  };

  const handleWordToGuess = useCallback(
    (letter: string) => {
      if (secretWord.includes(letter)) {
        const newGuessedLetters = [...guessedLetters, letter];
        if (getHiddenWord(secretWord, newGuessedLetters) === secretWord) {
          setGameStatus(GameStatus.Win);
        } else {
          setGuessedLetters(newGuessedLetters);
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
      insertInRanking(name, scorePlayer, Ranking);
    },
    [countdown, guessedLetters, secretWord, wrongLetters]
  );

  const buttonColorHandler = (letter: string) => {
    if (guessedLetters.includes(letter)) {
      return "success";
    } else if (wrongLetters.includes(letter)) {
      return "error";
    } else {
      return "primary";
    }
  };

  const flushGame = () => {
    setGameStatus(GameStatus.ToStart);
    setCountdown(COUNTDOWN_START);
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>Hangman Game</h1>
      </TitleWrapper>
      <>
        {isGameToStart(gameStatus) && (
          <>
            <TextField
              id="outlined-basic"
              label="Type your name"
              variant="outlined"
              required
              onChange={(e) => setName(e.target.value)} //estoy aqui
            />
            <ButtonHM label={"Start"} onClick={handleStart} />
          </>
        )}

        {isGameInProgress(gameStatus) && (
          <>
            <MovieWrapper>
              <p>{HANGMAN_IMAGE[countdown]}</p>
              <p>{getHiddenWord(secretWord, guessedLetters)}</p>
            </MovieWrapper>
            <AlphabetWrapper container spacing={1}>
              {alphabet.map((letter) => (
                <Grid item key={letter} xs={4} sm={2}>
                  <Button
                    onClick={() => handleWordToGuess(letter)}
                    variant="contained"
                    color={buttonColorHandler(letter)}
                  >
                    {letter}
                  </Button>
                </Grid>
              ))}
            </AlphabetWrapper>
          </>
        )}
        {isGameEndedWin(gameStatus) && (
          <>
            <h1>{"MOVIE WAS: " + secretWord + " !!! 😊"}</h1>
            <ButtonHM
              title={"You win!"}
              label={"You Win! Play Again"}
              onClick={() => {
                flushGame();
                handleStart();
              }}
            />
            <RankingBoard />
            <ButtonHM label={"Menu"} onClick={() => flushGame()} />
          </>
        )}
        {isGameEndedLose(gameStatus) && (
          <>
            <GameOverWrapper container spacing={1}>
              <Grid item>
                <h1>{"MOVIE WAS: " + secretWord + " !!! 😢"}</h1>
                <p>
                  {name}, your score is {scorePlayer}
                </p>
              </Grid>
              <RankingBoard />

              <ButtonHM
                title={"You Lose!"}
                label={"Play Again"}
                onClick={() => {
                  flushGame();
                  handleStart();
                }}
              />
              <ButtonHM label={"Menu"} onClick={() => flushGame()} />
            </GameOverWrapper>
          </>
        )}
      </>
    </Wrapper>
  );
}

export default App;
