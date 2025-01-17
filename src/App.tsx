import { useState } from 'react';

import { GameBoard } from '@/components/game/GameBoard';
import { GameControls } from '@/components/game/GameControls';
import { GameOverlay } from '@/components/game/GameOverlay';
import { useGame } from '@/game/useGame';

const App = () => {
  const [boardWidth, setBoardWidth] = useState(5);
  const { board, status, error, handleClickBalloon, handleClickReset } =
    useGame(boardWidth);

  return (
    <main className="w-full min-h-screen bg-slate-700">
      <div className="w-full h-screen flex flex-col items-center justify-center">
        <h1 className="text-4xl text-center text-gray-100 font-extrabold">
          BALLOON BOOM!
        </h1>

        <GameControls
          boardWidth={boardWidth}
          status={status}
          onSubmit={setBoardWidth}
        />

        <div className="w-full flex flex-col items-center justify-center relative">
          <GameBoard
            board={board}
            boardWidth={boardWidth}
            status={status}
            onClickBalloon={handleClickBalloon}
          />
          <GameOverlay
            status={status}
            error={error}
            onReset={handleClickReset}
          />
        </div>
      </div>
    </main>
  );
};

export default App;
