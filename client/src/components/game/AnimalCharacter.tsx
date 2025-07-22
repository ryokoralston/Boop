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
  const { playSuccess } = useAudio();

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
    rabbit: { 
      emoji: "🐰", 
      name: "うさぎ",
      sound: "ぴょんぴょん！",
      color: "#FFB6C1"
    },
    pig: { 
      emoji: "🐷", 
      name: "ぶた",
      sound: "ブーブー！",
      color: "#FFC0CB"
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

    // Play success sound effect
    playSuccess();

    // Reset animation after duration
    setTimeout(() => {
      setIsAnimating(false);
    }, 800);
  }, [onBoopClick, playSuccess, isAnimating, isBooped]);

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

        {/* Clickable nose area - larger on mobile */}
        <button
          onClick={handleNoseClick}
          className={`
            absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
            ${isMobile ? 'w-16 h-16' : 'w-8 h-8'} 
            rounded-full border-4 border-white bg-black/20
            hover:bg-yellow-400/50 active:bg-yellow-400/80
            transition-all duration-200
            ${isAnimating ? "animate-pulse bg-yellow-400/80" : ""}
            shadow-lg
          `}
          style={{
            marginTop: isMobile ? "-16px" : "-8px",
            zIndex: 10,
          }}
          aria-label={`${animal.name}の鼻をタップ`}
        >
          <span className="sr-only">鼻</span>
        </button>

        {/* Click feedback animation with animal sound */}
        {isAnimating && (
          <div className={`
            absolute ${isMobile ? 'top-0' : 'top-0'} 
            left-1/2 transform -translate-x-1/2 -translate-y-full
          `}>
            <div className={`
              animate-bounce font-bold drop-shadow-lg text-center
              ${isMobile ? 'text-4xl' : 'text-2xl'}
            `}>
              <div className="text-yellow-600 mb-1">Boop! ✨</div>
              <div className="text-blue-600 text-lg">
                {animal.sound}
              </div>
            </div>
          </div>
        )}

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
