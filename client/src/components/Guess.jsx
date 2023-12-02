// import { useState } from 'react';
import { newRecord } from '../helper';
function Guess({
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
        <label htmlFor="guess-input">Enter a guess:</label>
        <input
          className="w-60 m-4 border-b-2 p-2 rounded"
          id="guess-input"
          type="text"
          pattern={`^[0-7]{${digits}}$`} // TODO: verify input num within range
          value={tentativeGuess}
          onChange={e => handleChange(e)}
          disabled={gameStatus !== 'inGame'}
          placeholder={`Enter a ${digits}-digit number`}
          autoComplete="off"
        />
        <button
          className="bg-slate-300 px-4 py-2 rounded my-2 border-b-2 disabled:opacity-45 "
          type="submit"
          disabled={gameStatus !== 'inGame'}
        >
          Confirm
        </button>
      </form>
      <div className="mx-auto flex flex-col items-center border-2 border-slate-200  rounded-lg">
        <h3 className="text-xl font-bold my-4">Record</h3>
        <div className="w-[500px] h-[280px]  p-4">
          <div className=" mx-auto flex flex-col  ">
            {record.split('\n').map((str, i) => (
              <p className="flex" key={i}>
                {str}
              </p>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Guess;
