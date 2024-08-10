export type Movie = string; //will be an object
export type Movies = Movie[];

export type HangmanSteps = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;
export type Player = {
  name: string;
  score: number;
};

export type Ranking = {
  score: number;
  name: string;
};

export const Ranking: Ranking[] = [
  { name: "Player 1", score: 0 },
  { name: "Player 2", score: 0 },
  { name: "Player 3", score: 0 },
  { name: "Player 4", score: 0 },
  { name: "Player 5", score: 0 },
];
