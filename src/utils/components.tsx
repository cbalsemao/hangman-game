import { Button, Card, Grid, Typography } from '@mui/material';
import { ButtonWrapper, palette, theme } from '../styles/styleguide';
import { Ranking } from './types';
import { RankingBdWrapper, RankingList } from '../styles/styleguide';
import { ReactNode } from 'react';
type ButtonHMProps = {
  title?: string;
  label: string;
  onClick: () => void;
};

export const ButtonHM = ({ label, onClick }: ButtonHMProps) => {
  return (
    <Button
      onClick={onClick}
      variant="contained"
      sx={{
        color: palette.black,
        backgroundColor: palette.white,
        fontFamily: theme.typography.fontFamily,
        fontWeight: 'bold',
        fontSize: '18px',
        padding: '10px 20px',
        borderRadius: '25px',
        boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.3)',
        transition:
          'transform 0.3s ease, background-color 0.3s ease, box-shadow 0.3s ease',

        '&:hover': {
          backgroundColor: palette.black,
          transform: 'scale(1.1)',
          color: palette.white,
          boxShadow: '0px 6px 20px rgba(0, 0, 0, 0.5)',
        },
      }}
    >
      {label}
    </Button>
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

export const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Grid
      container
      sx={{
        top: 0,
        left: 0,
        height: '100%',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        backgroundImage: 'url(./background-img.jpg)',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        margin: 0,
        padding: 0,
      }}
    >
      {children}
    </Grid>
  );
};

export const ReturnMenuButton = ({
  handleStart,
}: {
  handleStart: () => void;
}) => {
  return (
    <ButtonWrapper>
      <ButtonHM label="Return to Menu" onClick={handleStart} />
    </ButtonWrapper>
  );
};
