import React from 'react';

function NewGameBtn({ handleRestart, gameStatus }) {
  return (
    <button
      className={`btn ${gameStatus === 'inGame' ? 'visually-hidden' : ''}`}
      onClick={handleRestart}
      disabled={gameStatus === 'loading'}
    >
      {gameStatus === 'loading' ? 'Generating Game' : 'New Game'}
    </button>
  );
}

export default NewGameBtn;
