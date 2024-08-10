import { Button } from "@mui/material";
import { ButtonWrapper } from "../styles/styleguide";
import { ranking } from "./utility";

interface ButtonHMProps {
  title?: string;
  label: string;
  onClick: () => void;
}

export const ButtonHM = ({ title, label, onClick }: ButtonHMProps) => {
  return (
    <ButtonWrapper>
      <p>{title}</p>
      <Button onClick={onClick} variant="contained" color="primary">
        {label}
      </Button>
    </ButtonWrapper>
  );
};

/*type Ranking = {
  name: string;
  score: number;
}

*/

export const RankingBoard = () => {
  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {ranking.map((player, index) => (
          <li key={index}>
            {player.name} - {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};
