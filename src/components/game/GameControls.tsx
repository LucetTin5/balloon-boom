import { FormEvent, useRef } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { GameStatus } from '@/game/types';

interface GameControlsProps {
  boardWidth: number;
  status: GameStatus;
  onSubmit: (width: number) => void;
}

export const GameControls = ({
  boardWidth,
  status,
  onSubmit,
}: GameControlsProps) => {
  const boardWidthInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (boardWidthInputRef.current) {
      onSubmit(parseInt(boardWidthInputRef.current.value, 10));
    }
  };

  return (
    <TooltipProvider>
      <Tooltip
        delayDuration={0}
        open={status === GameStatus.PLAYING ? undefined : false}
      >
        <TooltipTrigger asChild>
          <form
            className="flex items-center pt-5 gap-3"
            onSubmit={handleSubmit}
          >
            <Input
              type="number"
              className={`text-lg text-gray-100 ${status === GameStatus.PLAYING ? 'cursor-not-allowed' : ''}`}
              ref={boardWidthInputRef}
              min={3}
              max={10}
              disabled={status === GameStatus.PLAYING}
              defaultValue={boardWidth}
            />
            <Button
              type="submit"
              disabled={status === GameStatus.PLAYING}
              className={`${status === GameStatus.PLAYING ? 'cursor-not-allowed' : ''}`}
            >
              Change Board Width
            </Button>
          </form>
        </TooltipTrigger>
        <TooltipContent>
          <p>
            {status === GameStatus.PLAYING
              ? "Can't change while playing"
              : 'Board size can be between 3 and 10'}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
