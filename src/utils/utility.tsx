import { ReactElement } from 'react';
import img0 from '../assets/img-hangman1.png';
import img1 from '../assets/img-hangman2.png';
import img2 from '../assets/img-hangman3.png';
import img3 from '../assets/img-hangman4.png';
import img4 from '../assets/img-hangman5.png';
import img5 from '../assets/img-hangman6.png';
import img6 from '../assets/img-hangman7.png';
import { HangmanSteps, Movies, Ranking } from './types';
import { MOCK_MOVIES } from './movies';

const HANGMAN_IMAGE_SIZE = { width: '250', height: '250' };

export const HANGMAN_IMAGE: Record<HangmanSteps, ReactElement> = {
  0: <img src={img6} {...HANGMAN_IMAGE_SIZE} />,
  1: <img src={img6} {...HANGMAN_IMAGE_SIZE} />,
  2: <img src={img5} {...HANGMAN_IMAGE_SIZE} />,
  3: <img src={img4} {...HANGMAN_IMAGE_SIZE} />,
  4: <img src={img3} {...HANGMAN_IMAGE_SIZE} />,
  5: <img src={img2} {...HANGMAN_IMAGE_SIZE} />,
  6: <img src={img1} {...HANGMAN_IMAGE_SIZE} />,
  7: <img src={img0} {...HANGMAN_IMAGE_SIZE} />,
};

export const COUNTDOWN_START = 7;
export const COUNTDOWN_END = 0;

export const alphabet: string[] = [
  'a',
  'b',
  'c',
  'd',
  'e',
  'f',
  'g',
  'h',
  'i',
  'j',
  'k',
  'l',
  'm',
  'n',
  'o',
  'p',
  'q',
  'r',
  's',
  't',
  'u',
  'v',
  'w',
  'x',
  'y',
  'z',
];

export enum GameStatus {
  ToStart = 'ToStart',
  InProgress = 'InProgress',
  Win = 'Win',
  Lose = 'Lose',
}

export const selectRandomMovie = (movies?: Movies) => {
  const moviesList = movies || MOCK_MOVIES;
  const i = Math.floor(Math.random() * moviesList.length);
  return moviesList[i];
};

export const getHiddenWord = (word: string, guessedLetters: string[]) => {
  return word
    .split('')
    .map((letter) =>
      letter === ' ' ? ' ' : guessedLetters.includes(letter) ? letter : ' _ '
    )
    .join('');
};

export const isGameToStart = (gameStatus: GameStatus) => {
  return gameStatus === GameStatus.ToStart;
};

export const isGameInProgress = (gameStatus: GameStatus) => {
  return gameStatus === GameStatus.InProgress;
};

export const isGameEndedWin = (gameStatus: GameStatus) => {
  return gameStatus === GameStatus.Win;
};

export const isGameEndedLose = (gameStatus: GameStatus) => {
  return gameStatus === GameStatus.Lose;
};

export const parseScore = (score: number) => {
  return score < 0 ? 0 : score;
};

export const calculateScore = (
  wrongLetters: string[],
  guessedLetters: string[]
): number => {
  return wrongLetters.length * -10 + guessedLetters.length * 100;
};

export const insertInRanking = (
  name: string,
  newScore: number,
  newTime: string,
  movie: string,
  rankings: Ranking[]
): Ranking[] => {
  const targetRanking = rankings.find((ranking) => ranking.name === name);
  if (targetRanking) {
    if (
      !targetRanking.score ||
      targetRanking.score < newScore ||
      compareFormattedDates(targetRanking.time, newTime)
    ) {
      return [
        ...rankings.filter((ranking) => ranking.name !== name),
        { ...targetRanking, score: parseScore(newScore), time: newTime },
      ].sort((a, b) => b.score - a.score);
    }
    return rankings;
  } else {
    return [
      ...rankings,
      { name, score: parseScore(newScore), time: newTime, movie },
    ].sort((a, b) => b.score - a.score);
  }
};

export const calculatePlayerTime = (initialTime: Date, finalTime: Date) => {
  let getMinutes = finalTime.getMinutes() - initialTime.getMinutes();
  let getSeconds = finalTime.getSeconds() - initialTime.getSeconds();

  if (getSeconds < 0) {
    getMinutes -= 1;
    getSeconds = 60 + getSeconds;
  }

  const time = `${getMinutes}m ${getSeconds}s`;

  return time;
};

const compareFormattedDates = (dateA: string, dateB: string) => {
  const aMinutes = parseInt(dateA.split('m')[0]);
  const aSeconds = parseInt(dateA.split('m')[1].split('s')[0]);

  const bMinutes = parseInt(dateB.split('m')[0]);
  const bSeconds = parseInt(dateB.split('m')[1].split('s')[0]);

  const totalAseconds = aMinutes * 60 + aSeconds;
  const totalBseconds = bMinutes * 60 + bSeconds;

  if (totalAseconds < totalBseconds) {
    return -1;
  }

  if (totalAseconds > totalBseconds) {
    return 1;
  }

  return 0;
};
