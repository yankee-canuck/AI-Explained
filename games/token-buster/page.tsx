"use client";
import { useMemo, useState } from "react";

// Very rough English token estimate: characters / 4
function estimateTokens(s: string) {
  return Math.max(1, Math.round(s.replace(/\s+/g, " ").trim().length / 4));
}

// Tiny Web-Audio "ding" (no asset file)
function ding() {
  try {
    const Ctx = (window.AudioContext || (window as any).webkitAudioContext);
    const ctx = new Ctx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 880;
    gain.gain.value = 0.0001;
    osc.connect(gain); gain.connect(ctx.destination);
    osc.start();
    gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.25);
    osc.stop(ctx.currentTime + 0.3);
  } catch {}
}

const PHRASES = [
  "Explain LLMs to a 10-year-old in 2 sentences.",
  "Summarize: transformers, attention, tokens, context window.",
  "List 5 best practices for safe prompting.",
  "Write a title for an article about responsible AI.",
  "Give 3 bullets on temperature vs. top-p.",
  "Why do models hallucinate? One-sentence answer.",
  "Convert: ‘Cats are great’ → Spanish, French, Japanese.",
  "Draft a polite email asking for a deadline extension.",
  "Make an analogy that explains tokenization.",
  "Turn this into JSON with fields: title, bullets[3].",
];

export default function TokenBuster() {
  const [round, setRound] = useState(0);
  const [guess, setGuess] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const phrase = useMemo(() => PHRASES[round % PHRASES.length], [round]);
  const trueTokens = useMemo(() => estimateTokens(phrase), [phrase]);

  function check() {
    const g = Number(guess);
    if (!Number.isFinite(g)) return;
    setRevealed(true);

    const diff = Math.abs(g - trueTokens);
    // scoring: 100 if exact, 80 within 1–2, 60 within 3–5, else 0
    const base = diff === 0 ? 100 : diff <= 2 ? 80 : diff <= 5 ? 60 : 0;

    if (base > 0) {
      ding();
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }

    const bonus = base > 0 ? streak * 5 : 0; // small streak bonus
    setScore((s) => s + base + bonus);
  }

  function next() {
    setRound((r) => r + 1);
    setGuess("");
    setRevealed(false);
  }

  const roundsPlayed = round + (revealed ? 1 : 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Token Buster</h1>
          <p className="text-base text-gray-600 max-w-xl mx-auto">
            Test your understanding of AI tokenization by guessing how many tokens different prompts would use.
          </p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex items-center gap-6 text-center">
              <div>
                <div className="text-xl font-bold text-blue-600">{round + 1}</div>
                <div className="text-xs text-gray-500 font-medium">Round</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-xl font-bold text-green-600">{score}</div>
                <div className="text-xs text-gray-500 font-medium">Score</div>
              </div>
              <div className="w-px h-8 bg-gray-200"></div>
              <div>
                <div className="text-xl font-bold text-purple-600">{streak}</div>
                <div className="text-xs text-gray-500 font-medium">Streak</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Game Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Prompt */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-3 text-center">Your Challenge</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <p className="text-base text-gray-700 leading-relaxed font-medium text-center">{phrase}</p>
              </div>
            </div>

            {/* Input Section */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3 text-center">How many tokens?</h3>
              <div className="flex items-center justify-center gap-3">
                <input
                  inputMode="numeric"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ""))}
                  placeholder="Enter your guess"
                  className="w-24 rounded-lg border-2 border-gray-300 p-2 text-center text-base font-semibold focus:border-blue-500 focus:outline-none transition-colors"
                />
                {!revealed ? (
                  <button 
                    onClick={check} 
                    disabled={!guess}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button 
                    onClick={next} 
                    className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors text-sm"
                  >
                    Next Round
                  </button>
                )}
              </div>
            </div>

            {/* Results */}
            {revealed && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <div className="text-center mb-3">
                  <div className="text-lg font-bold text-blue-700 mb-1">
                    Actual tokens: {trueTokens}
                  </div>
                  <div className="text-xs text-blue-600">
                    Your guess: {guess} • Difference: {Math.abs(Number(guess) - trueTokens)}
                  </div>
                </div>
                <div className="text-xs text-blue-700 text-center">
                  <p className="mb-1">
                    <strong>Rule of thumb:</strong> Approximately 4 characters per token in English text.
                  </p>
                  <p className="text-xs text-blue-600">
                    Note: Actual tokenization varies by AI model and language.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Progress Milestone */}
        {roundsPlayed > 0 && (roundsPlayed % 10 === 0) && (
          <div className="max-w-2xl mx-auto mt-6">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-200 p-4 text-center">
              <div className="text-lg font-bold text-green-700 mb-1">🎉 Milestone Reached!</div>
              <div className="text-sm text-green-600">
                You've completed {roundsPlayed} rounds with a total score of <span className="font-bold">{score}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="text-center mt-6">
          <a 
            href="/games" 
            className="inline-flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-800 transition-colors text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </a>
        </div>
      </div>
    </div>
  );
}
