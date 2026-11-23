import { useState, useCallback, useRef } from 'react';
import BootScreen from './components/BootScreen';
import RetroConsole from './components/RetroConsole';
import MusicPlayer from './components/MusicPlayer';
import './styles/globals.css';
import './styles/components.css';

// Session state - avoid re-doing boot screen
const SESSION_KEY = 'lwfh_booted';

function App() {
  const [screen, setScreen] = useState(() =>
    sessionStorage.getItem(SESSION_KEY) ? 'console' : 'boot'
  );
  const [musicStarted, setMusicStarted] = useState(false);
  const transitionRef = useRef(null);

  const handleBootComplete = useCallback(() => {
    sessionStorage.setItem(SESSION_KEY, '1');
    setScreen('console');
  }, []);

  const handleStart = useCallback(() => {
    if (!musicStarted) setMusicStarted(true);
  }, [musicStarted]);

  const handleQuote = useCallback(() => {
    if (!musicStarted) setMusicStarted(true);
  }, [musicStarted]);

  return (
    <>
      {/* Boot screen */}
      {screen === 'boot' && (
        <BootScreen onComplete={handleBootComplete} />
      )}

      {/* Main console — flower & quotes are rendered inside its screen */}
      {screen === 'console' && (
        <RetroConsole
          onStart={handleStart}
          onQuote={handleQuote}
        />
      )}

      {/* Persistent music player — appears after first interaction */}
      <MusicPlayer
        visible={musicStarted}
        autoStart={musicStarted}
      />

      {/* Screen transition flash */}
      <div ref={transitionRef} className="screen-transition" aria-hidden="true" />
    </>
  );
}

export default App;
