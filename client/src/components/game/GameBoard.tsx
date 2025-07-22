import React, { useState, useMemo } from "react";
import { AnimalCharacter } from "./AnimalCharacter";
import { AnimalType } from "../../types/game";
import { Button } from "../ui/button";

interface GameBoardProps {
  onAnimalClick: () => void;
}

export function GameBoard({ onAnimalClick }: GameBoardProps) {
  const [currentAnimalIndex, setCurrentAnimalIndex] = useState(0);

  // Define all animals
  const animals: AnimalType[] = useMemo(() => ["dog", "cat", "rabbit", "pig", "cow"], []);
  
  const currentAnimal = animals[currentAnimalIndex];

  const handleNextAnimal = () => {
    setCurrentAnimalIndex((prev) => (prev + 1) % animals.length);
  };

  const handlePrevAnimal = () => {
    setCurrentAnimalIndex((prev) => (prev - 1 + animals.length) % animals.length);
  };

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

      {/* Animal navigation */}
      <div className="relative z-10 flex items-center gap-4 mb-8">
        <Button
          onClick={handlePrevAnimal}
          variant="outline"
          size="lg"
          className="bg-white/90 text-2xl px-6 py-4"
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
          onBoopClick={onAnimalClick}
          isMobile={true}
        />
      </div>

      {/* Instructions */}
      <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg max-w-sm mx-4 text-center">
        <p className="text-lg font-medium text-gray-700 mb-2">
          動物の鼻をタップしてね！ 👆
        </p>
        <p className="text-sm text-gray-500">
          左右のボタンで動物を切り替えできます
        </p>
      </div>
    </div>
  );
}
