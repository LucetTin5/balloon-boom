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
      className={`border aspect-square ${
        isActive
          ? 'bg-teal-700 bg-[url("/balloon.png")] bg-center bg-no-repeat bg-contain'
          : ''
      }`}
      onClick={() => onClick(rowIndex, colIndex)}
    />
  ),
);
