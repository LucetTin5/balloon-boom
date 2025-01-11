interface GameCellProps {
  isActive: boolean;
  onClick: () => void;
}

export const GameCell = ({ isActive, onClick }: GameCellProps) => (
  <div
    className={`min-w-[80px] min-h-[80px] border aspect-square w-full ${
      isActive
        ? 'bg-teal-700 bg-[url("/balloon.png")] bg-center bg-no-repeat bg-clip-content'
        : ''
    }`}
    onClick={onClick}
  />
);
