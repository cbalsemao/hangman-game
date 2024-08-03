import React from "react";
import { useState } from "react";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //height: 100vh;
`;

const ButtonWrapper = styled.div``;

const AlphabetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const alphabet: string[] = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

enum GameStatus {
  ToStart = "ToStart",
  InProgress = "InProgress",
  Win = "Win",
  Lose = "Lose",
}

function App() {
  const [countdown, setCountdown] = useState<number>(6);
  const [gameStatus, setGameStatus] = useState<string>(GameStatus.ToStart);
  const [secretWord, setSecretWord] = useState<string>(
    "Esta es una pelicula x"
  );

  //ToStart - inProgres - Win - Lose

  const handleStart = () => {
    setGameStatus(GameStatus.InProgress);
  };
  console.log("chi sta facendo?");
  console.log(gameStatus);

  return (
    <>
      <Wrapper>
        <h1>Hangman Game</h1>
        {gameStatus === GameStatus.ToStart ? (
          <ButtonWrapper>
            <Button onClick={handleStart} variant="contained" color="primary">
              Start
            </Button>
          </ButtonWrapper>
        ) : (
          <>
            <h2>Secret Word: {secretWord}</h2>
            {alphabet.map((letter) => {
              return (
                <AlphabetWrapper key={letter} color="primary">
                  <Button>{letter}</Button>
                </AlphabetWrapper>
              );
            })}
          </>
        )}
      </Wrapper>
    </>
  );
}

export default App;
