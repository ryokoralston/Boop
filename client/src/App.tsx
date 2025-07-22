import React, { useEffect, useState } from "react";
import { GameBoard } from "./components/game/GameBoard";
import { ScoreDisplay } from "./components/game/ScoreDisplay";
import { SoundManager } from "./components/game/SoundManager";
import { useGame } from "./lib/stores/useGame";
import { useAudio } from "./lib/stores/useAudio";
import { Button } from "./components/ui/button";
import "@fontsource/inter";

function App() {
  const { phase, start, restart } = useGame();
  const { } = useAudio();
  
  // Initialize score from localStorage, default to 0 if not found
  const [score, setScore] = useState(() => {
    const savedScore = localStorage.getItem('boopGameScore');
    return savedScore ? parseInt(savedScore, 10) : 0;
  });

  // Initialize audio on first user interaction
  const [audioInitialized, setAudioInitialized] = useState(false);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('boopGameScore', score.toString());
  }, [score]);

  // Reset score when user closes browser/tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.removeItem('boopGameScore');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  const handleStartGame = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
    }
    start();
  };

  const handleRestartGame = () => {
    // Don't reset score on restart - keep accumulating
    restart();
  };

  const handleAnimalClick = () => {
    setScore(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 to-green-200 flex flex-col">
      {/* Header */}
      <header className="p-4 flex justify-between items-center bg-white/80 backdrop-blur-sm">
        <div className="flex items-center gap-4">
          <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">
            🐾 Boop! 
          </h1>
          <ScoreDisplay score={score} />
        </div>
        
        <div className="flex gap-2">
          {phase === "playing" && (
            <Button
              onClick={handleRestartGame}
              variant="outline"
              size="sm"
              className="bg-white/90"
            >
              Restart
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4">
        {phase === "ready" && (
          <div className="text-center space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-md md:max-w-lg mx-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                Tap the Animals!
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                Tap the cute animals to hear their sounds
              </p>
            </div>
            
            <div className="flex justify-center gap-2 md:gap-4 text-3xl md:text-4xl">
              🐶 🐱 🦁 🐮
            </div>
            
            <Button
              onClick={handleStartGame}
              size="lg"
              className="text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 bg-green-500 hover:bg-green-600 text-white w-full md:w-auto"
            >
              Start Game!
            </Button>
          </div>
        )}

        {phase === "playing" && (
          <GameBoard onAnimalClick={handleAnimalClick} />
        )}

        {phase === "ended" && (
          <div className="text-center space-y-6 bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg max-w-md md:max-w-lg mx-4">
            <div className="space-y-2">
              <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
                Game Over!
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                Score: {score} taps
              </p>
            </div>
            
            <Button
              onClick={handleRestartGame}
              size="lg"
              className="text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto"
            >
              Play Again
            </Button>
          </div>
        )}
      </main>

      {/* Sound Manager */}
      {audioInitialized && <SoundManager />}
    </div>
  );
}

export default App;
