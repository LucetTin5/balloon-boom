import { memo } from 'react';

interface GameCellProps {
  isActive: boolean;
  rowIndex: number;
  colIndex: number;
  onClick: (row: number, col: number) => void;
}

export const GameCell = memo(
  ({ isActive, rowIndex, colIndex, onClick }: GameCellProps) => (
    <div
      className={`min-w-[80px] min-h-[80px] border aspect-square w-full ${
        isActive
          ? 'bg-teal-700 bg-[url("/balloon.png")] bg-center bg-no-repeat bg-clip-content'
          : ''
      }`}
      onClick={() => onClick(rowIndex, colIndex)}
    />
  ),
);
