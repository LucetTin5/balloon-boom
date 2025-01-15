import { memo } from 'react';

import { GameCell } from '@/components/game/GameCell';
import { GameStatus } from '@/game/types';

interface GameBoardProps {
  board: boolean[][];
  status: GameStatus;
  onClickBalloon: (row: number, col: number) => void;
}

export const GameBoard = memo(
  ({ board, status, onClickBalloon }: GameBoardProps) => {
    return (
      <div className="w-full max-w-[800px] aspect-square p-4 sm:p-10 flex flex-col items-center justify-center">
        <div
          className={`w-full h-full grid ${status !== GameStatus.PLAYING ? 'cursor-not-allowed blur-md' : ''}`}
          style={{
            gridTemplateColumns: `repeat(${board.length}, 1fr)`,
            gridTemplateRows: `repeat(${board.length}, 1fr)`,
          }}
        >
          {board.map((row, rowIndex) =>
            row.map((cell, colIndex) => (
              <GameCell
                key={`${rowIndex},${colIndex}`}
                isActive={cell}
                rowIndex={rowIndex}
                colIndex={colIndex}
                onClick={onClickBalloon}
              />
            )),
          )}
        </div>
      </div>
    );
  },
);
