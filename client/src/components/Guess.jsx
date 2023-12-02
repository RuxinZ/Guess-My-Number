// import { useState } from 'react';
import { newRecord } from '../helper';
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
  digits,
}) {
  const handleChange = e => {
    const num = e.target.value;
    setTentativeGuess(num);
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (!tentativeGuess) {
      alert('Enter a valid number!'); //TODO: update alert message
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
      <form onSubmit={e => handleSubmit(e)}>
        <label htmlFor="guess-input">Enter:</label>
        <input
          id="guess-input"
          type="text"
          pattern={`^[0-7]{${digits}}$`} // TODO: verify input num within range
          value={tentativeGuess}
          onChange={e => handleChange(e)}
          disabled={gameStatus !== 'inGame'}
          placeholder={`Please enter a ${digits}-digit number`}
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
