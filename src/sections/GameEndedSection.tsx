import { styled, Typography } from '@mui/material';
import { RankingBoard, ReturnMenuButton } from '../components/Components';
import { GameEndWrapper } from '../components/StyledComponents';
import { palette, theme } from '../styles/styleguide';
import { Ranking } from '../utils/types';

const WinOrLoseMessageStyled = styled(Typography)((props) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  color: palette.white,
}));

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
        <WinOrLoseMessageStyled variant="h4">
          Congratulations! You Won! The movie was: {secretWord.toUpperCase()}
        </WinOrLoseMessageStyled>
      ) : (
        <WinOrLoseMessageStyled variant="h4">
          Game Over! The movie was: {secretWord.toUpperCase()}
        </WinOrLoseMessageStyled>
      )}

      <RankingBoard rankings={rankings} />
      <ReturnMenuButton handleStart={handleRestart} />
    </GameEndWrapper>
  );
};
