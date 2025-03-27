import { Card, Grid, Typography, typographyClasses } from '@mui/material';
import {
  ButtonHM,
  ButtonWrapper,
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
    <Card
      sx={{
        width: 400,
        padding: 3,
        backgroundColor: palette.white,
        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.15)',
        borderRadius: '15px',
      }}
    >
      <RankingBdWrapper>
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          sx={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: palette.black,
            marginBottom: 3,
            letterSpacing: '1px',
            fontFamily: theme.typography.fontFamily,
          }}
        >
          Leaderboard
        </Typography>
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
                }}
              >
                <Grid
                  item
                  xs={2}
                  sx={{
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '18px',
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
                    fontWeight: 'bold',
                    fontSize: '16px',
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
                    fontSize: '14px',
                    fontWeight: '500',
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
                    fontSize: '14px',
                    fontWeight: '500',
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
    </Card>
  );
};
