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
      <div className="flex flex-col items-center my-10">
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRestart();
          }}
          className="flex flex-col items-center"
        >
          <fieldset className="flex flex-col">
            <legend className="text-xl font-bold">Select difficulty:</legend>
            {Object.keys(difficultyLevels).map(option => (
              <div key={option} className="">
                <input
                  className="mx-4"
                  type="radio"
                  name="current-level"
                  id={option}
                  value={option}
                  checked={option === difficulty}
                  onChange={event => {
                    setDifficulty(event.target.value);
                  }}
                  disabled={gameStatus === 'inGame'}
                />
                <label htmlFor={option} className="">
                  {option}
                </label>
              </div>
            ))}
          </fieldset>
          <button
            className="bg-slate-300 px-4 py-2 rounded my-2 border-b-2"
            type="submit"
          >
            Start Game
          </button>
        </form>

        <div className="mb-4">
          <p className="text-lg">
            {' '}
            Difficulty Level: <strong>{difficulty}</strong>
          </p>
        </div>

        <p className="mb-2">
          <strong>Note:</strong> The target is a {difficultyLevels[difficulty]}
          -digit number made of numbers from 0 to 7{' '}
          <span className="text-green-500">{target}</span>
        </p>

        <div className="flex flex-col items-center mb-4">
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
        </div>

        {gameStatus === 'won' && (
          <Banner status="happy">
            <p className="text-green-600">
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
            <p className="text-red-600">
              Sorry, the correct answer is <strong>{target}</strong>.
            </p>
          </Banner>
        )}
        {gameStatus === 'error' && <p> Error generating game!</p>}
        {gameStatus !== 'toStart' && (
          <NewGameBtn handleRestart={handleRestart} gameStatus={gameStatus} />
        )}
      </div>
    </>
  );
}

export default Game;
