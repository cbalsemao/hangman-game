export type Movie = string;
export type Movies = Movie[];

export type HangmanSteps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Player = {
  name: string;
  score: number;
};

export type Ranking = {
  score: number;
  name: string;
  time: string;
  movie: string;
};

export type GameToStartSectionProps = {
  playersList: string[];
  handleSelectPlayer: (playerName: string) => void;
  setTemporalName: (name: string) => void;
  handleStart: () => void;
  temporalName: string;
};

export type GameInProgressSectionProps = {
  secretWord: string;
  guessedLetters: string[];
  wrongLetters: string[];
  handleWordToGuess: (letter: string) => void;
  handleRestart: () => void;
  countdown: number;
};

export type ButtonHMProps = {
  title?: string;
  label: string;
  onClick: () => void;
};
