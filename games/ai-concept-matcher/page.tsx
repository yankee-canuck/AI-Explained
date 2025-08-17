"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import Link from "next/link";

const AI_TERMS = [
  { term: "AI (Artificial Intelligence)", def: "The simulation of human intelligence processes by machines or computer systems" },
  { term: "Machine Learning", def: "AI subset where algorithms mimic human learning while processing data" },
  { term: "Deep Learning", def: "Machine learning technique using layered neural networks" },
  { term: "Neural Network", def: "Deep learning technique resembling human brain structure" },
  { term: "Natural Language Processing", def: "AI that enables computers to understand human language" },
  { term: "Computer Vision", def: "Enabling computers to understand images and videos" },
  { term: "Generative AI", def: "AI technology that creates content including text, video, code and images" },
  { term: "Large Language Model", def: "AI models trained on large amounts of text for natural language understanding" },
  { term: "Algorithm", def: "A set of instructions or rules to complete specific tasks" },
  { term: "Data Science", def: "Interdisciplinary field using algorithms to analyze large amounts of data" },
  { term: "Big Data", def: "Large datasets that reveal patterns and trends for business decisions" },
  { term: "Data Mining", def: "Examining data to identify patterns and glean insights" },
  { term: "Predictive Analytics", def: "Technology to predict future events based on historical data" },
  { term: "Pattern Recognition", def: "Using algorithms to detect regularities in data" },
  { term: "Supervised Learning", def: "Machine learning that learns from labeled historical data" },
  { term: "Unsupervised Learning", def: "Machine learning that looks for data patterns without labels" },
  { term: "Reinforcement Learning", def: "Machine learning that learns through environment interaction" },
  { term: "Transfer Learning", def: "Applying previously learned data to new tasks" },
  { term: "Overfitting", def: "When ML algorithms only work on specific training examples" },
  { term: "Hyperparameter", def: "Parameters that control the learning process" },
  { term: "Training Data", def: "Information given to AI systems to enable learning" },
  { term: "Token", def: "Basic unit of text that LLMs use to understand language" },
  { term: "Prompt", def: "Input that users feed to AI systems for desired results" },
  { term: "API", def: "Protocols for software applications to interact with each other" },
  { term: "Chatbot", def: "Software applications that imitate human conversation" },
  { term: "Voice Recognition", def: "Computers interpreting human speech and producing outputs" },
  { term: "Image Recognition", def: "Identifying objects, people, places, or text in images or videos" },
  { term: "Sentiment Analysis", def: "Using AI to analyze tone and opinion in text" },
  { term: "AI Ethics", def: "Ensuring responsible development and use of AI technology" },
  { term: "Guardrails", def: "Mechanisms to ensure AI systems operate within ethical boundaries" },
  { term: "Hallucination", def: "Incorrect responses from AI systems presented as factual" },
  { term: "Bias", def: "When answers lean a certain way because of the data the AI learned from" },
  { term: "Emergent Behavior", def: "Unpredictable AI capabilities from component interactions" },
  { term: "Turing Test", def: "Test to evaluate machine intelligence equal to humans" },
  { term: "Quantum Computing", def: "Using quantum-mechanical phenomena for calculations" },
  { term: "Structured Data", def: "Data that is defined, searchable, and organized" },
  { term: "Unstructured Data", def: "Data that is not organized in any apparent way" },
  { term: "Cognitive Computing", def: "AI systems that mimic human thought processes" },
  { term: "Limited Memory", def: "AI systems that learn from real-time events and stored data" }
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Function to play sparkle sound
function playSparkleSound() {
  try {
    const audio = new Audio('/sounds/correct-chime.mp3');
    audio.volume = 0.3;
    audio.play().catch(() => {
      // Fallback: create a simple beep sound if audio file fails
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
      oscillator.frequency.setValueAtTime(1200, audioContext.currentTime + 0.2);
      
      gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    });
  } catch (error) {
    // Silent fallback if audio fails
    console.log('Audio playback failed');
  }
}

export default function AIConceptMatcher() {
  const [gameState, setGameState] = useState<"menu" | "playing" | "completed">("menu");
  const [difficulty, setDifficulty] = useState<"easy" | "medium" | "hard">("easy");
  const [timeLimit, setTimeLimit] = useState(120);
  const [timeLeft, setTimeLeft] = useState(120);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [round, setRound] = useState(1);

  const gameConfig = useMemo(() => {
    switch (difficulty) {
      case "easy":
        return { terms: 5, time: 120, points: 10 };
      case "medium":
        return { terms: 8, time: 90, points: 15 };
      case "hard":
        return { terms: 12, time: 60, points: 20 };
    }
  }, [difficulty]);

  // Create stable shuffled arrays that don't change during gameplay
  const gameTerms = useMemo(() => shuffle(AI_TERMS).slice(0, gameConfig.terms), [gameConfig.terms, round]);
  const shuffledDefinitions = useMemo(() => shuffle(gameTerms.map(item => item.def)), [gameTerms, round]);
  
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedDefinition, setSelectedDefinition] = useState<string | null>(null);
  const [matchedTerms, setMatchedTerms] = useState<Set<string>>(new Set());
  const [matchedDefinitions, setMatchedDefinitions] = useState<Set<string>>(new Set());
  const [incorrectAttempts, setIncorrectAttempts] = useState(0);

  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      endGame();
    }
  }, [timeLeft, gameState]);

  const startGame = () => {
    setTimeLeft(gameConfig.time);
    setScore(0);
    setStreak(0);
    setRound(1);
    setMatchedTerms(new Set());
    setMatchedDefinitions(new Set());
    setIncorrectAttempts(0);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setGameState("playing");
  };

  const endGame = () => {
    setGameState("completed");
  };

  const handleCorrectMatch = useCallback((term: string, definition: string) => {
    setMatchedTerms(prev => new Set([...prev, term]));
    setMatchedDefinitions(prev => new Set([...prev, definition]));
    setScore(prev => prev + gameConfig.points + Math.floor(timeLeft / 10));
    setStreak(prev => prev + 1);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    
    // Play sparkle sound for correct match
    playSparkleSound();
    
    // Check if game is complete
    if (matchedTerms.size + 1 === gameTerms.length) {
      setTimeout(endGame, 500);
    }
  }, [gameConfig.points, timeLeft, matchedTerms.size, gameTerms.length]);

  const handleIncorrectMatch = useCallback(() => {
    setIncorrectAttempts(prev => prev + 1);
    setStreak(0);
    setScore(prev => Math.max(0, prev - 5));
    setSelectedTerm(null);
    setSelectedDefinition(null);
  }, []);

  const handleTermClick = (term: string) => {
    if (matchedTerms.has(term)) return;
    
    if (selectedTerm === term) {
      setSelectedTerm(null);
    } else {
      setSelectedTerm(term);
      // If we already have a definition selected, check the match automatically
      if (selectedDefinition) {
        setTimeout(() => checkMatch(term, selectedDefinition), 100);
      }
    }
  };

  const handleDefinitionClick = (definition: string) => {
    if (matchedDefinitions.has(definition)) return;
    
    if (selectedDefinition === definition) {
      setSelectedDefinition(null);
    } else {
      setSelectedDefinition(definition);
      // If we already have a term selected, check the match automatically
      if (selectedTerm) {
        setTimeout(() => checkMatch(selectedTerm, definition), 100);
      }
    }
  };

  const checkMatch = (term: string, definition: string) => {
    const termObj = gameTerms.find(t => t.term === term);
    if (termObj && termObj.def === definition) {
      // Correct match!
      handleCorrectMatch(term, definition);
    } else {
      // Incorrect match
      handleIncorrectMatch();
    }
  };

  const resetGame = () => {
    setRound(prev => prev + 1);
    setMatchedTerms(new Set());
    setMatchedDefinitions(new Set());
    setIncorrectAttempts(0);
    setSelectedTerm(null);
    setSelectedDefinition(null);
    setTimeLeft(gameConfig.time);
  };

  if (gameState === "menu") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              AI Concept Matcher
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Match AI terms with their definitions in this engaging learning game. 
              Test your knowledge and improve your understanding of artificial intelligence concepts.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Difficulty Selection */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
              <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Select Difficulty</h2>
              
              <div className="space-y-6 mb-10">
                <button
                  onClick={() => setDifficulty("easy")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    difficulty === "easy"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        difficulty === "easy" ? "text-blue-700" : "text-green-600"
                      }`}>
                        Easy
                      </h3>
                      <p className="text-gray-600 text-lg">5 terms, 2 minutes</p>
                    </div>
                    {difficulty === "easy" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setDifficulty("medium")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    difficulty === "medium"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        difficulty === "medium" ? "text-blue-700" : "text-orange-600"
                      }`}>
                        Medium
                      </h3>
                      <p className="text-gray-600 text-lg">8 terms, 1.5 minutes</p>
                    </div>
                    {difficulty === "medium" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>

                <button
                  onClick={() => setDifficulty("hard")}
                  className={`w-full p-6 rounded-xl border-2 transition-all duration-300 text-left ${
                    difficulty === "hard"
                      ? "border-blue-500 bg-blue-50 shadow-lg"
                      : "border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`text-2xl font-bold mb-2 ${
                        difficulty === "hard" ? "text-blue-700" : "text-red-600"
                      }`}>
                        Hard
                      </h3>
                      <p className="text-gray-600 text-lg">12 terms, 1 minute</p>
                    </div>
                    {difficulty === "hard" && (
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              </div>

              <button
                onClick={startGame}
                className="w-full bg-blue-600 text-white text-xl font-bold py-4 px-8 rounded-xl hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Start Game
              </button>
            </div>

            {/* Game Preview/Info */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-10">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">How to Play</h3>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <p>Click on an AI term from the left column</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">2</span>
                  </div>
                  <p>Click on its matching definition from the right column</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">3</span>
                  </div>
                  <p>Click "Check Match" to verify your answer</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blue-600 font-bold text-sm">4</span>
                  </div>
                  <p>Match all terms before time runs out!</p>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Game Features</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Multiple difficulty levels</li>
                  <li>• Timer-based challenges</li>
                  <li>• Score tracking and streaks</li>
                  <li>• Instant feedback on matches</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "playing") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Game Header */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 mb-6">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="text-center lg:text-left">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">AI Concept Matcher</h1>
                <p className="text-gray-600">Match the terms with their definitions</p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-xl font-bold text-blue-600">{score}</div>
                    <div className="text-xs text-gray-500">Score</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-orange-600">{streak}</div>
                    <div className="text-xs text-gray-500">Streak</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-purple-600">{round}</div>
                    <div className="text-xs text-gray-500">Round</div>
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-600">{timeLeft}</div>
                  <div className="text-xs text-gray-500">Seconds</div>
                </div>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="mt-4">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((matchedTerms.size) / gameTerms.length) * 100}%` }}
                ></div>
              </div>
              <div className="text-center mt-1 text-xs text-gray-600">
                {matchedTerms.size} of {gameTerms.length} terms matched
              </div>
            </div>
          </div>

          {/* Game Board */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Terms Column */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">AI Terms</h2>
              <div className="space-y-3">
                {gameTerms.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleTermClick(term.term)}
                    disabled={matchedTerms.has(term.term) || selectedTerm === term.term}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedTerm === term.term
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : matchedTerms.has(term.term)
                        ? 'border-green-500 bg-green-50 opacity-80 cursor-not-allowed'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <h3 className="text-base font-semibold text-gray-900">{term.term}</h3>
                  </button>
                ))}
              </div>
            </div>

            {/* Definitions Column */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">Definitions</h2>
              <div className="space-y-3">
                {shuffledDefinitions.map((def, index) => (
                  <button
                    key={index}
                    onClick={() => handleDefinitionClick(def)}
                    disabled={matchedDefinitions.has(def) || selectedDefinition === def}
                    className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                      selectedDefinition === def
                        ? 'border-purple-500 bg-purple-50 shadow-lg'
                        : matchedDefinitions.has(def)
                        ? 'border-green-500 bg-green-50 opacity-80 cursor-not-allowed'
                        : 'border-gray-200 bg-gray-50 hover:border-gray-300 hover:bg-gray-100'
                    }`}
                  >
                    <p className="text-sm text-gray-700 leading-relaxed">{def}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Game Controls */}
          <div className="mt-8 text-center">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 inline-block">
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <button 
                  onClick={resetGame} 
                  className="px-6 py-3 bg-gray-600 text-white rounded-lg font-bold text-base hover:bg-gray-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
                >
                  Reset Game
                </button>
                
                <Link 
                  href="/games" 
                  className="px-6 py-3 bg-white text-gray-700 border-2 border-gray-300 rounded-lg font-bold text-base hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Back to Games
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-12 text-center">
            <div className="w-32 h-32 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Game Complete!</h1>
            <p className="text-xl text-gray-600 mb-8">Excellent work matching all the AI concepts!</p>
            
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <div className="text-3xl font-bold text-blue-600 mb-2">{score}</div>
                <div className="text-gray-600">Final Score</div>
              </div>
              <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
                <div className="text-3xl font-bold text-orange-600 mb-2">{streak}</div>
                <div className="text-gray-600">Best Streak</div>
              </div>
              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <div className="text-3xl font-bold text-purple-600 mb-2">{timeLeft}</div>
                <div className="text-gray-600">Time Remaining</div>
              </div>
            </div>
            
            <div className="space-y-6 mb-12">
              <h2 className="text-2xl font-bold text-gray-900">Performance Summary</h2>
              <div className="max-w-2xl mx-auto space-y-3 text-gray-600">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Difficulty Level:</span>
                  <span className="font-semibold capitalize">{difficulty}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Terms Matched:</span>
                  <span className="font-semibold">{gameTerms.length}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span>Accuracy:</span>
                  <span className="font-semibold text-green-600">100%</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={resetGame}
                className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Play Again
              </button>
              <Link
                href="/games"
                className="px-8 py-4 bg-white text-gray-700 border-2 border-gray-300 rounded-xl font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try Other Games
              </Link>
              <Link
                href="/lesson/ai-fundamentals"
                className="px-8 py-4 bg-purple-600 text-white rounded-xl font-bold text-lg hover:bg-purple-700 transition-colors duration-300 shadow-lg hover:shadow-xl"
              >
                Study More Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
