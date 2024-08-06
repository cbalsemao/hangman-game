import { Button } from "@mui/material";
import { ButtonWrapper } from "../styles/styleguide";

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
