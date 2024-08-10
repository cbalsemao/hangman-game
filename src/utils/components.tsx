import { Button, Card, CardContent, Typography } from "@mui/material";
import { ButtonWrapper } from "../styles/styleguide";
import { Ranking } from "./types";

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
    <>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ranking
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <ul>
              {Ranking.map((player, index) => (
                <li key={index}>
                  {player.name} {player.score}
                </li>
              ))}
            </ul>
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};
