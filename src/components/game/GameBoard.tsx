import { GameCell } from '@/components/game/GameCell';
import { GameStatus } from '@/game/types';

interface GameBoardProps {
  board: boolean[][];
  status: GameStatus;
  onClickBalloon: (row: number, col: number) => void;
}

export const GameBoard = ({
  board,
  status,
  onClickBalloon,
}: GameBoardProps) => {
  return (
    <div className="min-w-[800px] min-h-[800px] p-10 flex flex-col items-center justify-center">
      {board.map((row, rowIndex) => (
        <div
          className={`flex ${status !== GameStatus.PLAYING ? 'cursor-not-allowed blur-sm' : ''}`}
          key={rowIndex}
        >
          {row.map((cell, colIndex) => (
            <GameCell
              key={`${rowIndex},${colIndex}`}
              isActive={cell}
              onClick={() => onClickBalloon(rowIndex, colIndex)}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
