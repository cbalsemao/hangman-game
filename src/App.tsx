import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { alphabet } from "./utils/Alphabet";
import { hangmanLives } from "./utils/HangmanLives";

const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  justify-content: space-between;
  align-items: center;
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const MovieWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 25%;
  font-size: 20px;
`;

enum GameStatus {
  ToStart = "ToStart",
  InProgress = "InProgress",
  Win = "Win",
  Lose = "Lose",
}

const Movies = [
  "Hulk",
  "Black Widow",
  "Spiderman",
  "Ironman",
  "Thor",
  "Captain America",
  "Black Widow",
  "Doctor Strange",
  "Antman",
  "Black Panther",
  "Captain Marvel",
];

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
  const [countdown, setCountdown] = useState<number>(6);
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>("");
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const secretWordLowercase = secretWord.toLowerCase();

  const hiddenWord = getHiddenWord(secretWordLowercase, guessedLetters);

  let lives = hangmanLives[countdown];

  const handleStart = () => {
    setCountdown(6);
    const newSecretWord = selectRandomMovie();
    setSecretWord(newSecretWord);
    setGuessedLetters([]);
    setGameStatus(GameStatus.InProgress);
  };

  const handleWordToGuess = (letter: string) => {
    if (secretWordLowercase.includes(letter)) {
      setGuessedLetters([...guessedLetters, letter]);

      const hiddenWord = getHiddenWord(secretWordLowercase, guessedLetters);

      if (!hiddenWord.includes("-")) {
        setGameStatus(GameStatus.Win);
      }
    } else {
      if (countdown === 0) {
        setGameStatus(GameStatus.Lose);
      } else {
        setCountdown(countdown - 1);
      }
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
            <p>{lives}</p>
            <p>{hiddenWord}</p>
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
