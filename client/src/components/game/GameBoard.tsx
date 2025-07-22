import React, { useState, useMemo, useEffect } from "react";
import { AnimalCharacter } from "./AnimalCharacter";
import { AnimalType } from "../../types/game";
import { Button } from "../ui/button";
import { useGame } from "../../lib/stores/useGame";

interface GameBoardProps {
  onAnimalClick: () => void;
}

export function GameBoard({ onAnimalClick }: GameBoardProps) {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);
  const [boopedAnimals, setBoopedAnimals] = useState<Set<number>>(new Set());
  const [showCelebration, setShowCelebration] = useState(false);
  const { end } = useGame();

  // Define all animals
  const animals: AnimalType[] = useMemo(() => ["dog", "cat", "rabbit", "pig", "cow"], []);
  
  const currentAnimal = animals[currentAnimalIndex];

  // Check if all animals have been booped
  useEffect(() => {
    if (boopedAnimals.size === animals.length) {
      setShowCelebration(true);
      // Auto end game after celebration
      setTimeout(() => {
        end();
      }, 3000);
    }
  }, [boopedAnimals, animals.length, end]);

  const handleNextAnimal = () => {
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };

  const handlePrevAnimal = () => {
    setCurrentAnimalIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

  const handleAnimalBoop = () => {
    // Mark current animal as booped
    setBoopedAnimals(prev => new Set(Array.from(prev).concat([currentAnimalIndex])));
    onAnimalClick();
    
    // Auto advance to next unbooped animal if any remain
    if (boopedAnimals.size < animals.length - 1) {
      setTimeout(() => {
        let nextIndex = (currentAnimalIndex + 1) % animals.length;
        // Find next unbooped animal
        while (boopedAnimals.has(nextIndex)) {
          nextIndex = (nextIndex + 1) % animals.length;
        }
        setCurrentAnimalIndex(nextIndex);
      }, 1000);
    }
  };

  if (showCelebration) {
    return (
      <div className="relative w-full h-full min-h-[100vh] bg-gradient-to-b from-purple-400 to-pink-400 flex flex-col items-center justify-center p-4 overflow-hidden">
        {/* Celebration confetti background */}
        <div className="absolute inset-0">
          {/* Animated confetti */}
          <div className="absolute top-20 left-10 animate-bounce text-4xl">🎉</div>
          <div className="absolute top-32 right-20 animate-bounce text-4xl animation-delay-300">🎊</div>
          <div className="absolute top-16 left-1/3 animate-bounce text-4xl animation-delay-600">🎉</div>
          <div className="absolute top-28 right-1/3 animate-bounce text-4xl animation-delay-900">🎊</div>
          <div className="absolute top-12 left-20 animate-bounce text-4xl animation-delay-1200">✨</div>
          <div className="absolute top-40 right-10 animate-bounce text-4xl animation-delay-150">✨</div>
          
          <div className="absolute bottom-32 left-16 animate-bounce text-4xl animation-delay-450">🎉</div>
          <div className="absolute bottom-20 right-24 animate-bounce text-4xl animation-delay-750">🎊</div>
          <div className="absolute bottom-28 left-1/2 animate-bounce text-4xl animation-delay-1050">✨</div>
        </div>

        {/* Celebration message */}
        <div className="relative z-10 text-center space-y-6 bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl max-w-md mx-4">
          <div className="text-6xl animate-pulse">🎉</div>
          <div className="space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 animate-bounce">
              おめでとう！
            </h2>
            <p className="text-lg text-gray-600">
              全部の動物をタップしました！
            </p>
            <div className="text-4xl animate-pulse">
              🐶 🐱 🐰 🐷 🐮
            </div>
          </div>
          <div className="text-sm text-gray-500 animate-pulse">
            3秒後にメニューに戻ります...
          </div>
        </div>

        {/* More confetti */}
        <div className="absolute inset-0 opacity-60">
          <div className="absolute top-60 left-8 animate-spin text-3xl">🌟</div>
          <div className="absolute top-48 right-12 animate-spin text-3xl animation-delay-500">⭐</div>
          <div className="absolute bottom-60 left-24 animate-spin text-3xl animation-delay-1000">🌟</div>
          <div className="absolute bottom-48 right-8 animate-spin text-3xl animation-delay-700">⭐</div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[100vh] bg-gradient-to-b from-sky-300 to-green-300 flex flex-col items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Clouds */}
        <div className="absolute top-10 left-10 text-4xl md:text-6xl">☁️</div>
        <div className="absolute top-16 right-16 text-3xl md:text-4xl">☁️</div>
        <div className="absolute top-8 left-1/2 text-4xl md:text-5xl transform -translate-x-1/2">☁️</div>
        
        {/* Sun */}
        <div className="absolute top-6 right-6 text-5xl md:text-6xl">☀️</div>
        
        {/* Grass/flowers */}
        <div className="absolute bottom-20 left-10 text-2xl md:text-3xl">🌸</div>
        <div className="absolute bottom-24 right-20 text-2xl md:text-3xl">🌻</div>
        <div className="absolute bottom-16 left-1/3 text-2xl md:text-3xl">🌼</div>
      </div>

      {/* Progress indicator */}
      <div className="relative z-10 mb-4">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
          {animals.map((_, index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                boopedAnimals.has(index) 
                  ? 'bg-green-500 scale-110' 
                  : index === currentAnimalIndex 
                    ? 'bg-yellow-400 animate-pulse' 
                    : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Animal navigation */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <Button
          onClick={handlePrevAnimal}
          variant="outline"
          size="lg"
          className="bg-white/90 text-2xl px-6 py-4"
          disabled={showCelebration}
        >
          ←
        </Button>
        
        <div className="text-lg font-medium text-gray-700 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2">
          {currentAnimalIndex + 1} / {animals.length}
        </div>
        
        <Button
          onClick={handleNextAnimal}
          variant="outline"
          size="lg"
          className="bg-white/90 text-2xl px-6 py-4"
          disabled={showCelebration}
        >
          →
        </Button>
      </div>

      {/* Current animal character - centered and large for mobile */}
      <div className="relative z-10 flex-1 flex items-center justify-center min-h-[400px]">
        <AnimalCharacter
          type={currentAnimal}
          x={0} // Centered
          y={0} // Centered
          onBoopClick={handleAnimalBoop}
          isMobile={true}
          isBooped={boopedAnimals.has(currentAnimalIndex)}
        />
      </div>

      {/* Instructions */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg max-w-sm mx-4 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">
          {boopedAnimals.has(currentAnimalIndex) ? "タップ済み！ ✅" : "動物の鼻をタップしてね！ 👆"}
        </p>
        <p className="text-sm text-gray-500">
          {boopedAnimals.size} / {animals.length} 匹タップ完了
        </p>
      </div>
    </div>
  );
}
