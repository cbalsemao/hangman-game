import { Button, Card, Grid, Typography } from '@mui/material';
import { ButtonWrapper, palette, theme } from '../styles/styleguide';
import { Ranking } from './types';
import { RankingBdWrapper, RankingList } from '../styles/styleguide';
import { useEffect, useState } from 'react';
type ButtonHMProps = {
  title?: string;
  label: string;
  onClick: () => void;
};

export const ButtonHM = ({ title, label, onClick }: ButtonHMProps) => {
  return (
    <ButtonWrapper>
      <p>{title}</p>
      <Button
        onClick={onClick}
        variant="contained"
        sx={{
          color: 'black',
          backgroundColor: palette.darkWhite,
          fontFamily: theme.typography.fontFamily,
          fontWeight: 'bold',
          fontSize: '20px',
          transition: 'transform 0.3s ease, background-color 0.3s ease',

          '&:hover': {
            backgroundColor: palette.black,
            transform: 'scale(1.1)',
            color: palette.white,
          },
        }}
      >
        {label}
      </Button>
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

export const AppWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',

        backgroundColor: palette.black,
        paddingRight: { xs: 2, sm: 3, md: 4, lg: 20 },
        paddingLeft: { xs: 2, sm: 3, md: 4, lg: 20 },
      }}
    >
      {children}
    </Grid>
  );
};

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Grid container>{children}</Grid>;
};
