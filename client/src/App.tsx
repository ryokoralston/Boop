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
  const { isMuted, toggleMute } = useAudio();
  const [score, setScore] = useState(0);

  // Initialize audio on first user interaction
  const [audioInitialized, setAudioInitialized] = useState(false);

  const handleStartGame = () => {
    if (!audioInitialized) {
      setAudioInitialized(true);
    }
    start();
  };

  const handleRestartGame = () => {
    setScore(0);
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
          <Button
            onClick={toggleMute}
            variant="outline"
            size="sm"
            className="bg-white/90"
          >
            {isMuted ? "🔇" : "🔊"}
          </Button>
          
          {phase === "playing" && (
            <Button
              onClick={handleRestartGame}
              variant="outline"
              size="sm"
              className="bg-white/90"
            >
              リスタート
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
                動物の鼻をタップしよう！
              </h2>
              <p className="text-base md:text-lg text-gray-600">
                可愛い動物たちの鼻をタップして、鳴き声を聞いてみよう
              </p>
            </div>
            
            <div className="flex justify-center gap-2 md:gap-4 text-3xl md:text-4xl">
              🐶 🐱 🦁 🐷 🐮
            </div>
            
            <Button
              onClick={handleStartGame}
              size="lg"
              className="text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 bg-green-500 hover:bg-green-600 text-white w-full md:w-auto"
            >
              ゲームスタート！
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
                ゲーム終了！
              </h2>
              <p className="text-lg md:text-xl text-gray-600">
                スコア: {score} 回タップ
              </p>
            </div>
            
            <Button
              onClick={handleRestartGame}
              size="lg"
              className="text-lg md:text-xl px-6 md:px-8 py-3 md:py-4 bg-blue-500 hover:bg-blue-600 text-white w-full md:w-auto"
            >
              もう一度プレイ
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
