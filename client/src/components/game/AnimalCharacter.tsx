import React, { useState, useCallback } from "react";
import { AnimalType } from "../../types/game";
import { useAudio } from "../../lib/stores/useAudio";

interface AnimalCharacterProps {
  type: AnimalType;
  x: number;
  y: number;
  onBoopClick: () => void;
  isMobile?: boolean;
  isBooped?: boolean;
}

export function AnimalCharacter({ type, x, y, onBoopClick, isMobile = false, isBooped = false }: AnimalCharacterProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const { playSuccess, isMuted } = useAudio();

  // Animal data mapping with Japanese names and sounds
  const animalData = {
    dog: { 
      emoji: "🐶", 
      name: "いぬ",
      sound: "わんわん！",
      color: "#D2691E"
    },
    cat: { 
      emoji: "🐱", 
      name: "ねこ",
      sound: "にゃーん！",
      color: "#FF6347"
    },
    lion: { 
      emoji: "🦁", 
      name: "らいおん",
      sound: "ガオー！",
      color: "#DAA520"
    },

    cow: { 
      emoji: "🐮", 
      name: "うし",
      sound: "モーモー！",
      color: "#F5DEB3"
    },
  };

  const animal = animalData[type];

  const handleNoseClick = useCallback(async () => {
    if (isAnimating || isBooped) return; // Don't allow clicking if already booped

    setIsAnimating(true);
    onBoopClick();

    // Play animal-specific sounds
    if (!isMuted) {
      if (type === 'dog') {
        try {
          const audio = new Audio('/sounds/dog.mp3');
          audio.volume = 0.7;
          await audio.play();
        } catch (error) {
          console.log("Dog sound play prevented:", error);
          playSuccess();
        }
      } else if (type === 'cow') {
        try {
          const audio = new Audio('/sounds/cow.mp3');
          audio.volume = 0.7;
          await audio.play();
        } catch (error) {
          console.log("Cow sound play prevented:", error);
          playSuccess();
        }
      } else if (type === 'cat') {
        try {
          const audio = new Audio('/sounds/cat.mp3');
          audio.volume = 0.7;
          await audio.play();
        } catch (error) {
          console.log("Cat sound play prevented:", error);
          playSuccess();
        }

      } else if (type === 'lion') {
        try {
          const audio = new Audio('/sounds/lion.mp3');
          audio.volume = 0.7;
          await audio.play();
        } catch (error) {
          console.log("Lion sound play prevented:", error);
          playSuccess();
        }
      } else {
        // Play success sound effect for other animals
        playSuccess();
      }
    } else {
      console.log(`${type} sound skipped (muted)`);
    }

    // Reset animation after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [onBoopClick, playSuccess, isAnimating, isBooped, type]);

  // Position styles based on mobile or desktop
  const positionStyle = isMobile ? {
    position: 'relative' as const,
  } : {
    position: 'absolute' as const,
    left: `${Math.min(Math.max(x, 80), window.innerWidth - 80)}px`,
    top: `${Math.min(Math.max(y, 80), window.innerHeight - 200)}px`,
  };

  return (
    <div
      className={`
        ${isMobile ? 'relative' : 'absolute transform -translate-x-1/2 -translate-y-1/2'} 
        cursor-pointer select-none flex flex-col items-center
      `}
      style={positionStyle}
    >
      {/* Character body */}
      <div className="relative flex flex-col items-center">
        {/* Main character - larger on mobile */}
        <div
          className={`
            relative transition-all duration-300
            ${isMobile ? 'text-[12rem] md:text-[10rem]' : 'text-8xl'}
            ${isAnimating ? "scale-125 animate-bounce" : "hover:scale-110"}
            ${isBooped ? "opacity-60 grayscale" : ""}
          `}
          style={{
            filter: isAnimating 
              ? "drop-shadow(0 0 30px rgba(255,255,0,0.8))" 
              : isBooped 
                ? "drop-shadow(0 0 15px rgba(34,197,94,0.6))"
                : "",
          }}
        >
          {animal.emoji}
          {isBooped && (
            <div className="absolute -top-4 -right-4 text-4xl animate-pulse">
              ✅
            </div>
          )}
        </div>

        {/* Invisible clickable area covering the entire animal */}
        <button
          onClick={handleNoseClick}
          className="absolute inset-0 w-full h-full bg-transparent cursor-pointer"
          style={{ zIndex: 10 }}
          aria-label={`${animal.name}をタップ`}
        >
          <span className="sr-only">{animal.name}</span>
        </button>



        {/* Animal name label - larger on mobile */}
        <div className={`
          ${isMobile ? 'mt-6' : 'absolute -bottom-8'} 
          left-1/2 transform -translate-x-1/2
        `}>
          <div className={`
            bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 
            font-medium text-gray-700 shadow-lg text-center
            ${isMobile ? 'text-xl' : 'text-sm'}
          `}>
            {animal.name}
          </div>
        </div>
      </div>
    </div>
  );
}
