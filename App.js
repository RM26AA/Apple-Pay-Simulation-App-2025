import React, { useState } from 'react';
import SplashScreen from './pages/SplashScreen';
import HomeScreen from './pages/HomeScreen';

export default function App() {
  const [started, setStarted] = useState(false);
  const [userName, setUserName] = useState({ first: 'John', last: 'Doe' });

  return (
    !started
      ? <SplashScreen onStart={() => setStarted(true)} />
      : <HomeScreen userName={userName} />
  );
}

