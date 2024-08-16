import styled from "@emotion/styled";
import { CardContent, Grid } from "@mui/material";

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
  width: 500px;
  flex-direction: row;
  border-radius: 42px;
  padding: 25px;
  min-width: 500px;
`;

export const GameEndWrapper = styled(Grid)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RankingBdWrapper = styled(CardContent)`
  align-items: center;
  flex-direction: column;
  justify-content: center;
`;

export const RankingList = styled("ul")`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;
