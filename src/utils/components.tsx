import { Button, Card, Typography } from "@mui/material";
import { ButtonWrapper } from "../styles/styleguide";
import { Ranking } from "./types";
import { RankingBdWrapper, RankingList } from "../styles/styleguide";
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

export const RankingBoard = ({ rankings }: { rankings: Ranking[] }) => {
  return (
    <Card sx={{ width: 200, height: 200, position: "absolute", right: 100 }}>
      <RankingBdWrapper>
        <Typography gutterBottom variant="h5" component="div">
          Ranking
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <RankingList>
            {rankings.map((player, index) => (
              <li key={player + "" + index}>
                {player.name} {player.score}
              </li>
            ))}
          </RankingList>
        </Typography>
      </RankingBdWrapper>
    </Card>
  );
};
