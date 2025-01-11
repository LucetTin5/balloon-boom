import { useCallback, useEffect, useRef, useState } from 'react';

import { BalloonGame } from './game';
import { createInitialBoard } from './initialize';
import { GameStatus } from './types';

export const useGame = (n: number) => {
  const gameRef = useRef<BalloonGame>(new BalloonGame(createInitialBoard(n)));

  const [board, setBoard] = useState<boolean[][]>(gameRef.current.getBoard());
  const [status, setStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [error, setError] = useState<string>('');

  const handleClickBalloon = (rowIndex: number, colIndex: number): void => {
    gameRef.current.clickBalloon(rowIndex, colIndex);

    setBoard(gameRef.current.getBoard());
    setStatus(gameRef.current.status);
    setError(gameRef.current.error);
  };

  const restart = useCallback(() => {
    gameRef.current = new BalloonGame(createInitialBoard(n));
    setBoard(gameRef.current.getBoard());
    setStatus(GameStatus.PLAYING);
    setError('');
  }, [n]);

  useEffect(() => {
    restart();
  }, [n, restart]);

  return {
    board,
    status,
    error,
    handleClickBalloon,
    handleClickReset: restart,
  };
};
