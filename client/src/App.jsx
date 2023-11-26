import { useState } from 'react';
import './App.css';

import Guess from './components/Guess';
import Banner from './components/Banner';
import NewGameBtn from './components/NewGameBtn';

function App() {
  const [target, setTarget] = useState('');
  const [numOfGuesses, setNumOfGuesses] = useState(10);
  const [gameStatus, setGameStatus] = useState('inGame'); // "inGame", "won", "lost", "loading", "error"
  const [record, setRecord] = useState('');
  const [tentativeGuess, setTentativeGuess] = useState('');

  const handleRestart = async () => {
    setGameStatus('loading');

    try {
      const res = await fetch('api');
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
      <button onClick={handleRestart}>Start Game</button>
      <p>Target: {target}</p>
      <p>
        {' '}
        You have <strong>{numOfGuesses}</strong>{' '}
        {numOfGuesses > 1 ? 'guesses' : 'guess'} left
      </p>
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

export default App;
