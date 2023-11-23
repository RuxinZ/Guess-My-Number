import { useState } from 'react';
import './App.css';

function App() {
  const [target, setTarget] = useState('');
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
      <button onClick={generateRandomNum}>Generate Number</button>
      <p>Target: {target}</p>
    </>
  );
}

export default App;
