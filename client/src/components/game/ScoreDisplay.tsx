import React from "react";

interface ScoreDisplayProps {
  score: number;
}

export function ScoreDisplay({ score }: ScoreDisplayProps) {
  return (
    <div className="flex items-center gap-2 bg-yellow-100 border border-yellow-300 rounded-full px-4 py-2 shadow-sm">
      <span className="text-xl">🏆</span>
      <div className="text-sm font-medium text-gray-700">
        Score: <span className="font-bold text-lg text-yellow-600">{score}</span>
      </div>
    </div>
  );
}
