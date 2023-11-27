// import History from './History';
// import { useState } from 'react';
import { newRecord, isValidInput } from '../helper';
function Guess({
  updateNumOfGuesses,
  target,
  numOfGuesses,
  record,
  setRecord,
  tentativeGuess,
  setTentativeGuess,
  gameStatus,
  setGameStatus,
  setNumOfGuesses,
}) {
  const handleChange = e => {
    const num = e.target.value;
    setTentativeGuess(num);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!isValidInput(tentativeGuess)) {
      alert('Enter a valid number!');
      return;
    }
    const [correct, result] = newRecord(tentativeGuess, target);
    setRecord(
      record + `${11 - numOfGuesses}: [${tentativeGuess}] -- ` + result
    );
    if (correct) setGameStatus('won');
    setTentativeGuess('');
    if (numOfGuesses == 1) setGameStatus('lost');
    setNumOfGuesses(numOfGuesses - 1);
  };

  return (
    <>
      <h2>This is the input area</h2>
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="guess-input">Enter:</label>
        <input
          id="guess-input"
          type="text"
          pattern="[0-9]{4}" // TODO: verify input num within range
          value={tentativeGuess}
          onChange={e => handleChange(e)}
          disabled={gameStatus !== 'inGame'}
          autoComplete="off"
        />
        <button type="submit">Confirm</button>
      </form>
      <div>
        <h3>Record</h3>
        {record.split('\n').map((str, i) => (
          <p key={i}>{str}</p>
        ))}
      </div>
    </>
  );
}

export default Guess;
