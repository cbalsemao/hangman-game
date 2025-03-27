import { styled, Typography } from '@mui/material';
import { RankingBoard, ReturnMenuButton } from '../components/Components';
import { GameEndWrapper } from '../components/StyledComponents';
import { palette } from '../styles/styleguide';
import { Ranking } from '../utils/types';

const WinOrLoseMessageStyled = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: 'Papyrus, fantasy', //TODO: Solve the problem with the font. It is defined in the global styles, but doesn´t work here when using theme.breakpoints
  color: palette.white,
  fontSize: '2rem',
  textAlign: 'center',
  [theme.breakpoints.down('md')]: {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '1.2rem',
  },
  [theme.breakpoints.down('xs')]: {
    fontSize: '1rem',
  },
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
        <WinOrLoseMessageStyled>
          Congratulations! You Won! The movie was: {secretWord.toUpperCase()}
        </WinOrLoseMessageStyled>
      ) : (
        <WinOrLoseMessageStyled>
          Game Over! The movie was: {secretWord.toUpperCase()}
        </WinOrLoseMessageStyled>
      )}

      <RankingBoard rankings={rankings} />
      <ReturnMenuButton handleStart={handleRestart} />
    </GameEndWrapper>
  );
};
