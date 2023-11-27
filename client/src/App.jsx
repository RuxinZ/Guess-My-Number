import { useState } from 'react';
import './App.css';

import Game from './components/Game';

function App() {
  const [loginStatus, SetLoginStatus] = useState('loggedIn'); // 'login', 'signUp', 'loggedIn'
  return <>{loginStatus === 'loggedIn' && <Game />}</>;
}

export default App;
