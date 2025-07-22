import React, { useMemo } from "react";
import { AnimalCharacter } from "./AnimalCharacter";
import { AnimalType } from "../../types/game";

interface GameBoardProps {
  onAnimalClick: () => void;
}

export function GameBoard({ onAnimalClick }: GameBoardProps) {
  // Pre-calculate random positions to avoid re-renders
  const animalPositions = useMemo(() => {
    const animals: AnimalType[] = ["dog", "cat", "rabbit", "pig", "cow"];
    
    return animals.map((type, index) => {
      // Create a grid-like layout with some randomness
      const gridX = (index % 3) * 200 + 100;
      const gridY = Math.floor(index / 3) * 200 + 100;
      
      // Add some random offset for natural placement
      const randomX = gridX + (Math.random() - 0.5) * 50;
      const randomY = gridY + (Math.random() - 0.5) * 50;
      
      return {
        type,
        x: randomX,
        y: randomY,
        id: `animal-${index}`,
      };
    });
  }, []);

  return (
    <div className="relative w-full h-full min-h-[600px] bg-gradient-to-b from-sky-300 to-green-300 rounded-2xl overflow-hidden shadow-lg">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-20">
        {/* Clouds */}
        <div className="absolute top-10 left-20 text-6xl">☁️</div>
        <div className="absolute top-16 right-32 text-4xl">☁️</div>
        <div className="absolute top-8 left-1/2 text-5xl">☁️</div>
        
        {/* Sun */}
        <div className="absolute top-6 right-6 text-6xl">☀️</div>
        
        {/* Grass/flowers */}
        <div className="absolute bottom-10 left-10 text-3xl">🌸</div>
        <div className="absolute bottom-12 right-20 text-3xl">🌻</div>
        <div className="absolute bottom-8 left-1/3 text-3xl">🌼</div>
      </div>

      {/* Animal characters */}
      <div className="relative z-10 w-full h-full">
        {animalPositions.map(({ type, x, y, id }) => (
          <AnimalCharacter
            key={id}
            type={type}
            x={x}
            y={y}
            onBoopClick={onAnimalClick}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm rounded-full px-6 py-2 shadow-lg">
        <p className="text-sm font-medium text-gray-700">
          動物の鼻をクリックしてね！ 👆
        </p>
      </div>
    </div>
  );
}
