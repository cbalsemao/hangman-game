import { useEffect, useState } from "react";
import { alphabet } from "./utils/Alphabet";
import { hangmanLives } from "./utils/HangmanLives";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import {
  ButtonWrapper,
  MovieWrapper,
  TitleWrapper,
  Wrapper,
} from "./styles/AppStyles";
import { Movies } from "./utils/Movies";
import { HangmanLivesType } from "./utils/HangmanLives";

enum GameStatus {
  ToStart = "ToStart",
  InProgress = "InProgress",
  Win = "Win",
  Lose = "Lose",
}

const selectRandomMovie = () => {
  const i = Math.floor(Math.random() * Movies.length);
  return Movies[i];
};

const getHiddenWord = (word: string, guessedLetters: string[]) => {
  return word
    .split("")
    .map((letter) =>
      letter === " " ? " " : guessedLetters.includes(letter) ? letter : "-"
    )
    .join("");
};

function App() {
  const [countdown, setCountdown] = useState<number>(7);
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const secretWordLowercase = secretWord.toLowerCase();
  const hiddenWord = getHiddenWord(secretWordLowercase, guessedLetters);

  const currentLife = hangmanLives.find(
    (life) => life.key === countdown
  ) as HangmanLivesType;

  useEffect(() => {
    if (countdown === 0) {
      setGameStatus(GameStatus.Lose);
    } else if (hiddenWord === secretWordLowercase) {
      setGameStatus(GameStatus.Win);
    }
  }, [countdown, hiddenWord]);

  const handleStart = () => {
    setCountdown(7);
    const newSecretWord = selectRandomMovie();
    setSecretWord(newSecretWord);
    setGuessedLetters([]);
    setGameStatus(GameStatus.InProgress);
  };

  const handleWordToGuess = (letter: string) => {
    if (secretWordLowercase.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);
    } else {
      setCountdown(countdown - 1);
    }
  };

  let content;

  switch (gameStatus) {
    case GameStatus.ToStart:
      content = (
        <ButtonWrapper>
          <Button onClick={handleStart} variant="contained" color="primary">
            Start
          </Button>
        </ButtonWrapper>
      );
      break;
    case GameStatus.InProgress:
      content = (
        <>
          <MovieWrapper>
            <p>{currentLife.image}</p>
            <p>{hiddenWord}</p>
            <p>{currentLife.key}</p>
          </MovieWrapper>
          <Grid
            container
            style={{
              backgroundColor: "lightblue",
              width: "50%",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
            spacing={1}
          >
            {alphabet.map((letter) => (
              <Grid item key={letter} xs={4} sm={2}>
                <Button
                  onClick={() => handleWordToGuess(letter)}
                  variant="contained"
                  color="primary"
                >
                  {letter}
                </Button>
              </Grid>
            ))}
          </Grid>
        </>
      );
      break;
    case GameStatus.Win:
      content = (
        <ButtonWrapper>
          <Button onClick={handleStart} variant="contained" color="primary">
            You Win! Play Again
          </Button>
        </ButtonWrapper>
      );
      break;
    case GameStatus.Lose:
      content = (
        <ButtonWrapper>
          <p>You Lose!</p>
          <Button onClick={handleStart} variant="contained" color="primary">
            Play Again
          </Button>
        </ButtonWrapper>
      );
      break;
  }

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>Hangman Game</h1>
      </TitleWrapper>
      {content}
    </Wrapper>
  );
}

export default App;
