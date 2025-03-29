import { Card, Grid, Typography } from '@mui/material';
import {
  ButtonHM,
  ButtonWrapper,
  LeaderBoardTitle,
  RankBoardContainerStyled,
  RankingBdWrapper,
  RankingList,
} from './StyledComponents';
import { palette, theme } from '../styles/styleguide';
import { Ranking } from '../utils/types';

export const ReturnMenuButton = ({
  handleStart,
}: {
  handleStart: () => void;
}) => {
  return (
    <ButtonWrapper>
      <ButtonHM onClick={handleStart} variant="contained">
        Return to menu
      </ButtonHM>
    </ButtonWrapper>
  );
};

export const RankingBoard = ({ rankings }: { rankings: Ranking[] }) => {
  const winners = rankings
    .filter((player) => player.score > 0)
    .sort((a, b) => b.score - a.score);

  return (
    <RankBoardContainerStyled>
      <RankingBdWrapper>
        <LeaderBoardTitle>Leaderboard</LeaderBoardTitle>
        <RankingList>
          <Grid container direction="column" spacing={2}>
            {winners.map((player, index) => (
              <Grid
                container
                direction="row"
                key={player.name + '' + index}
                sx={{
                  padding: 2,
                  backgroundColor: palette.white,
                  borderRadius: '10px',
                  alignItems: 'center',
                  boxShadow: '0px 4px 10px rgba(2, 2, 2, 0.1)',
                  fontSize: {
                    xs: '1rem',
                    sm: '1.5rem',
                    md: '2rem',
                    lg: '2.5rem',
                  },
                }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    color: palette.black,
                  }}
                >
                  #{index + 1}
                </Grid>
                <Grid
                  item
                  xs={5}
                  sx={{
                    textAlign: 'left',
                    color: palette.black,
                  }}
                >
                  {player.name}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: 'center',
                    color: palette.black,
                  }}
                >
                  {player.score} pts
                </Grid>
                <Grid
                  item
                  xs={3}
                  sx={{
                    textAlign: 'center',
                    color: palette.black,
                  }}
                >
                  {player.time}s
                </Grid>
              </Grid>
            ))}
          </Grid>
        </RankingList>
      </RankingBdWrapper>
    </RankBoardContainerStyled>
  );
};
