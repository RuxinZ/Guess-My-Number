import React from 'react';

function NewGameBtn({ handleRestart, gameStatus }) {
  return (
    <button
      className={
        `btn ${gameStatus === 'inGame' ? 'visually-hidden ' : ' '}` +
        'bg-slate-300 px-4 py-2 rounded my-2 border-b-2'
      }
      onClick={handleRestart}
      disabled={gameStatus === 'loading'}
    >
      {gameStatus === 'loading' ? 'Generating Game' : 'New Game'}
    </button>
  );
}

export default NewGameBtn;
