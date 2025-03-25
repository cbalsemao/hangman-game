import {
  Box,
  Grid,
  TextField,
  Typography,
  Button,
  styled,
} from '@mui/material';
import { palette, theme, TitleWrapper } from '../styles/styleguide';
import { ButtonHM } from '../utils/components';

const GameTostartContainerStyle = styled(Grid)({
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  textAlign: 'center',
  background: palette.white,
});

const HangmanTitleStyle = styled(Typography)({
  textAlign: 'center',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  fontSize: '4rem',
});

const TempNameStyle = styled(TextField)({
  width: '80%',
  maxWidth: '400px',
  backgroundColor: palette.white,
  borderRadius: 2,
});

const PrevPlayersContainerStyle = styled(Grid)({
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
});

const PrevPlayersButtonsStyle = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

type GameToStartSectionProps = {
  playersList: string[];
  handleSelectPlayer: (playerName: string) => void;
  setTemporalName: (name: string) => void;
  handleStart: () => void;
};

const GameToStartSection = ({
  playersList,
  handleSelectPlayer,
  setTemporalName,
  handleStart,
}: GameToStartSectionProps) => {
  return (
    <GameTostartContainerStyle container spacing={2}>
      <TitleWrapper>
        <HangmanTitleStyle>Hangman</HangmanTitleStyle>
      </TitleWrapper>

      <Grid
        item
        sx={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <TempNameStyle
          id="outlined-basic"
          label="Type your name"
          onChange={(e) => setTemporalName(e.target.value)}
        />
      </Grid>

      <PrevPlayersContainerStyle item>
        <Typography variant="h5" sx={{ marginTop: 3 }}>
          Previous Players
        </Typography>
        <PrevPlayersButtonsStyle>
          {playersList.map((playerName, index) => (
            <Button
              key={index}
              variant="contained"
              onClick={() => handleSelectPlayer(playerName)}
            >
              {playerName}
            </Button>
          ))}
        </PrevPlayersButtonsStyle>
      </PrevPlayersContainerStyle>

      <Grid item>
        <ButtonHM label={'Start'} onClick={handleStart} />
      </Grid>
    </GameTostartContainerStyle>
  );
};

export default GameToStartSection;
