"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

const games = [
  { id: "prompt-builder", name: "Prompt Builder", icon: "🏗️", color: "from-blue-500 to-purple-500" },
  { id: "match-maker", name: "Mix & Match", icon: "🔗", color: "from-green-500 to-emerald-500" },
  { id: "crossword", name: "AI Crossword", icon: "🧩", color: "from-orange-500 to-red-500" },
  { id: "token-buster", name: "Token Buster", icon: "💎", color: "from-purple-500 to-pink-500" },
];

function LeaderboardTable({ gameId, gameName, gameIcon, gameColor }: { 
  gameId: string; 
  gameName: string; 
  gameIcon: string; 
  gameColor: string;
}) {
  const { data, error } = useSWR(`/api/scores/${gameId}?top=10`, fetcher);
  
  if (error) return <div className="text-red-500">Failed to load scores</div>;
  if (!data) return <div className="text-gray-500">Loading...</div>;

  const scores = data.scores || [];

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <div className={`bg-gradient-to-r ${gameColor} p-6 text-white`}>
        <div className="flex items-center gap-3">
          <span className="text-3xl">{gameIcon}</span>
          <div>
            <h3 className="text-xl font-bold">{gameName}</h3>
            <p className="text-white/80">Top 10 Players</p>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        {scores.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <div className="text-4xl mb-2">🏆</div>
            <div className="font-medium">No scores yet</div>
            <div className="text-sm">Be the first to play and set a record!</div>
          </div>
        ) : (
          <div className="space-y-3">
            {scores.map((score: any, index: number) => (
              <div 
                key={score.id}
                className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                  index === 0 ? 'bg-yellow-50 border border-yellow-200' :
                  index === 1 ? 'bg-gray-50 border border-gray-200' :
                  index === 2 ? 'bg-orange-50 border border-orange-200' :
                  'hover:bg-gray-50'
                }`}
              >
                {/* Rank */}
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  index === 0 ? 'bg-yellow-500 text-white' :
                  index === 1 ? 'bg-gray-400 text-white' :
                  index === 2 ? 'bg-orange-500 text-white' :
                  'bg-gray-200 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                
                {/* Player Info */}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">
                    {score.name || "Anonymous"}
                  </div>
                  <div className="text-sm text-gray-500">
                    {score.createdAt && new Date(score.createdAt).toLocaleDateString()}
                  </div>
                </div>
                
                {/* Score */}
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    {score.score}
                  </div>
                  {score.timeMs && (
                    <div className="text-sm text-gray-500">
                      {(score.timeMs / 1000).toFixed(2)}s
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function LeaderboardPage() {
  const [selectedGame, setSelectedGame] = useState("prompt-builder");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">🏆 Leaderboards</h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Compete with other learners and see who's mastering AI concepts the fastest!
        </p>
      </div>

      {/* Game Selector */}
      <div className="flex flex-wrap justify-center gap-3">
        {games.map((game) => (
          <button
            key={game.id}
            onClick={() => setSelectedGame(game.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedGame === game.id
                ? 'bg-blue-100 text-blue-700 border-2 border-blue-200'
                : 'bg-white text-gray-600 border-2 border-gray-200 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            <span className="text-lg">{game.icon}</span>
            {game.name}
          </button>
        ))}
      </div>

      {/* Selected Game Leaderboard */}
      {(() => {
        const game = games.find(g => g.id === selectedGame);
        if (!game) return null;
        
        return (
          <LeaderboardTable
            gameId={game.id}
            gameName={game.name}
            gameIcon={game.icon}
            gameColor={game.color}
          />
        );
      })()}

      {/* Global Stats */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border">
        <h2 className="text-2xl font-bold text-center mb-6">Global Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">1,247</div>
            <div className="text-sm text-gray-600">Total Players</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">5,892</div>
            <div className="text-sm text-gray-600">Games Played</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">89,450</div>
            <div className="text-sm text-gray-600">Total XP Earned</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-orange-600">12</div>
            <div className="text-sm text-gray-600">Day Streak Record</div>
          </div>
        </div>
      </div>

      {/* How to Improve */}
      <div className="bg-white rounded-2xl p-6 border">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span> Tips to Improve Your Score
        </h3>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 bg-blue-50 rounded-lg">
            <div className="font-semibold text-blue-800 mb-2">Practice Regularly</div>
            <div className="text-sm text-blue-700">
              Consistent practice helps you build muscle memory and improve your speed.
            </div>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <div className="font-semibold text-green-800 mb-2">Learn from Mistakes</div>
            <div className="text-sm text-green-700">
              Review incorrect answers to understand concepts better and avoid repeating errors.
            </div>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg">
            <div className="font-semibold text-purple-800 mb-2">Focus on Accuracy</div>
            <div className="text-sm text-purple-700">
              Speed comes with practice, but accuracy should always be your priority.
            </div>
          </div>
          <div className="p-4 bg-orange-50 rounded-lg">
            <div className="font-semibold text-orange-800 mb-2">Challenge Yourself</div>
            <div className="text-sm text-orange-700">
              Try harder difficulty levels to push your limits and learn more advanced concepts.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
