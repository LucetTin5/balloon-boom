interface GameCellProps {
  isActive: boolean;
  onClick: () => void;
}

export const GameCell = ({ isActive, onClick }: GameCellProps) => (
  <div
    className={`min-w-[80px] min-h-[80px] border aspect-square w-full ${
      isActive ? 'bg-teal-500' : ''
    }`}
    onClick={onClick}
  />
);
