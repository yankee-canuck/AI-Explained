"use client";

import { useState } from "react";

const samplePrompts = [
  { 
    id: 1, 
    prompt: "Write a haiku about the ocean.", 
    bug: "Too generic, lacks a style or mood.",
    category: "Creative Writing",
    difficulty: "Easy"
  },
  { 
    id: 2, 
    prompt: "Translate this sentence to French: Hello World", 
    bug: "Missing context for tone (formal/informal).",
    category: "Translation",
    difficulty: "Easy"
  },
  { 
    id: 3, 
    prompt: "Generate an image of a dog", 
    bug: "No description of breed, color, or scene.",
    category: "Image Generation",
    difficulty: "Medium"
  },
  { 
    id: 4, 
    prompt: "Summarize this article", 
    bug: "Article not provided.",
    category: "Content Analysis",
    difficulty: "Medium"
  },
  { 
    id: 5, 
    prompt: "Tell me a story", 
    bug: "No genre, tone, or length specified.",
    category: "Creative Writing",
    difficulty: "Medium"
  },
  { 
    id: 6, 
    prompt: "Help me with my homework", 
    bug: "No specific subject or question provided.",
    category: "Education",
    difficulty: "Easy"
  },
  { 
    id: 7, 
    prompt: "Create a business plan", 
    bug: "No industry, target market, or business type specified.",
    category: "Business",
    difficulty: "Hard"
  },
  { 
    id: 8, 
    prompt: "Write code for a website", 
    bug: "No programming language, features, or design preferences specified.",
    category: "Programming",
    difficulty: "Hard"
  }
];

// Grading criteria and scoring system
const gradingCriteria = {
  specificity: { weight: 25, description: "How specific and detailed is the prompt?" },
  context: { weight: 25, description: "Does it provide necessary context and background?" },
  constraints: { weight: 20, description: "Are appropriate limitations and requirements set?" },
  clarity: { weight: 20, description: "Is the prompt clear and unambiguous?" },
  completeness: { weight: 10, description: "Does it address the identified bug?" }
};

const gradePrompt = (originalPrompt: string, improvedPrompt: string, bug: string) => {
  let totalScore = 0;
  const feedback: { criterion: string; score: number; maxScore: number; comment: string }[] = [];

  // Specificity (25 points)
  const specificityScore = Math.min(25, Math.max(0, 
    Math.floor((improvedPrompt.length / originalPrompt.length) * 15) + 
    (improvedPrompt.includes('specific') || improvedPrompt.includes('detailed') ? 5 : 0) +
    (improvedPrompt.includes('style') || improvedPrompt.includes('mood') || improvedPrompt.includes('tone') ? 5 : 0)
  ));
  feedback.push({
    criterion: "Specificity",
    score: specificityScore,
    maxScore: 25,
    comment: specificityScore >= 20 ? "Excellent detail and specificity" : 
             specificityScore >= 15 ? "Good level of detail" : 
             specificityScore >= 10 ? "Some improvement needed" : "Needs more specific details"
  });
  totalScore += specificityScore;

  // Context (25 points)
  const contextScore = Math.min(25, Math.max(0,
    (improvedPrompt.includes('context') || improvedPrompt.includes('background') ? 8 : 0) +
    (improvedPrompt.includes('for') || improvedPrompt.includes('about') ? 8 : 0) +
    (improvedPrompt.includes('audience') || improvedPrompt.includes('purpose') ? 9 : 0)
  ));
  feedback.push({
    criterion: "Context",
    score: contextScore,
    maxScore: 25,
    comment: contextScore >= 20 ? "Great context provided" : 
             contextScore >= 15 ? "Good context" : 
             contextScore >= 10 ? "Some context added" : "Needs more context"
  });
  totalScore += contextScore;

  // Constraints (20 points)
  const constraintsScore = Math.min(20, Math.max(0,
    (improvedPrompt.includes('length') || improvedPrompt.includes('word') ? 5 : 0) +
    (improvedPrompt.includes('style') || improvedPrompt.includes('tone') ? 5 : 0) +
    (improvedPrompt.includes('format') || improvedPrompt.includes('structure') ? 5 : 0) +
    (improvedPrompt.includes('include') || improvedPrompt.includes('focus') ? 5 : 0)
  ));
  feedback.push({
    criterion: "Constraints",
    score: constraintsScore,
    maxScore: 20,
    comment: constraintsScore >= 16 ? "Excellent constraints set" : 
             constraintsScore >= 12 ? "Good constraints" : 
             constraintsScore >= 8 ? "Some constraints added" : "Needs more constraints"
  });
  totalScore += constraintsScore;

  // Clarity (20 points)
  const clarityScore = Math.min(20, Math.max(0,
    (improvedPrompt.length > originalPrompt.length * 1.5 ? 10 : 5) +
    (improvedPrompt.split('.').length > 1 ? 5 : 0) +
    (improvedPrompt.includes('and') || improvedPrompt.includes('or') ? 5 : 0)
  ));
  feedback.push({
    criterion: "Clarity",
    score: clarityScore,
    maxScore: 20,
    comment: clarityScore >= 16 ? "Very clear and well-structured" : 
             clarityScore >= 12 ? "Clear enough" : 
             clarityScore >= 8 ? "Somewhat clear" : "Could be clearer"
  });
  totalScore += clarityScore;

  // Completeness (10 points)
  const completenessScore = bug.toLowerCase().includes('missing') && improvedPrompt.length > originalPrompt.length * 1.3 ? 10 :
                           bug.toLowerCase().includes('generic') && improvedPrompt.includes('specific') ? 10 :
                           bug.toLowerCase().includes('context') && improvedPrompt.includes('context') ? 10 :
                           bug.toLowerCase().includes('description') && improvedPrompt.includes('describe') ? 10 : 5;
  feedback.push({
    criterion: "Completeness",
    score: completenessScore,
    maxScore: 10,
    comment: completenessScore === 10 ? "Fully addresses the bug" : "Partially addresses the bug"
  });
  totalScore += completenessScore;

  return { totalScore, feedback, grade: getGrade(totalScore) };
};

const getGrade = (score: number) => {
  if (score >= 90) return { letter: 'A', color: 'text-green-600', bgColor: 'bg-green-50' };
  if (score >= 80) return { letter: 'B', color: 'text-blue-600', bgColor: 'bg-blue-50' };
  if (score >= 70) return { letter: 'C', color: 'text-yellow-600', bgColor: 'bg-yellow-50' };
  if (score >= 60) return { letter: 'D', color: 'text-orange-600', bgColor: 'bg-orange-50' };
  return { letter: 'F', color: 'text-red-600', bgColor: 'bg-red-50' };
};

export default function PromptDebuggerGame() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [input, setInput] = useState("");
  const [finished, setFinished] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [currentFeedback, setCurrentFeedback] = useState<any>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [roundScores, setRoundScores] = useState<number[]>([]);

  const currentPrompt = samplePrompts[currentIndex];

  const handleSubmit = () => {
    if (input.trim().length > 0) {
      const grading = gradePrompt(currentPrompt.prompt, input, currentPrompt.bug);
      setCurrentFeedback(grading);
      setTotalScore(totalScore + grading.totalScore);
      setRoundScores([...roundScores, grading.totalScore]);
      
      // Auto-advance after showing feedback
      setTimeout(() => {
        if (currentIndex < samplePrompts.length - 1) {
          setCurrentIndex(currentIndex + 1);
          setInput("");
          setCurrentFeedback(null);
        } else {
          setFinished(true);
        }
      }, 3000);
    }
  };

  const restartGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setFinished(false);
    setInput("");
    setCurrentFeedback(null);
    setTotalScore(0);
    setRoundScores([]);
  };

  const startGame = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Prompt Debugger</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Master the art of writing clear, specific AI prompts by identifying and fixing common issues
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How to Play</h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">1</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Analyze the Prompt</h3>
                  <p className="text-gray-600">Read the given prompt and identify the bug or issue described below it.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">2</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Write an Improved Version</h3>
                  <p className="text-gray-600">Create a better prompt that addresses the identified issue and follows best practices.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5">3</div>
                <div>
                  <h3 className="font-semibold text-gray-900">Get Instant Feedback</h3>
                  <p className="text-gray-600">Receive detailed scoring and feedback on your prompt improvement skills.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Grading System</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {Object.entries(gradingCriteria).map(([key, criteria]) => (
                <div key={key} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-semibold text-gray-900 capitalize">{key}</h3>
                    <span className="text-sm font-bold text-blue-600">{criteria.weight} pts</span>
                  </div>
                  <p className="text-sm text-gray-600">{criteria.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={startGame}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg"
            >
              Start Playing
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    const averageScore = Math.round(totalScore / samplePrompts.length);
    const finalGrade = getGrade(averageScore);
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Complete!</h1>
            <p className="text-lg text-gray-600">Here's how you performed:</p>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
            <div className="text-center mb-6">
              <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full ${finalGrade.bgColor} mb-4`}>
                <span className={`text-4xl font-bold ${finalGrade.color}`}>{finalGrade.letter}</span>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Final Grade: {finalGrade.letter}</h2>
              <p className="text-lg text-gray-600">Average Score: {averageScore}/100</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{totalScore}</div>
                <div className="text-sm text-gray-600">Total Points</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{samplePrompts.length}</div>
                <div className="text-sm text-gray-600">Prompts Completed</div>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Round-by-Round Performance:</h3>
              {roundScores.map((score, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span className="font-medium text-gray-700">Round {index + 1}</span>
                  <span className="font-bold text-blue-600">{score}/100</span>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center">
            <button 
              onClick={restartGame}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors text-lg mr-4"
            >
              Play Again
            </button>
            <a 
              href="/games"
              className="px-8 py-3 bg-gray-600 text-white font-medium rounded-lg hover:bg-gray-700 transition-colors text-lg"
            >
              Back to Games
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Prompt Debugger</h1>
          <p className="text-gray-600">Round {currentIndex + 1} of {samplePrompts.length}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(((currentIndex + 1) / samplePrompts.length) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / samplePrompts.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Current Score */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-6 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div>
              <div className="text-xl font-bold text-blue-600">{totalScore}</div>
              <div className="text-xs text-gray-500 font-medium">Total Score</div>
            </div>
            <div className="w-px h-8 bg-gray-200"></div>
            <div>
              <div className="text-xl font-bold text-green-600">{Math.round(totalScore / (currentIndex + 1))}</div>
              <div className="text-xs text-gray-500 font-medium">Average</div>
            </div>
          </div>
        </div>

        {/* Main Game Card */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Prompt Info */}
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <span className={`px-2 py-1 rounded text-xs font-medium ${
                  currentPrompt.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                  currentPrompt.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {currentPrompt.difficulty}
                </span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                  {currentPrompt.category}
                </span>
              </div>
              
              <h2 className="text-lg font-semibold text-gray-900 mb-3">Original Prompt:</h2>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-3">
                <p className="text-gray-700 font-medium">{currentPrompt.prompt}</p>
              </div>
              
              <h3 className="text-base font-semibold text-gray-800 mb-2">Identified Issue:</h3>
              <div className="bg-red-50 rounded-lg p-3 border border-red-200">
                <p className="text-red-700 text-sm">{currentPrompt.bug}</p>
              </div>
            </div>

            {/* Feedback Display */}
            {currentFeedback && (
              <div className="mb-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-3 text-center">Your Score: {currentFeedback.totalScore}/100</h3>
                <div className="space-y-2">
                  {currentFeedback.feedback.map((item: any, index: number) => (
                    <div key={index} className="flex justify-between items-center text-sm">
                      <span className="text-blue-800">{item.criterion}:</span>
                      <span className="font-semibold text-blue-700">{item.score}/{item.maxScore}</span>
                    </div>
                  ))}
                </div>
                <div className="text-center mt-3">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full ${currentFeedback.grade.bgColor}`}>
                    <span className={`text-sm font-bold ${currentFeedback.grade.color}`}>{currentFeedback.grade.letter}</span>
                  </span>
                </div>
              </div>
            )}

            {/* Input Section */}
            {!currentFeedback && (
              <>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Your Improved Prompt:</h3>
                  <textarea
                    className="w-full border-2 border-gray-300 rounded-lg p-4 text-gray-700 placeholder-gray-400 focus:border-blue-500 focus:outline-none transition-colors resize-none"
                    rows={4}
                    placeholder="Write your improved prompt that addresses the identified issue..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                  ></textarea>
                </div>

                <div className="text-center">
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={!input.trim()}
                  >
                    Submit & Get Feedback
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Navigation */}
        <div className="text-center mt-6">
          <a 
            href="/games"
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
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
