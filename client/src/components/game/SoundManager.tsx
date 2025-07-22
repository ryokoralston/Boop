import React, { useEffect } from "react";
import { useAudio } from "../../lib/stores/useAudio";

export function SoundManager() {
  const { setBackgroundMusic, setHitSound, setSuccessSound } = useAudio();

  useEffect(() => {
    // Initialize audio elements
    const backgroundMusic = new Audio("/sounds/background.mp3");
    const hitSound = new Audio("/sounds/hit.mp3");
    const successSound = new Audio("/sounds/success.mp3");

    // Configure background music
    backgroundMusic.loop = true;
    backgroundMusic.volume = 0.3;

    // Configure sound effects
    hitSound.volume = 0.5;
    successSound.volume = 0.4;

    // Set audio elements in store
    setBackgroundMusic(backgroundMusic);
    setHitSound(hitSound);
    setSuccessSound(successSound);

    // Start background music
    backgroundMusic.play().catch(error => {
      console.log("Background music play prevented:", error);
    });

    // Cleanup function
    return () => {
      backgroundMusic.pause();
      backgroundMusic.currentTime = 0;
    };
  }, [setBackgroundMusic, setHitSound, setSuccessSound]);

  return null; // This component doesn't render anything
}
