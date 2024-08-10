import styled from "@emotion/styled";
import { Grid } from "@mui/material";

export const Wrapper = styled.div`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const TitleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const MovieWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 40%;
  font-size: 30px;
`;

export const AlphabetWrapper = styled(Grid)`
  background-color: lightblue;
  width: 50%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const GameOverWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;
