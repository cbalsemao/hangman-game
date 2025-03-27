import { Card, Grid, Typography } from '@mui/material';
import {
  ButtonHM,
  ButtonWrapper,
  RankingBdWrapper,
  RankingList,
} from './StyledComponents';
import { palette } from '../styles/styleguide';
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
        padding: 2,
        backgroundColor: palette.darkWhite,
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        borderRadius: '10px',
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
            marginBottom: 2,
          }}
        >
          Ranking
        </Typography>
        <RankingList>
          <Grid container direction="column" spacing={1}>
            {winners.map((player, index) => (
              <Grid
                container
                direction="row"
                key={player.name + '' + index}
                sx={{
                  padding: 1,
                  backgroundColor:
                    index === 0
                      ? palette.burgundy
                      : index === 1
                      ? palette.darkWhite
                      : index === 2
                      ? palette.darkWhite
                      : index % 2 === 0
                      ? palette.darkWhite
                      : palette.white,
                  borderRadius: '5px',
                  alignItems: 'center',
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
                  xs={4}
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
                  xs={3}
                  sx={{
                    textAlign: 'center',
                    fontSize: '14px',
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
