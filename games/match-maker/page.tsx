"use client";

import { useMemo, useState, useEffect } from "react";
import Link from "next/link";

// Comprehensive AI terminology glossary
const GLOSSARY = [
  { term: "AI (Artificial Intelligence)", def: "The simulation of human intelligence processes by machines or computer systems", icon: "robot" },
  { term: "Machine Learning", def: "AI subset where algorithms mimic human learning while processing data", icon: "chart" },
  { term: "Deep Learning", def: "Machine learning technique using layered neural networks", icon: "brain" },
  { term: "Neural Network", def: "Deep learning technique resembling human brain structure", icon: "network" },
  { term: "Natural Language Processing", def: "AI that enables computers to understand human language", icon: "chat" },
  { term: "Computer Vision", def: "Enabling computers to understand images and videos", icon: "eye" },
  { term: "Generative AI", def: "AI technology that creates content including text, video, code and images", icon: "paintbrush" },
  { term: "Large Language Model", def: "AI models trained on large amounts of text for natural language understanding", icon: "book" },
  { term: "Algorithm", def: "A set of instructions or rules to complete specific tasks", icon: "gear" },
  { term: "Data Science", def: "Interdisciplinary field using algorithms to analyze large amounts of data", icon: "microscope" },
  { term: "Big Data", def: "Large datasets that reveal patterns and trends for business decisions", icon: "trending" },
  { term: "Data Mining", def: "Examining data to identify patterns and glean insights", icon: "pickaxe" },
  { term: "Predictive Analytics", def: "Technology to predict future events based on historical data", icon: "crystal-ball" },
  { term: "Pattern Recognition", def: "Using algorithms to detect regularities in data", icon: "search" },
  { term: "Supervised Learning", def: "Machine learning that learns from labeled historical data", icon: "teacher" },
  { term: "Unsupervised Learning", def: "Machine learning that looks for data patterns without labels", icon: "search" },
  { term: "Reinforcement Learning", def: "Machine learning that learns through environment interaction", icon: "game" },
  { term: "Transfer Learning", def: "Applying previously learned data to new tasks", icon: "refresh" },
  { term: "Overfitting", def: "When ML algorithms only work on specific training examples", icon: "ruler" },
  { term: "Hyperparameter", def: "Parameters that control the learning process", icon: "sliders" },
  { term: "Training Data", def: "Information given to AI systems to enable learning", icon: "book" },
  { term: "Token", def: "Basic unit of text that LLMs use to understand language", icon: "text" },
  { term: "Prompt", def: "Input that users feed to AI systems for desired results", icon: "edit" },
  { term: "API", def: "Protocols for software applications to interact with each other", icon: "plug" },
  { term: "Chatbot", def: "Software applications that imitate human conversation", icon: "chat" },
  { term: "Voice Recognition", def: "Computers interpreting human speech and producing outputs", icon: "microphone" },
  { term: "Image Recognition", def: "Identifying objects, people, places, or text in images or videos", icon: "image" },
  { term: "Sentiment Analysis", def: "Using AI to analyze tone and opinion in text", icon: "smile" },
  { term: "AI Ethics", def: "Ensuring responsible development and use of AI technology", icon: "scale" },
  { term: "Guardrails", def: "Mechanisms to ensure AI systems operate within ethical boundaries", icon: "shield" },
  { term: "Hallucination", def: "Incorrect responses from AI systems presented as factual", icon: "cloud" },
  { term: "Bias", def: "When answers lean a certain way because of the data the AI learned from", icon: "scale" },
  { term: "Emergent Behavior", def: "Unpredictable AI capabilities from component interactions", icon: "theater" },
  { term: "Turing Test", def: "Test to evaluate machine intelligence equal to humans", icon: "flask" },
  { term: "Quantum Computing", def: "Using quantum-mechanical phenomena for calculations", icon: "atom" },
  { term: "Structured Data", def: "Data that is defined, searchable, and organized", icon: "clipboard" },
  { term: "Unstructured Data", def: "Data that is not organized in any apparent way", icon: "document" },
  { term: "Cognitive Computing", def: "AI systems that mimic human thought processes", icon: "brain" },
  { term: "Limited Memory", def: "AI systems that learn from real-time events and stored data", icon: "database" }
];

function shuffle<T>(arr: T[]) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Success sound effect
function playSuccessSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5
    oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5
    oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5
    
    gainNode.gain.setValueAtTime(0, audioContext.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  } catch (error) {
    // Fallback if audio fails
  }
}

// Icon rendering function
function getIcon(iconName: string) {
  const icons = {
    robot: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
    chart: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    brain: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    network: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    ),
    chat: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
    eye: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
      </svg>
    ),
    paintbrush: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3h10M7 3v4M7 3a2 2 0 00-2 2v12a4 4 0 004 4h0a4 4 0 004-4V5a2 2 0 00-2-2z" />
      </svg>
    ),
    book: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
    gear: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    microscope: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    trending: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    pickaxe: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM7 3h10M7 3v4M7 3a2 2 0 00-2 2v12a4 4 0 004 4h0a4 4 0 004-4V5a2 2 0 00-2-2z" />
      </svg>
    ),
    "crystal-ball": (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    search: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    ),
    teacher: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    game: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    refresh: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
    ),
    ruler: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
    sliders: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 100 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
      </svg>
    ),
    text: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
      </svg>
    ),
    edit: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
      </svg>
    ),
    plug: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    microphone: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    image: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    smile: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    scale: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
    shield: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    cloud: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
      </svg>
    ),
    theater: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m-9 0h10m-10 0a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V6a2 2 0 00-2-2" />
      </svg>
    ),
    flask: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    atom: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    clipboard: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
      </svg>
    ),
    document: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    database: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
      </svg>
    )
  };
  return icons[iconName as keyof typeof icons] || icons.robot;
}

export default function MatchMaker() {
  const [roundKey, setRoundKey] = useState(0);
  const [gameState, setGameState] = useState<"playing" | "checking" | "completed">("playing");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(180); // 3 minutes
  const [streak, setStreak] = useState(0);
  
  // Use only 8 terms for a more compact game that fits on screen
  const gameTerms = useMemo(() => shuffle(GLOSSARY).slice(0, 8), [roundKey]);
  const terms = useMemo(() => shuffle(gameTerms.map(p => p.term)), [roundKey]);
  
  const [placed, setPlaced] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);

  const correctCount = gameTerms.reduce((acc, d, i) => acc + (placed[i] === d.term ? 1 : 0), 0);
  const allPlaced = Object.keys(placed).length === gameTerms.length;
  const accuracy = gameTerms.length > 0 ? (correctCount / gameTerms.length) * 100 : 0;

  // Timer countdown
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && gameState === "playing") {
      setGameState("checking");
      setChecked(true);
    }
  }, [timeLeft, gameState]);

  function onDrop(i: number, term: string) {
    if (gameState !== "playing") return;
    setPlaced(prev => ({ ...prev, [i]: term }));
  }

  function reset() {
    setPlaced({});
    setChecked(false);
    setGameState("playing");
    setTimeLeft(180);
    setStreak(0);
    setRoundKey(k => k + 1);
  }

  function check() {
    setGameState("checking");
    setChecked(true);
    
    if (correctCount === gameTerms.length) {
      playSuccessSound();
      setGameState("completed");
      setScore(prev => prev + Math.max(100, Math.floor(timeLeft / 3))); // Bonus for time remaining
      setStreak(prev => prev + 1);
    }
  }

  function formatTime(seconds: number) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  const getDifficultyColor = (accuracy: number) => {
    if (accuracy >= 90) return "text-green-600";
    if (accuracy >= 70) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Mix & Match</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Match AI terms with their definitions! Drag and drop to learn essential artificial intelligence concepts.
          </p>
        </div>

        {/* Game Stats - Professional Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">{correctCount}/{gameTerms.length}</div>
            <div className="text-sm text-gray-500 font-medium">Correct</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className={`text-2xl font-bold ${getDifficultyColor(accuracy)} mb-1`}>
              {accuracy.toFixed(0)}%
            </div>
            <div className="text-sm text-gray-500 font-medium">Accuracy</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">{formatTime(timeLeft)}</div>
            <div className="text-sm text-gray-500 font-medium">Time</div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">{streak}</div>
            <div className="text-sm text-gray-500 font-medium">Streak</div>
          </div>
        </div>

        {/* Term Bank - Professional Design */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Term Bank</h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {terms.map((term) => {
              const used = Object.values(placed).includes(term);
              const isCorrect = gameTerms.find((item, index) => 
                placed[index] === term && item.term === term
              );
              
              return (
                <div
                  key={term}
                  draggable={!used && gameState === "playing"}
                  onDragStart={(e) => e.dataTransfer.setData("text/plain", term)}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 text-center cursor-grab select-none ${
                    used && checked ? (
                      isCorrect ? 'bg-green-50 border-green-300 text-green-700' :
                      'bg-red-50 border-red-300 text-red-700 opacity-60'
                    ) : used ? (
                      'opacity-40 cursor-not-allowed bg-gray-50 border-gray-200'
                    ) : (
                      'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md hover:bg-blue-50'
                    )
                  }`}
                  title={used ? "Already used" : "Drag me to a definition"}
                >
                  <span className="text-sm font-medium leading-tight">{term}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Definitions + Drop Zones - Professional Grid */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Definitions</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameTerms.map((item, i) => {
              const chosen = placed[i];
              const correct = chosen && chosen === item.term;
              const wrong = chosen && chosen !== item.term;
              
              return (
                <div 
                  key={i} 
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    checked && correct ? 'border-green-300 bg-green-50' :
                    checked && wrong ? 'border-red-300 bg-red-50' :
                    chosen ? 'border-blue-300 bg-blue-50' :
                    'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      {getIcon(item.icon)}
                    </div>
                    <div className="text-sm text-gray-700 leading-relaxed flex-1">{item.def}</div>
                  </div>
                  
                  {/* Drop Zone */}
                  <div
                    className={`min-h-[40px] rounded-lg border-2 border-dashed flex items-center justify-center text-sm transition-all duration-200 ${
                      checked && correct ? 'border-green-400 bg-green-100' :
                      checked && wrong ? 'border-red-400 bg-red-100' :
                      chosen ? 'border-blue-400 bg-blue-100' :
                      'border-gray-300 bg-white hover:border-blue-400 hover:bg-blue-50'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      const term = e.dataTransfer.getData("text/plain");
                      if (term) onDrop(i, term);
                    }}
                  >
                    {chosen ? (
                      <span className={`font-medium text-center px-3 py-1 rounded ${
                        checked && correct ? 'text-green-700' :
                        checked && wrong ? 'text-red-700' :
                        'text-blue-700'
                      }`}>
                        {chosen}
                      </span>
                    ) : (
                      <span className="text-gray-400">Drop term here</span>
                    )}
                  </div>
                  
                  {/* Feedback */}
                  {checked && (
                    <div className="mt-3 text-sm">
                      {correct ? (
                        <span className="text-green-600 flex items-center gap-2 justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Correct!
                        </span>
                      ) : wrong ? (
                        <span className="text-red-600 flex items-center gap-2 justify-center">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          Should be: <span className="font-medium">{item.term}</span>
                        </span>
                      ) : null}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Game Controls */}
        <div className="flex flex-wrap gap-4 justify-center mb-8">
          {gameState === "playing" && (
            <>
              <button 
                className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" 
                onClick={check} 
                disabled={!allPlaced}
              >
                {allPlaced ? "Check Answers" : `Place ${gameTerms.length - Object.keys(placed).length} more`}
              </button>
              <button 
                className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors" 
                onClick={reset}
              >
                New Game
              </button>
            </>
          )}
          
          {gameState === "checking" && (
            <button 
              className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors" 
              onClick={reset}
            >
              Play Again
            </button>
          )}
          
          {gameState === "completed" && (
            <div className="text-center w-full">
              <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Game Complete!</h1>
              <p className="text-xl text-gray-600 mb-6">Great job matching all the terms!</p>
              <div className="flex gap-4 justify-center">
                <button 
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors" 
                  onClick={reset}
                >
                  Play Again
                </button>
                <Link 
                  href="/lesson/ai-fundamentals" 
                  className="px-6 py-3 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Learn More
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="text-center">
          <Link 
            href="/games" 
            className="inline-flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Games
          </Link>
        </div>
      </div>
    </div>
  );
}
