export type AnimalType = "dog" | "cat" | "lion" | "pig" | "cow";

export interface AnimalPosition {
  type: AnimalType;
  x: number;
  y: number;
  id: string;
}

export interface GameState {
  phase: "ready" | "playing" | "ended";
  score: number;
  timeLeft?: number;
}
