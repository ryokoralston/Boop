import React, { useState, useCallback } from "react";
import { AnimalType } from "../../types/game";
import { useAudio } from "../../lib/stores/useAudio";

interface AnimalCharacterProps {
  type: AnimalType;
  x: number;
  y: number;
  onBoopClick: () => void;
}

export function AnimalCharacter({ type, x, y, onBoopClick }: AnimalCharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { playSuccess } = useAudio();

  // Animal data mapping
  const animalData = {
    dog: { emoji: "🐶", sound: "/sounds/dog.mp3", color: "#D2691E" },
    cat: { emoji: "🐱", sound: "/sounds/cat.mp3", color: "#FF6347" },
    rabbit: { emoji: "🐰", sound: "/sounds/rabbit.mp3", color: "#FFB6C1" },
    pig: { emoji: "🐷", sound: "/sounds/pig.mp3", color: "#FFC0CB" },
    cow: { emoji: "🐮", sound: "/sounds/cow.mp3", color: "#F5DEB3" },
  };

  const animal = animalData[type];

  const handleNoseClick = useCallback(async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    onBoopClick();

    // Play animal sound
    try {
      const audio = new Audio(animal.sound);
      audio.volume = 0.5;
      await audio.play();
    } catch (error) {
      console.log("Animal sound play prevented:", error);
      // Fallback to success sound
      playSuccess();
    }

    // Reset animation after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [animal.sound, onBoopClick, playSuccess, isAnimating]);

  return (
    <div
      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer select-none"
      style={{
        left: `${Math.min(Math.max(x, 80), window.innerWidth - 80)}px`,
        top: `${Math.min(Math.max(y, 80), window.innerHeight - 200)}px`,
      }}
    >
      {/* Character body */}
      <div className="relative">
        {/* Main character */}
        <div
          className={`
            relative text-8xl transition-all duration-300
            ${isAnimating ? "scale-125 animate-bounce" : "hover:scale-110"}
          `}
          style={{
            filter: isAnimating ? "drop-shadow(0 0 20px rgba(255,255,0,0.8))" : "",
          }}
        >
          {animal.emoji}
        </div>

        {/* Clickable nose area */}
        <button
          onClick={handleNoseClick}
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            w-8 h-8 rounded-full border-2 border-white bg-black/20
            hover:bg-yellow-400/50 active:bg-yellow-400/80
            transition-all duration-200
            ${isAnimating ? "animate-pulse bg-yellow-400/80" : ""}
          `}
          style={{
            marginTop: "-8px", // Adjust for nose position
            zIndex: 10,
          }}
          aria-label={`${type}の鼻をクリック`}
        >
          <span className="sr-only">鼻</span>
        </button>

        {/* Click feedback animation */}
        {isAnimating && (
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full">
            <div className="animate-bounce text-2xl font-bold text-yellow-600 drop-shadow-lg">
              Boop! ✨
            </div>
          </div>
        )}

        {/* Animal name label */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-sm font-medium text-gray-700 shadow-sm">
            {type === "dog" && "いぬ"}
            {type === "cat" && "ねこ"}
            {type === "rabbit" && "うさぎ"}
            {type === "pig" && "ぶた"}
            {type === "cow" && "うし"}
          </div>
        </div>
      </div>
    </div>
  );
}
