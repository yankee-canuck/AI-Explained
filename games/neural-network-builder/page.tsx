"use client";

import { useState } from "react";
import Link from "next/link";

interface PromptExample {
  id: string;
  category: string;
  poorPrompt: string;
  goodPrompt: string;
  explanation: string;
  icon: string;
}

const promptExamples: PromptExample[] = [
  {
    id: "image-creation",
    category: "Image Creation",
    poorPrompt: "a dog",
    goodPrompt: "a golden retriever puppy playing in a sunny garden with butterflies, photorealistic style, warm lighting",
    explanation: "Be specific about the type of dog, what it's doing, the setting, style, and lighting",
    icon: "paintbrush"
  },
  {
    id: "story-writing",
    category: "Story Writing",
    poorPrompt: "write a story",
    goodPrompt: "Write a 300-word adventure story about a young explorer discovering a hidden cave, suitable for children aged 8-12, with a positive message about curiosity",
    explanation: "Specify the length, genre, main character, plot, target audience, and theme",
    icon: "book"
  },
  {
    id: "email-writing",
    category: "Email Writing",
    poorPrompt: "write an email",
    goodPrompt: "Write a professional email to schedule a meeting with my team next week to discuss the Q4 project timeline. Keep it friendly but concise.",
    explanation: "Include the purpose, audience, context, tone, and desired length",
    icon: "mail"
  },
  {
    id: "code-help",
    category: "Coding Help",
    poorPrompt: "help me code",
    goodPrompt: "Help me create a Python function that sorts a list of names alphabetically and returns the first 5 names. Include error handling for empty lists.",
    explanation: "Specify the programming language, what you want to create, requirements, and edge cases to handle",
    icon: "code"
  },
  {
    id: "learning-explanation",
    category: "Learning Help",
    poorPrompt: "explain AI",
    goodPrompt: "Explain how Generative AI works in simple terms that a 10-year-old could understand. Use analogies and examples.",
    explanation: "Define the topic, specify the complexity level, and request specific approaches like analogies",
    icon: "graduation-cap"
  },
  {
    id: "creative-project",
    category: "Creative Projects",
    poorPrompt: "make something creative",
    goodPrompt: "Create a brainstorming list of 10 unique business ideas for a sustainable food startup. Focus on innovative solutions that help reduce food waste.",
    explanation: "Specify the type of content, quantity, focus area, and target outcome",
    icon: "lightbulb"
  }
];

// Icon rendering function
function getIcon(iconName: string) {
  const icons = {
    paintbrush: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3h10M7 3v4M7 3a2 2 0 00-2 2v12a4 4 0 004 4h0a4 4 0 004-4V5a2 2 0 00-2-2z" />
      </svg>
    ),
    book: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    mail: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    code: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    ),
    "graduation-cap": (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.083 12.083 0 01.665-6.479L12 14z" />
      </svg>
    ),
    lightbulb: (
      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    )
  };
  return icons[iconName as keyof typeof icons] || icons.paintbrush;
}

export default function GenAIPromptBuilderPage() {
  const [gameState, setGameState] = useState<"menu" | "learning" | "practice" | "completed">("menu");
  const [currentExample, setCurrentExample] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completedExamples, setCompletedExamples] = useState<number[]>([]);

  const startLearning = () => {
    setGameState("learning");
    setCurrentExample(0);
    setScore(0);
    setCompletedExamples([]);
  };

  const startPractice = () => {
    setGameState("practice");
    setCurrentExample(0);
    setScore(0);
    setCompletedExamples([]);
  };

  const nextExample = () => {
    if (currentExample < promptExamples.length - 1) {
      setCurrentExample(currentExample + 1);
      setUserPrompt("");
      setFeedback("");
    } else {
      setGameState("completed");
    }
  };

  const analyzePrompt = () => {
    const example = promptExamples[currentExample];
    let points = 0;
    let feedbackText = "";

    // Check for specificity
    if (userPrompt.length > example.poorPrompt.length * 2) {
      points += 20;
      feedbackText += "✅ Great! Your prompt is much more detailed than the basic version.\n";
    } else {
      feedbackText += "💡 Try adding more specific details about what you want.\n";
    }

    // Check for context
    if (userPrompt.toLowerCase().includes("style") || userPrompt.toLowerCase().includes("tone") || 
        userPrompt.toLowerCase().includes("length") || userPrompt.toLowerCase().includes("audience")) {
      points += 20;
      feedbackText += "✅ Excellent! You included style, tone, length, or audience details.\n";
    } else {
      feedbackText += "💡 Consider adding details about style, tone, length, or target audience.\n";
    }

    // Check for examples or format
    if (userPrompt.toLowerCase().includes("example") || userPrompt.toLowerCase().includes("format") ||
        userPrompt.toLowerCase().includes("like") || userPrompt.toLowerCase().includes("similar to")) {
      points += 20;
      feedbackText += "✅ Great! You provided examples or format guidance.\n";
    } else {
      feedbackText += "💡 Providing examples or format guidance can help AI understand better.\n";
    }

    // Check for clear instructions
    if (userPrompt.length > 50 && userPrompt.includes(" ") && userPrompt.length < 200) {
      points += 20;
      feedbackText += "✅ Perfect length! Not too short, not too long.\n";
    } else {
      feedbackText += "💡 Aim for clear, concise instructions that are specific enough to be helpful.\n";
    }

    // Check for action words
    if (userPrompt.toLowerCase().includes("create") || userPrompt.toLowerCase().includes("write") ||
        userPrompt.toLowerCase().includes("make") || userPrompt.toLowerCase().includes("explain")) {
      points += 20;
      feedbackText += "✅ Good use of action words to clearly state what you want.\n";
    } else {
      feedbackText += "💡 Use clear action words like 'create', 'write', 'make', or 'explain'.\n";
    }

    setScore(score + points);
    setFeedback(feedbackText);
    
    if (!completedExamples.includes(currentExample)) {
      setCompletedExamples([...completedExamples, currentExample]);
    }
  };

  const getProgressPercentage = () => {
    return (completedExamples.length / promptExamples.length) * 100;
  };

  if (gameState === "menu") {
    return (
      <div className="space-loose">
        <section className="text-center">
          <h1 className="text-hero text-gradient mb-4">GenAI Prompt Builder</h1>
          <p className="text-subtitle max-w-3xl mx-auto">
            Learn to write amazing prompts that get the best results from AI tools! 
            Master the art of being specific, clear, and creative with your AI requests.
          </p>
        </section>

        <section className="max-w-2xl mx-auto space-y-6">
          <div className="card p-6">
            <h2 className="text-heading mb-4">What You'll Learn</h2>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>How to write clear, specific prompts that AI understands</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-purple-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span>Techniques for getting better results from image generators</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <span>Tips for writing effective prompts for text and content creation</span>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-orange-100 rounded-full flex items-center justify-center">
                  <svg className="w-3 h-3 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <span>Practice with real examples and get instant feedback</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={startLearning}
              className="btn btn-primary btn-lg"
            >
              Learn First
            </button>
            <button
              onClick={startPractice}
              className="btn btn-secondary btn-lg"
            >
              Practice Now
            </button>
          </div>

          <div className="text-center">
            <Link href="/games" className="text-blue-600 hover:underline">
              ← Back to Games
            </Link>
          </div>
        </section>
      </div>
    );
  }

  if (gameState === "learning") {
    const example = promptExamples[currentExample];
    
    return (
      <div className="space-clean">
        {/* Header */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-heading">Learning: {example.category}</h1>
            <div className="text-right">
              <div className="text-caption">Example {currentExample + 1}/{promptExamples.length}</div>
              <div className="text-lg font-bold text-blue-600">{score} points</div>
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </section>

        {/* Example Display */}
        <section className="card p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
              {getIcon(example.icon)}
            </div>
            <h2 className="text-heading mb-2">{example.category}</h2>
            <p className="text-body">Learn the difference between basic and great prompts</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Poor Prompt */}
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-semibold text-red-800 mb-2">Basic Prompt</h3>
              <div className="bg-white p-3 rounded border text-sm text-gray-700 mb-2">
                "{example.poorPrompt}"
              </div>
              <p className="text-xs text-red-600">This prompt is too vague and won't get good results</p>
            </div>

            {/* Good Prompt */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-2">Great Prompt</h3>
              <div className="bg-white p-3 rounded border text-sm text-gray-700 mb-2">
                "{example.goodPrompt}"
              </div>
              <p className="text-xs text-green-600">This prompt is specific and will get much better results</p>
            </div>
          </div>

          {/* Explanation */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold text-blue-800 mb-2">Why This Works Better</h4>
            <ul className="space-y-2 text-sm text-gray-700">
              {feedback.split('\n').map((line, index) => (
                line.trim() && (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span>{line.replace(/^💡\s*/, '')}</span>
                  </li>
                )
              ))}
            </ul>
          </div>
        </section>

        {/* Navigation */}
        <section className="flex justify-between">
          <button
            onClick={() => setGameState("menu")}
            className="btn btn-secondary"
          >
            ← Back to Menu
          </button>
          <button
            onClick={nextExample}
            className="btn btn-primary"
          >
            {currentExample < promptExamples.length - 1 ? 'Next Example →' : 'Finish Learning'}
          </button>
        </section>
      </div>
    );
  }

  if (gameState === "practice") {
    const example = promptExamples[currentExample];
    
    return (
      <div className="space-clean">
        {/* Header */}
        <section className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-heading">Practice: {example.category}</h1>
            <div className="text-right">
              <div className="text-caption">Challenge {currentExample + 1}/{promptExamples.length}</div>
              <div className="text-lg font-bold text-blue-600">{score} points</div>
            </div>
          </div>
          
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </section>

        {/* Challenge */}
        <section className="card p-6">
          <div className="text-center mb-6">
            <div className="text-4xl mb-2">{getIcon(example.icon)}</div>
            <h2 className="text-heading mb-2">Your Turn!</h2>
            <p className="text-body text-gray-600">Write your own prompt and get instant feedback</p>
            
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-caption mb-1">Basic prompt:</p>
              <p className="font-medium">"{example.poorPrompt}"</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your improved prompt:
              </label>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Write a much better, more specific version of the prompt above..."
                className="input"
                rows={4}
              />
            </div>

            <button
              onClick={analyzePrompt}
              disabled={!userPrompt.trim()}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              Analyze My Prompt
            </button>
          </div>

          {/* Feedback */}
          {feedback && (
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2">Your Results</h4>
              <div className="text-blue-700 text-sm whitespace-pre-line">{feedback}</div>
            </div>
          )}
        </section>

        {/* Navigation */}
        <section className="flex justify-between">
          <button
            onClick={() => setGameState("menu")}
            className="btn btn-secondary"
          >
            ← Back to Menu
          </button>
          {feedback && (
            <button
              onClick={nextExample}
              className="btn btn-primary"
            >
              {currentExample < promptExamples.length - 1 ? 'Next Challenge →' : 'Finish Practice'}
            </button>
          )}
        </section>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="space-loose">
        <section className="text-center">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-display mb-4">Congratulations!</h1>
          <p className="text-subtitle mb-6">
            You've completed the GenAI Prompt Builder! You now know how to write 
            much better prompts that will get amazing results from AI tools.
          </p>
          
          <div className="max-w-md mx-auto space-y-4">
            <div className="card p-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">{score}</div>
                <div className="text-caption">Total Points Earned</div>
              </div>
            </div>
            
            <div className="card p-6">
              <h3 className="text-heading mb-3">What You Mastered</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Writing specific, detailed prompts</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Including style and context information</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Using clear action words</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Providing examples and format guidance</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Getting the right length and detail level</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4 justify-center mt-6">
            <button
              onClick={() => setGameState("menu")}
              className="btn btn-secondary"
            >
              Practice Again
            </button>
            <Link href="/lesson/ai-fundamentals" className="btn btn-primary">
              Learn More
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return null;
}
