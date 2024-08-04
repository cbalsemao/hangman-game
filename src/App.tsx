import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { alphabet } from "./utils/Alphabet";

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

function App() {
  const [countdown, setCountdown] = useState<number>(6);
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>(selectRandomMovie()); //esto hay que editarlo
  const [word, setWord] = useState<string>("");

  const secretWordLength = secretWord.length;
  const secretWordToLowerCase = secretWord.toLowerCase();

  const handleWordToGuess = (letter: string) => {
    let newWord = "";

    for (let i = 0; i < secretWordLength; i++) {
      if (secretWordToLowerCase[i] === letter) {
        newWord += letter;
      } else if (secretWordToLowerCase[i] !== word[i] && word[i] !== "-") {
        newWord += "-";
        setCountdown(countdown - 1);
      } else {
        newWord += word[i];
        setCountdown(countdown - 1);
      }
    }

    setWord(newWord);
  };

  const handleStart = () => {
    setGameStatus(GameStatus.InProgress);
  };

  return (
    <Wrapper>
      <TitleWrapper>
        <h1>Hangman Game</h1>
      </TitleWrapper>
      {gameStatus === GameStatus.ToStart ? (
        <ButtonWrapper>
          <Button onClick={handleStart} variant="contained" color="primary">
            Start
          </Button>
        </ButtonWrapper>
      ) : (
        <>
          <MovieWrapper>
            <p>img sr en la horca</p>
            <p>{word}</p>
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
      )}
    </Wrapper>
  );
}

export default App;
