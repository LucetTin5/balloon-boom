import { Button } from '@/components/ui/button';
import { GameStatus } from '@/game/types';

interface GameOverlayProps {
  status: GameStatus;
  error?: string;
  onReset: () => void;
}

export const GameOverlay = ({ status, error, onReset }: GameOverlayProps) => {
  if (status === GameStatus.PLAYING) return null;

  return (
    <div className="absolute top-1/2 translate-y-[-50%] flex flex-col justify-center items-center gap-5 w-[400px] h-[300px] bg-slate-200 rounded-lg">
      {status === GameStatus.WON && (
        <div className="text-2xl text-green-500 font-bold">GAME WON!</div>
      )}
      {status === GameStatus.LOST && (
        <div className="text-2xl text-red-500 font-bold">GAME OVER!</div>
      )}
      {error && <div className="text-xl text-amber-700">{error}</div>}
      <Button
        type="button"
        className="btn font-bold tracking-widest"
        variant="destructive"
        size="lg"
        onClick={onReset}
      >
        RETRY
      </Button>
    </div>
  );
};
