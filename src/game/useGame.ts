import { useCallback, useEffect, useRef, useState } from 'react';

import { BalloonGame } from './game';
import { createInitialBoard } from './initialize';
import { GameStatus } from './types';

export const useGame = (n: number) => {
  const gameRef = useRef<BalloonGame | null>(null);

  const [board, setBoard] = useState<boolean[][]>([]);
  const [status, setStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [error, setError] = useState<string>('');

  const initializeGame = useCallback(() => {
    gameRef.current = new BalloonGame(createInitialBoard(n));

    setBoard(gameRef.current.getBoard());
    setStatus(GameStatus.PLAYING);
    setError('');
  }, [n]);

  const handleClickBalloon = useCallback(
    (rowIndex: number, colIndex: number): void => {
      if (!gameRef.current) return;

      gameRef.current.clickBalloon(rowIndex, colIndex);

      setBoard(gameRef.current.getBoard());
      setStatus(gameRef.current.status);
      setError(gameRef.current.error);
    },
    [],
  );

  useEffect(() => {
    initializeGame();
  }, [n, initializeGame]);

  return {
    board,
    status,
    error,
    handleClickBalloon,
    handleClickReset: initializeGame,
  };
};
