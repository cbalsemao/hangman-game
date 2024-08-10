import { Button } from "@mui/material";
import { ButtonWrapper } from "../styles/styleguide";
import { Ranking } from "./utility";

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

export const RankingBoard = () => {
  return (
    <div>
      <h1>Ranking</h1>
      <ul>
        {Ranking.map((player, index) => (
          <li key={index}>
            {player.name} {player.score}
          </li>
        ))}
      </ul>
    </div>
  );
};
