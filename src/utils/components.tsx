import { Button, Card, Grid, Typography } from '@mui/material';
import { ButtonWrapper } from '../styles/styleguide';
import { Ranking } from './types';
import { RankingBdWrapper, RankingList } from '../styles/styleguide';
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
        sx={{ color: 'black', backgroundColor: 'white' }}
      >
        {label}
      </Button>
    </ButtonWrapper>
  );
};

export const RankingBoard = ({ rankings }: { rankings: Ranking[] }) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 200,
        position: 'absolute',
        right: 100,
      }}
    >
      <RankingBdWrapper>
        <Typography gutterBottom variant="h5" component="div">
          Ranking
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <RankingList>
            <Grid container direction="column">
              {rankings.map((player, index) => (
                <Grid container direction="row" key={player.name + '' + index}>
                  <Grid item xs={3}>
                    {player.name}
                  </Grid>
                  <Grid item xs={3}>
                    {player.score}
                  </Grid>
                  <Grid item xs={3}>
                    {player.time}
                  </Grid>
                  <Grid item xs={3}>
                    {player.movie}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </RankingList>
        </Typography>
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
        overflow: 'hidden',
        backgroundColor: 'lightblue',
      }}
    >
      {children}
    </Grid>
  );
};

export const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return <Grid container>{children}</Grid>;
};
