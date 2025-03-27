import { Typography } from '@mui/material';
import { RankingBoard, ReturnMenuButton } from '../components/Components';
import { GameEndWrapper } from '../components/StyledComponents';
import { palette } from '../styles/styleguide';
import { Ranking } from '../utils/types';

export const GameEndedSection = ({
  secretWord,
  rankings,
  handleRestart,
  gameStatus,
}: {
  secretWord: string;
  rankings: Ranking[];
  handleRestart: () => void;
  gameStatus: string;
}) => {
  return (
    <GameEndWrapper>
      {gameStatus === 'Win' ? (
        <Typography
          variant="h4"
          color="success"
          gutterBottom
          sx={{ color: palette.white }}
        >
          Congratulations! You Won! The movie was: {secretWord.toUpperCase()}
        </Typography>
      ) : (
        <Typography
          variant="h4"
          color="error"
          gutterBottom
          sx={{ color: palette.white }}
        >
          Game Over! The movie was: {secretWord.toUpperCase()}
        </Typography>
      )}

      <RankingBoard rankings={rankings} />
      <ReturnMenuButton handleStart={handleRestart} />
    </GameEndWrapper>
  );
};
