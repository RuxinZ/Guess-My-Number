import { useState } from 'react';

import Guess from './Guess';
import Banner from './Banner';
import NewGameBtn from './NewGameBtn';

function Game() {
  const [target, setTarget] = useState('');
  const [numOfGuesses, setNumOfGuesses] = useState(10);
  const [gameStatus, setGameStatus] = useState('toStart'); // "toStart", "inGame", "won", "lost", "loading", "error"
  const [record, setRecord] = useState('');
  const [tentativeGuess, setTentativeGuess] = useState('');
  const [difficulty, setDifficulty] = useState('Normal'); // "Beginner", "Normal", "Expert"

  const difficultyLevels = { Beginner: 3, Normal: 4, Expert: 5 };

  const handleRestart = async () => {
    setGameStatus('loading');
    const URL = `/api/${difficultyLevels[difficulty]}`;
    try {
      const res = await fetch(URL);
      const json = await res.json();
      setGameStatus('inGame');
      setTarget(json);
      setNumOfGuesses(10);
      setRecord('');
      setTentativeGuess('');
    } catch (err) {
      setGameStatus('error');
    }
  };

  return (
    <>
      {gameStatus === 'toStart' && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRestart();
          }}
        >
          <fieldset>
            <legend>Select difficulty:</legend>
            {Object.keys(difficultyLevels).map(option => (
              <div key={option}>
                <input
                  type="radio"
                  name="current-level"
                  id={option}
                  value={option}
                  checked={option === difficulty}
                  onChange={event => {
                    setDifficulty(event.target.value);
                  }}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </fieldset>
          <button>Start Game</button>
        </form>
      )}
      <div>
        <p>
          {' '}
          Difficulty Level: <strong>{difficulty}</strong>
        </p>
      </div>

      <p>Target: {target}</p>
      {gameStatus !== 'toStart' && (
        <p>
          {' '}
          You have <strong>{numOfGuesses}</strong>{' '}
          {numOfGuesses > 1 ? 'guesses' : 'guess'} left
        </p>
      )}

      <Guess
        setNumOfGuesses={setNumOfGuesses}
        target={target}
        numOfGuesses={numOfGuesses}
        record={record}
        setRecord={setRecord}
        tentativeGuess={tentativeGuess}
        setTentativeGuess={setTentativeGuess}
        gameStatus={gameStatus}
        setGameStatus={setGameStatus}
        digits={difficultyLevels[difficulty]}
      />
      {gameStatus === 'won' && (
        <Banner status="happy">
          <p>
            <strong>Congratulations!</strong> You got it in{' '}
            <strong>
              {10 - numOfGuesses === 1
                ? '1 guess'
                : `${10 - numOfGuesses} guesses`}
            </strong>
            .
          </p>
        </Banner>
      )}
      {gameStatus === 'lost' && (
        <Banner status="sad" answer={target}>
          <p>
            Sorry, the correct answer is <strong>{target}</strong>.
          </p>
        </Banner>
      )}
      {gameStatus === 'error' && <p> Error generating game!</p>}
      <NewGameBtn handleRestart={handleRestart} gameStatus={gameStatus} />
    </>
  );
}

export default Game;
