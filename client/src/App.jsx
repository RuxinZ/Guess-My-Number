import { useState } from 'react';
import './App.css';

import Guess from './components/Guess';

function App() {
  const [target, setTarget] = useState('');
  const [numOfGuesses, setNumOfGuesses] = useState(10);

  const updateNumOfGuesses = () => {
    if (numOfGuesses == 1) console.log('You lost!');
    setNumOfGuesses(numOfGuesses - 1);
  };

  const generateRandomNum = async () => {
    try {
      const res = await fetch('api');
      setTarget(await res.json());
    } catch (err) {
      console.log(`Error generating number: ${err}`);
    }
  };
  return (
    <>
      <button onClick={generateRandomNum}>Start Game</button>
      <p>Target: {target}</p>
      <p>
        {' '}
        You have <strong>{numOfGuesses}</strong>{' '}
        {numOfGuesses > 1 ? 'guesses' : 'guess'} left
      </p>
      <Guess
        updateNumOfGuesses={updateNumOfGuesses}
        target={target}
        numOfGuesses={numOfGuesses}
      />
    </>
  );
}

export default App;
