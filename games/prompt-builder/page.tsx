"use client";

import { useState } from "react";
import Link from "next/link";

const PROMPT_TIPS = [
  "Be specific about what you want the AI to create",
  "Include context and examples to guide the output",
  "Use clear, simple language that's easy to understand",
  "Specify the tone, style, or format you prefer",
  "Break complex requests into smaller, clearer steps",
  "Provide feedback and iterate on your prompts"
];

const PRACTICE_PROMPTS = [
  {
    task: "Write a professional email",
    context: "You need to schedule a meeting with a client",
    goodPrompt: "Write a professional email to schedule a meeting with a client. Include a brief introduction, the purpose of the meeting, and suggest 2-3 time slots for next week. Keep the tone friendly but professional.",
    badPrompt: "Write an email"
  },
  {
    task: "Create a story",
    context: "You want a children's story about friendship",
    goodPrompt: "Write a short children's story (under 300 words) about two animals who become friends despite their differences. Include a simple moral lesson about friendship. Make it suitable for ages 5-8.",
    badPrompt: "Write a story about animals"
  },
  {
    task: "Explain a concept",
    context: "You want to understand machine learning",
    goodPrompt: "Explain machine learning in simple terms that a high school student could understand. Use everyday examples and avoid technical jargon. Include 2-3 real-world applications.",
    badPrompt: "What is machine learning?"
  },
  {
    task: "Generate ideas",
    context: "You need creative ideas for a team building activity",
    goodPrompt: "Suggest 5 creative team building activities for a group of 15 people in an office setting. Each activity should take 30-60 minutes and require minimal equipment. Include the goal and basic instructions for each.",
    badPrompt: "Give me team building ideas"
  }
];

export default function PromptBuilder() {
  const [gameState, setGameState] = useState<"menu" | "learning" | "practice" | "completed">("menu");
  const [currentPractice, setCurrentPractice] = useState(0);
  const [userPrompt, setUserPrompt] = useState("");
  const [feedback, setFeedback] = useState("");
  const [score, setScore] = useState(0);
  const [completedLessons, setCompletedLessons] = useState(0);

  const startLearning = () => {
    setGameState("learning");
    setCompletedLessons(0);
  };

  const startPractice = () => {
    setGameState("practice");
    setCurrentPractice(0);
    setScore(0);
    setUserPrompt("");
    setFeedback("");
  };

  const nextPractice = () => {
    if (currentPractice < PRACTICE_PROMPTS.length - 1) {
      setCurrentPractice(currentPractice + 1);
      setUserPrompt("");
      setFeedback("");
    } else {
      setGameState("completed");
    }
  };

  const evaluatePrompt = () => {
    const current = PRACTICE_PROMPTS[currentPractice];
    let points = 0;
    let feedbackText = "";

    // Check for specificity
    if (userPrompt.length > current.badPrompt.length * 2) {
      points += 2;
      feedbackText += "Great job being specific! ";
    } else {
      feedbackText += "Try to be more specific. ";
    }

    // Check for context
    if (userPrompt.toLowerCase().includes("context") || 
        userPrompt.toLowerCase().includes("example") ||
        userPrompt.toLowerCase().includes("include")) {
      points += 2;
      feedbackText += "Excellent use of context and examples! ";
    } else {
      feedbackText += "Consider adding more context. ";
    }

    // Check for clear instructions
    if (userPrompt.toLowerCase().includes("write") || 
        userPrompt.toLowerCase().includes("create") ||
        userPrompt.toLowerCase().includes("explain")) {
      points += 1;
      feedbackText += "Good use of action words! ";
    } else {
      feedbackText += "Use clear action words. ";
    }

    setScore(score + points);
    setFeedback(feedbackText);
  };

  const resetGame = () => {
    setGameState("menu");
    setScore(0);
    setCompletedLessons(0);
    setCurrentPractice(0);
    setUserPrompt("");
    setFeedback("");
  };

  if (gameState === "menu") {
    return (
      <div className="space-modern">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-hero text-gradient mb-4 pb-2 mt-12">Prompt Builder</h1>
          <p className="text-subtitle max-w-4xl mx-auto">
            Master the art of writing effective prompts for AI tools. Learn techniques that will help you get better results 
            from ChatGPT, DALL-E, and other generative AI applications.
          </p>
        </section>

        {/* Learning Options */}
        <section className="container-modern">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Learning Mode Option */}
            <div className="card card-interactive p-8 text-center hover-lift flex flex-col">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c1.746 0 3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-display mb-4">Learning Mode</h2>
              <div className="flex-grow flex flex-col justify-start">
                <p className="text-body text-gray-600 mb-6">
                  Understand the fundamentals of prompt engineering through interactive lessons and examples.
                </p>
                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>6 Key Principles</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c1.746 0 3.332.477-4.5 1.253" />
                    </svg>
                    <span>Interactive Examples</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Step-by-Step Guidance</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={startLearning}
                  className="btn btn-primary btn-lg w-full"
                >
                  Start Learning
                </button>
              </div>
            </div>

            {/* Practice Mode Option */}
            <div className="card card-interactive p-8 text-center hover-lift flex flex-col">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
              </div>
              <h2 className="text-display mb-4">Practice Mode</h2>
              <div className="flex-grow flex flex-col justify-start">
                <p className="text-body text-gray-600 mb-6">
                  Apply what you've learned by writing and improving prompts with real-time feedback.
                </p>
                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>4 Practice Exercises</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Real-time Feedback</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Score Tracking</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={startPractice}
                  className="btn btn-secondary btn-lg w-full"
                >
                  Start Practice
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="text-center">
          <Link href="/games" className="btn btn-outline btn-lg">
            Back to Games
          </Link>
        </section>
      </div>
    );
  }

  if (gameState === "learning") {
    return (
      <div className="space-loose">
        <section className="text-center">
          <h1 className="text-display mb-4">Prompt Engineering Fundamentals</h1>
          <p className="text-subtitle max-w-3xl mx-auto">
            Learn the key principles that make AI prompts more effective and get better results.
          </p>
        </section>

        <section className="grid-cards">
          {PROMPT_TIPS.map((tip, index) => (
            <div key={index} className="card p-6">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-heading mb-2">Tip {index + 1}</h3>
                  <p className="text-body text-gray-600">{tip}</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="text-center space-y-4">
          <h2 className="text-heading">Ready to Practice?</h2>
          <div className="flex gap-4 justify-center">
            <button onClick={startPractice} className="btn btn-primary btn-lg">
              Start Practice Mode
            </button>
            <button onClick={() => setGameState("menu")} className="btn btn-secondary">
              Back to Menu
            </button>
          </div>
        </section>
      </div>
    );
  }

  if (gameState === "practice") {
    const current = PRACTICE_PROMPTS[currentPractice];
    
    return (
      <div className="space-loose">
        <section className="text-center">
          <h1 className="text-display mb-4">Practice Your Prompts</h1>
          <p className="text-subtitle">
            Exercise {currentPractice + 1} of {PRACTICE_PROMPTS.length}
          </p>
        </section>

        <section className="grid-clean max-w-4xl mx-auto">
          <div className="col-span-1">
            <div className="card p-6">
              <h3 className="text-heading mb-4">Your Task</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Task:</h4>
                  <p className="text-body">{current.task}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Context:</h4>
                  <p className="text-body text-gray-600">{current.context}</p>
                </div>
              </div>
            </div>

            <div className="card p-6 mt-4">
              <h3 className="text-heading mb-4">Your Prompt</h3>
              <textarea
                value={userPrompt}
                onChange={(e) => setUserPrompt(e.target.value)}
                placeholder="Write your prompt here..."
                className="input w-full h-32 resize-none"
              />
              <div className="flex gap-3 mt-4">
                <button 
                  onClick={evaluatePrompt}
                  disabled={!userPrompt.trim()}
                  className="btn btn-primary"
                >
                  Evaluate Prompt
                </button>
                <button 
                  onClick={() => setUserPrompt(current.goodPrompt)}
                  className="btn btn-outline btn-sm"
                >
                  See Example
                </button>
              </div>
            </div>
          </div>

          <div className="col-span-1">
            <div className="card p-6">
              <h3 className="text-heading mb-4">Feedback</h3>
              {feedback ? (
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-body text-blue-800">{feedback}</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">+{score} points</div>
                    <div className="text-caption">Current Score: {score}</div>
                  </div>
                  <button onClick={nextPractice} className="btn btn-primary w-full">
                    {currentPractice < PRACTICE_PROMPTS.length - 1 ? "Next Exercise" : "Complete Practice"}
                  </button>
                </div>
              ) : (
                <div className="text-center text-gray-500 py-8">
                  <p>Write your prompt and click "Evaluate" to get feedback</p>
                </div>
              )}
            </div>

            <div className="card p-6 mt-4">
              <h3 className="text-heading mb-4">What Makes a Good Prompt?</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Be specific about what you want</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Include relevant context</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Use clear, simple language</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                  <p className="text-sm text-gray-600">Provide examples when helpful</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (gameState === "completed") {
    return (
      <div className="space-loose">
        <section className="text-center">
          <h1 className="text-display mb-4">Practice Complete!</h1>
          <p className="text-subtitle max-w-2xl mx-auto">
            Great job completing the prompt engineering practice! You've learned valuable techniques 
            for writing effective AI prompts.
          </p>
        </section>

        <section className="grid-cards max-w-2xl mx-auto">
          <div className="card p-8 text-center">
            <h3 className="text-heading mb-4">Your Results</h3>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-blue-600">{score}</div>
                <div className="text-caption">Total Points Earned</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">{PRACTICE_PROMPTS.length}</div>
                <div className="text-caption">Exercises Completed</div>
              </div>
            </div>
            <div className="flex gap-3 justify-center mt-6">
              <button onClick={resetGame} className="btn btn-primary">
                Practice Again
              </button>
              <button onClick={() => setGameState("menu")} className="btn btn-secondary">
                Back to Menu
              </button>
            </div>
          </div>
        </section>

        <section className="text-center">
          <Link href="/games" className="btn btn-outline">
            Back to Games
          </Link>
        </section>
      </div>
    );
  }

  return null;
}
