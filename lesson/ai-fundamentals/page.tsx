"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMemo } from "react";

const AI_TERMS = [
  {
    id: "ai",
    title: "AI (Artificial Intelligence)",
    description: "The simulation of human intelligence processes by machines or computer systems",
    content: {
      definition: "AI stands for artificial intelligence, which is the simulation of human intelligence processes by machines or computer systems. AI aims to mimic and ultimately surpass human capabilities such as communication, learning, and decision-making.",
      learnMore: "Expand your understanding of intelligent systems."
    }
  },
  {
    id: "ai-ethics",
    title: "AI Ethics",
    description: "Ensuring responsible development and use of AI technology",
    content: {
      definition: "AI ethics refers to the issues that AI stakeholders such as engineers and government officials must consider to ensure that the technology is developed and used responsibly. This means adopting and implementing systems that support a safe, secure, unbiased, and environmentally friendly approach to artificial intelligence.",
      learnMore: "Navigate the complexities of moral guidelines in technology."
    }
  },
  {
    id: "algorithm",
    title: "Algorithm",
    description: "A set of instructions or rules to complete specific tasks",
    content: {
      definition: "An algorithm is a set of instructions or rules to follow in order to complete a specific task. Algorithms can be particularly useful when you're working with big data or machine learning. Data analysts may use algorithms to organize or analyze data, while data scientists may use algorithms to make predictions or build models.",
      learnMore: "Understand how algorithms power AI systems."
    }
  },
  {
    id: "api",
    title: "Application Programming Interface (API)",
    description: "Protocols for software applications to interact with each other",
    content: {
      definition: "An API, or application programming interface, is a set of protocols that determine how two software applications will interact with each other. APIs tend to be written in programming languages such as C++ or JavaScript.",
      learnMore: "Discover how to integrate AI functionalities into applications."
    }
  },
  {
    id: "big-data",
    title: "Big Data",
    description: "Large datasets that reveal patterns and trends for business decisions",
    content: {
      definition: "Big data refers to the large data sets that can be studied to reveal patterns and trends to support business decisions. It's called 'big' data because organizations can now gather massive amounts of complex data using data collection tools and systems. Big data can be collected very quickly and stored in a variety of formats.",
      learnMore: "Unlock the power of large datasets by exploring AI analytics."
    }
  },
  {
    id: "chatbot",
    title: "Chatbot",
    description: "Software applications that imitate human conversation",
    content: {
      definition: "A chatbot is a software application that is designed to imitate human conversation through text or voice commands.",
      learnMore: "Learn to design and deploy interactive AI assistants with Chatbot Development."
    }
  },
  {
    id: "cognitive-computing",
    title: "Cognitive Computing",
    description: "AI systems that mimic human thought processes",
    content: {
      definition: "Cognitive computing is essentially the same as AI. It's a computerized model that focuses on mimicking human thought processes such as understanding natural language, pattern recognition, and learning. Marketing teams sometimes use this term to eliminate the sci-fi mystique of AI.",
      learnMore: "Explore how computers can think like humans."
    }
  },
  {
    id: "computer-vision",
    title: "Computer Vision",
    description: "Enabling computers to understand images and videos",
    content: {
      definition: "Computer vision is an interdisciplinary field of science and technology that focuses on how computers can gain understanding from images and videos. For AI engineers, computer vision allows them to automate activities that the human visual system typically performs.",
      learnMore: "Explore the techniques to enable machines to interpret visual data."
    }
  },
  {
    id: "data-mining",
    title: "Data Mining",
    description: "Examining data to identify patterns and glean insights",
    content: {
      definition: "Data mining is the process of closely examining data to identify patterns and glean insights. Data mining is a central aspect of data analytics; the insights you find during the mining process will inform your business recommendations.",
      learnMore: "Uncover patterns and insights from large datasets with data mining."
    }
  },
  {
    id: "data-science",
    title: "Data Science",
    description: "Interdisciplinary field using algorithms to analyze large amounts of data",
    content: {
      definition: "Data science is an interdisciplinary field of technology that uses algorithms and processes to gather and analyze large amounts of data to uncover patterns and insights that inform business decisions.",
      learnMore: "Explore the intersection of statistics, machine learning, and data analysis."
    }
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    description: "Machine learning technique using layered neural networks",
    content: {
      definition: "Deep learning is a machine learning technique that layers algorithms and computing units—or neurons—into what is called an artificial neural network (ANN). Unlike machine learning, deep learning algorithms can improve incorrect outcomes through repetition without human intervention. These deep neural networks take inspiration from the structure of the human brain.",
      learnMore: "Master complex neural networks and advanced AI models with deep learning."
    }
  },
  {
    id: "emergent-behavior",
    title: "Emergent Behavior",
    description: "Unpredictable AI capabilities from component interactions",
    content: {
      definition: "Emergent behavior, also called emergence, is when an AI system shows unpredictable or unintended capabilities that only occur when individual parts interact as a wider whole.",
      learnMore: "Understand how complex behaviors emerge from simple AI components."
    }
  },
  {
    id: "generative-ai",
    title: "Generative AI",
    description: "AI technology that creates content including text, video, code and images",
    content: {
      definition: "Generative AI is a type of technology that uses AI to create content, including text, video, code and images. A generative AI system is trained using large amounts of data, so that it can find patterns for generating new content.",
      learnMore: "Learn how to create advanced synthetic content and models with generative AI."
    }
  },
  {
    id: "guardrails",
    title: "Guardrails",
    description: "Mechanisms to ensure AI systems operate within ethical boundaries",
    content: {
      definition: "Guardrails are mechanisms and frameworks designed to ensure that AI systems operate within ethical, legal, and technical boundaries. They prevent AI from causing harm, making biased decisions, or being misused.",
      learnMore: "Learn how to implement safety measures in AI systems."
    }
  },
  {
    id: "hallucination",
    title: "Hallucination",
    description: "Incorrect responses from AI systems presented as factual",
    content: {
      definition: "Hallucination refers to an incorrect response from an AI system, or false information in an output that is presented as factual information.",
      learnMore: "Understand how to detect and prevent AI hallucinations."
    }
  },
  {
    id: "hyperparameter",
    title: "Hyperparameter",
    description: "Parameters that control the learning process",
    content: {
      definition: "Hyperparameters are parameters whose values control the learning process and determine the values of model parameters that a learning algorithm ends up learning.",
      learnMore: "Master the art of tuning AI models for optimal performance."
    }
  },
  {
    id: "image-recognition",
    title: "Image Recognition",
    description: "Identifying objects, people, places, or text in images or videos",
    content: {
      definition: "Image recognition is the process of identifying an object, person, place, or text in an image or video.",
      learnMore: "Explore computer vision techniques for image analysis."
    }
  },
  {
    id: "large-language-model",
    title: "Large Language Model (LLM)",
    description: "AI models trained on large amounts of text for natural language understanding",
    content: {
      definition: "A large language model (LLM) is an AI model that has been trained on large amounts of text so that it can understand natural language and generate human-like text.",
      learnMore: "Explore the power of language understanding and generation with large language models like GPT and BERT."
    }
  },
  {
    id: "limited-memory",
    title: "Limited Memory",
    description: "AI systems that learn from real-time events and stored data",
    content: {
      definition: "Limited memory is a type of AI system that receives knowledge from real-time events and stores it in a database to make better predictions.",
      learnMore: "Understand how AI systems maintain and use memory."
    }
  },
  {
    id: "machine-learning",
    title: "Machine Learning",
    description: "AI subset where algorithms mimic human learning while processing data",
    content: {
      definition: "Machine learning is a subset of AI in which algorithms mimic human learning while processing data. With machine learning, algorithms can improve over time, becoming increasingly accurate when making predictions or classifications, without human assistance. Machine learning focuses on developing algorithms and models that help machines learn from data and predict trends and behaviors, without human assistance.",
      learnMore: "Unlock the potential of predictive analytics and algorithmic processing with machine learning."
    }
  },
  {
    id: "natural-language-processing",
    title: "Natural Language Processing (NLP)",
    description: "AI that enables computers to understand human language",
    content: {
      definition: "Natural language processing (NLP) is a type of AI that enables computers to understand spoken and written human language. NLP enables features like text and speech recognition on devices.",
      learnMore: "Enhance your understanding of how machines process human language with Natural Language Processing (NLP)."
    }
  },
  {
    id: "neural-network",
    title: "Neural Network",
    description: "Deep learning technique resembling human brain structure",
    content: {
      definition: "A neural network is a deep learning technique designed to resemble the structure of the human brain. It requires large data sets to perform calculations and create outputs, which enables features like speech and vision recognition.",
      learnMore: "Dive into the fundamentals and advanced concepts of artificial neural networks."
    }
  },
  {
    id: "overfitting",
    title: "Overfitting",
    description: "When ML algorithms only work on specific training examples",
    content: {
      definition: "Overfitting occurs in machine learning training when the algorithm can only work on specific examples within the training data, rendering it unable to make accurate predictions on new data.",
      learnMore: "Learn how to prevent overfitting in machine learning models."
    }
  },
  {
    id: "pattern-recognition",
    title: "Pattern Recognition",
    description: "Using algorithms to detect regularities in data",
    content: {
      definition: "Pattern recognition is the method of using computer algorithms to analyze, detect, and label regularities in data. This informs how the data gets classified into different categories.",
      learnMore: "Master the techniques for identifying patterns in complex datasets."
    }
  },
  {
    id: "predictive-analytics",
    title: "Predictive Analytics",
    description: "Technology to predict future events based on historical data",
    content: {
      definition: "Predictive analytics is a type of analytics that uses technology to predict what will happen in a specific time frame based on historical data and patterns.",
      learnMore: "Learn to forecast trends and behaviors by mastering predictive analytics."
    }
  },
  {
    id: "prescriptive-analytics",
    title: "Prescriptive Analytics",
    description: "Technology to help organizations make better strategic decisions",
    content: {
      definition: "Prescriptive analytics is a type of analytics that uses technology to analyze data for factors such as possible situations and scenarios, past and present performance, and other resources to help organizations make better strategic decisions.",
      learnMore: "Understand how to use data to guide strategic decision-making."
    }
  },
  {
    id: "prompt",
    title: "Prompt",
    description: "Input that users feed to AI systems for desired results",
    content: {
      definition: "A prompt is an input that a user feeds to an AI system in order to get a desired result or output.",
      learnMore: "Master the art of writing effective AI prompts."
    }
  },
  {
    id: "quantum-computing",
    title: "Quantum Computing",
    description: "Using quantum-mechanical phenomena for calculations",
    content: {
      definition: "Quantum computing is the process of using quantum-mechanical phenomena such as entanglement and superposition to perform calculations. Quantum machine learning uses these algorithms on quantum computers to expedite work because it performs much faster than a classic machine learning program and computer.",
      learnMore: "Explore the future of computing with quantum technologies."
    }
  },
  {
    id: "reinforcement-learning",
    title: "Reinforcement Learning",
    description: "Machine learning that learns through environment interaction",
    content: {
      definition: "Reinforcement learning is a type of machine learning that learns by interacting with its environment and receiving positive reinforcement for correct predictions and negative reinforcement for incorrect predictions. This type of machine learning may be used to develop autonomous vehicles. Common algorithms are temporal difference, deep adversarial networks, and Q-learning.",
      learnMore: "Dive into training models through rewards and penalties with reinforcement learning."
    }
  },
  {
    id: "sentiment-analysis",
    title: "Sentiment Analysis",
    description: "Using AI to analyze tone and opinion in text",
    content: {
      definition: "Also known as opinion mining, sentiment analysis is the process of using AI to analyze the tone and opinion of a given text.",
      learnMore: "Learn how to interpret and analyze emotions in text data with sentiment analysis."
    }
  },
  {
    id: "structured-data",
    title: "Structured Data",
    description: "Data that is defined, searchable, and organized",
    content: {
      definition: "Structured data is data that is defined and searchable. Structured data is formatted data; for example, data that is organized into rows and columns. Structured data is typically easier to analyze than unstructured data because of its tidy formatting. This includes data like phone numbers, dates, and product SKUs.",
      learnMore: "Understand how to work with organized data formats."
    }
  },
  {
    id: "supervised-learning",
    title: "Supervised Learning",
    description: "Machine learning that learns from labeled historical data",
    content: {
      definition: "Supervised learning is a type of machine learning that learns from labeled historical input and output data. It's 'supervised' because you are feeding it labeled information. This type of machine learning may be used to predict real estate prices or find disease risk factors. Common algorithms used during supervised learning are neural networks, decision trees, linear regression, and support vector machines.",
      learnMore: "Develop skills in training models on labeled data with supervised learning."
    }
  },
  {
    id: "token",
    title: "Token",
    description: "Basic unit of text that LLMs use to understand language",
    content: {
      definition: "A token is a basic unit of text that an LLM uses to understand and generate language. A token may be an entire word or parts of a word.",
      learnMore: "Understand how AI processes and generates text at the token level."
    }
  },
  {
    id: "training-data",
    title: "Training Data",
    description: "Information given to AI systems to enable learning",
    content: {
      definition: "Training data is the information or examples given to an AI system to enable it to learn, find patterns, and create new content.",
      learnMore: "Learn how to prepare and use effective training datasets."
    }
  },
  {
    id: "transfer-learning",
    title: "Transfer Learning",
    description: "Applying previously learned data to new tasks",
    content: {
      definition: "Transfer learning is a machine learning system that takes existing, previously learned data and applies it to new tasks and activities.",
      learnMore: "Master the technique of leveraging existing knowledge for new problems."
    }
  },
  {
    id: "turing-test",
    title: "Turing Test",
    description: "Test to evaluate machine intelligence equal to humans",
    content: {
      definition: "The Turing test was created by computer scientist Alan Turing to evaluate a machine's ability to exhibit intelligence equal to humans, especially in language and behavior. When facilitating the test, a human evaluator judges conversations between a human and machine. If the evaluator cannot distinguish between responses, then the machine passes the Turing test.",
      learnMore: "Explore the history and significance of the Turing test."
    }
  },
  {
    id: "unstructured-data",
    title: "Unstructured Data",
    description: "Data that is not organized in any apparent way",
    content: {
      definition: "Unstructured data is data that is not organized in any apparent way. In order to analyze unstructured data, you'll typically need to implement some type of structured organization.",
      learnMore: "Learn techniques for working with messy, unorganized data."
    }
  },
  {
    id: "unsupervised-learning",
    title: "Unsupervised Learning",
    description: "Machine learning that looks for data patterns without labels",
    content: {
      definition: "Unsupervised learning is a machine learning type that looks for data patterns. Unlike supervised learning, unsupervised learning doesn't learn from labeled data. This type of machine learning is often used to develop predictive models and to create clusters. For example, you can use unsupervised learning to group customers based on purchase behavior, and then make product recommendations based on the purchasing patterns of similar customers. Hidden Markov models, k-means, hierarchical clustering, and Gaussian mixture models are common algorithms used during unsupervised learning.",
      learnMore: "Explore the techniques for analyzing unlabeled data sets with unsupervised learning."
    }
  },
  {
    id: "voice-recognition",
    title: "Voice Recognition",
    description: "Computers interpreting human speech and producing outputs",
    content: {
      definition: "Voice recognition, also called speech recognition, is a method of human-computer interaction in which computers listen and interpret human dictation (speech) and produce written or spoken outputs. Examples of voice recognition include Apple's Siri and Amazon's Alexa.",
      learnMore: "Understand how AI processes and responds to human speech."
    }
  }
];

const QUIZ_QUESTIONS = [
  {
    question: "What does AI stand for and what is its primary goal?",
    options: [
      "Artificial Intelligence - to replace human workers",
      "Artificial Intelligence - to simulate human intelligence processes by machines",
      "Automated Intelligence - to automate business processes",
      "Advanced Intelligence - to create supercomputers"
    ],
    correct: 1
  },
  {
    question: "Which of the following is NOT a type of machine learning?",
    options: [
      "Supervised learning",
      "Unsupervised learning",
      "Reinforcement learning",
      "Quantum learning"
    ],
    correct: 3
  },
  {
    question: "What is the main difference between machine learning and deep learning?",
    options: [
      "Deep learning is faster than machine learning",
      "Deep learning uses neural networks with multiple layers",
      "Machine learning requires more data than deep learning",
      "There is no difference between them"
    ],
    correct: 1
  },
  {
    question: "What is the purpose of guardrails in AI systems?",
    options: [
      "To make AI systems run faster",
      "To ensure AI systems operate within ethical and legal boundaries",
      "To reduce the cost of AI development",
      "To make AI systems more creative"
    ],
    correct: 1
  },
  {
    question: "What is a prompt in the context of AI systems?",
    options: [
      "A type of AI algorithm",
      "An input that users feed to AI systems for desired results",
      "A measure of AI performance",
      "A type of neural network"
    ],
    correct: 1
  },
  {
    question: "Which technology enables computers to understand images and videos?",
    options: [
      "Natural Language Processing",
      "Computer Vision",
      "Voice Recognition",
      "Sentiment Analysis"
    ],
    correct: 1
  },
  {
    question: "What is the primary purpose of data mining?",
    options: [
      "To store large amounts of data",
      "To examine data and identify patterns for insights",
      "To delete unnecessary data",
      "To encrypt sensitive data"
    ],
    correct: 1
  },
  {
    question: "Which AI technology creates content including text, video, code and images?",
    options: [
      "Computer Vision",
      "Generative AI",
      "Machine Learning",
      "Neural Networks"
    ],
    correct: 1
  },
  {
    question: "What is the main advantage of deep learning over traditional machine learning?",
    options: [
      "It requires less data",
      "It can improve outcomes through repetition without human intervention",
      "It's faster to train",
      "It uses less computational power"
    ],
    correct: 1
  },
  {
    question: "Which of the following best describes an algorithm?",
    options: [
      "A type of computer hardware",
      "A set of instructions to complete specific tasks",
      "A programming language",
      "A database system"
    ],
    correct: 1
  }
];

// Flashcard Component
function Flashcard({ 
  term, 
  definition, 
  currentIndex, 
  totalCards, 
  onPrevious, 
  onNext 
}: { 
  term: string; 
  definition: string; 
  currentIndex: number; 
  totalCards: number; 
  onPrevious: () => void; 
  onNext: () => void; 
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Reset card to front side when navigating to a new card
  useEffect(() => {
    setIsFlipped(false);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Left Arrow */}
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 w-12 h-12 rounded-full shadow-lg border border-gray-200 transition-all duration-200 flex items-center justify-center ${
          currentIndex === 0 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-600 hover:text-gray-900 hover:shadow-xl'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      {/* Right Arrow */}
      <button
        onClick={onNext}
        disabled={currentIndex === totalCards - 1}
        className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 w-12 h-12 rounded-full shadow-lg border border-gray-200 transition-all duration-200 flex items-center justify-center ${
          currentIndex === totalCards - 1 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : 'bg-white text-gray-600 hover:text-gray-900 hover:shadow-xl'
        }`}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Flashcard */}
      <div
        className="w-full h-64 cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className="relative w-full h-full transition-all duration-500">
          {/* Front of card */}
          <div className={`absolute w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex items-center justify-center transition-all duration-500 ${
            isFlipped ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
          }`}>
            <h2 className="text-3xl font-bold text-gray-900 text-center leading-tight">
              {term}
            </h2>
          </div>

          {/* Back of card */}
          <div className={`absolute w-full h-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 flex items-center justify-center transition-all duration-500 ${
            isFlipped ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <p className="text-lg text-gray-700 text-center leading-relaxed">
              {definition}
            </p>
          </div>
        </div>
      </div>

      {/* Card counter */}
      <div className="text-center mt-6">
        <span className="text-sm text-gray-500">Click to flip • {currentIndex + 1} of {totalCards}</span>
      </div>
    </div>
  );
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

// Quiz Component
function Quiz({ questions }: { questions: typeof AI_TERMS }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const currentQ = questions[currentQuestion];
  const shuffledAnswers = useMemo(() => {
    const answers = [
      currentQ.content.definition,
      questions[(currentQuestion + 1) % questions.length].content.definition,
      questions[(currentQuestion + 2) % questions.length].content.definition,
      questions[(currentQuestion + 3) % questions.length].content.definition
    ];
    return answers.sort(() => Math.random() - 0.5);
  }, [currentQuestion, questions]);

  const handleAnswerSelect = (answerIndex: number) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answerIndex);
    setAttempts(attempts + 1);
    
    if (shuffledAnswers[answerIndex] === currentQ.content.definition) {
      // Correct answer on first or second attempt
      setIsAnswered(true);
      setScore(score + 1);
      setStreak(streak + 1);
      
      // Play sparkle sound for correct answer
      playSparkleSound();
    } else if (attempts === 0) {
      // First wrong attempt - allow second try
      setSelectedAnswer(null);
      // Don't set isAnswered yet, allow second attempt
    } else {
      // Second wrong attempt - question is over
      setIsAnswered(true);
      setStreak(0);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setAttempts(0);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAttempts(0);
    setScore(0);
    setStreak(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="max-w-2xl mx-auto text-center">
        <div className="card card-elevated p-8">
          <div className="w-24 h-24 bg-gradient-to-r from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-display text-gradient mb-4">Quiz Complete!</h2>
          <div className="space-y-4 mb-8">
            <p className="text-heading">Final Score: <span className="text-blue-600 font-bold">{score}/{questions.length}</span></p>
            <p className="text-body text-gray-600">
              {score === questions.length ? "Perfect! You're an AI expert!" :
               score >= questions.length * 0.8 ? "Great job! You have a solid understanding!" :
               score >= questions.length * 0.6 ? "Good work! Keep studying to improve!" :
               "Keep practicing! Review the flashcards to strengthen your knowledge!"}
            </p>
          </div>
          <button
            onClick={handleRestart}
            className="btn btn-primary btn-lg"
          >
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-caption text-gray-600">Question {currentQuestion + 1} of {questions.length}</span>
          <span className="text-caption text-gray-600">Score: {score} | Streak: {streak}</span>
        </div>
        <div className="progress-container">
          <div 
            className="progress-fill bg-blue-500" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="card card-elevated p-8 mb-8">
        <h3 className="text-heading text-center mb-8">
          What is <span className="text-gradient">{currentQ.title}</span>?
        </h3>

        {/* Attempts indicator */}
        <div className="text-center mb-6">
          {attempts === 0 ? (
            <span className="text-sm text-gray-600">First attempt</span>
          ) : attempts === 1 ? (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg">
              <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <span className="text-sm font-semibold text-amber-700">Second attempt</span>
            </div>
          ) : (
            <span className="text-sm text-gray-600">Final answer</span>
          )}
        </div>

        {/* Answer Options */}
        <div className="space-y-4">
          {shuffledAnswers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(index)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? isAnswered && answer === currentQ.content.definition
                    ? 'border-green-500 bg-green-50 text-green-800'
                    : isAnswered && answer !== currentQ.content.definition
                    ? 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50 text-blue-800'
                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
              } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              {answer}
            </button>
          ))}
        </div>

        {/* Feedback */}
        {isAnswered && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            {selectedAnswer !== null && shuffledAnswers[selectedAnswer] === currentQ.content.definition ? (
              <div className="flex items-center text-green-600">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">
                  {attempts === 1 ? "Correct on first try! Excellent!" : "Correct on second try! Good job!"}
                </span>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center text-red-600">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Incorrect after 2 attempts. The correct answer is highlighted above.</span>
                </div>
                <div className="text-sm text-gray-600">
                  <strong>Correct Answer:</strong> {currentQ.content.definition}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="text-center">
        <button
          onClick={handleNextQuestion}
          disabled={!isAnswered}
          className={`btn btn-lg ${
            isAnswered ? 'btn-primary' : 'btn-ghost cursor-not-allowed'
          }`}
        >
          {currentQuestion < questions.length - 1 ? 'Next Question' : 'See Results'}
        </button>
      </div>
    </div>
  );
}

export default function AIFundamentalsPage() {
  const [mode, setMode] = useState<"menu" | "flashcards" | "quiz">("menu");
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [quizScore, setQuizScore] = useState<{ score: number; total: number } | null>(null);

  const handleCardFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNextCard = () => {
    if (currentCard < AI_TERMS.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const handlePrevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        handlePrevCard();
      } else if (event.key === 'ArrowRight') {
        handleNextCard();
      } else if (event.key === ' ') {
        event.preventDefault();
        // Space bar to flip card
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentCard]);

  const handleQuizComplete = (score: number, total: number) => {
    setQuizScore({ score, total });
  };

  const resetQuiz = () => {
    setQuizScore(null);
    setMode("quiz");
  };

  if (mode === "menu") {
    return (
      <div className="space-modern">
        {/* Header */}
        <section className="text-center">
          <h1 className="text-hero text-gradient mb-4 pb-2 mt-12">AI Terminology Fundamentals</h1>
          <p className="text-subtitle max-w-4xl mx-auto">
            Master the essential vocabulary of Artificial Intelligence through interactive flashcards and comprehensive quizzes. 
            Understanding these terms is crucial for leveraging AI's full potential and staying current with emerging trends.
          </p>
        </section>

        {/* Learning Options */}
        <section className="container-modern">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Flashcards Option */}
            <div className="card card-interactive p-8 text-center hover-lift flex flex-col">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h2 className="text-display mb-4">Study with Flashcards</h2>
              <div className="flex-grow flex flex-col justify-start">
                <p className="text-body text-gray-600 mb-6">
                  Flip through 40 AI terms with detailed definitions. Perfect for building a solid foundation 
                  in artificial intelligence concepts.
                </p>
                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span>40 AI Terms</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <span>Detailed Definitions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <span>Interactive Learning</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => setMode("flashcards")}
                  className="btn btn-primary btn-lg w-full"
                >
                  Start Studying
                </button>
              </div>
            </div>

            {/* Quiz Option */}
            <div className="card card-interactive p-8 text-center hover-lift flex flex-col">
              <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h2 className="text-display mb-4">Take the Quiz</h2>
              <div className="flex-grow flex flex-col justify-start">
                <p className="text-body text-gray-600 mb-6">
                  Test your knowledge with 10 multiple-choice questions covering key AI concepts. 
                  Track your progress and build your confidence.
                </p>
                <div className="space-y-3 text-sm text-gray-500 mb-6">
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>10 Questions</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Score Tracking</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span>Streak Building</span>
                  </div>
                </div>
              </div>
              <div className="mt-auto">
                <button 
                  onClick={() => setMode("quiz")}
                  className="btn btn-secondary btn-lg w-full"
                >
                  Start Quiz
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="text-center">
          <Link href="/games" className="btn btn-outline btn-lg">
            Continue to Games
          </Link>
        </section>
      </div>
    );
  }

  if (mode === "flashcards") {
    return (
      <div className="space-clean">
        {/* Flashcard Header */}
        <section className="card p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMode("menu")}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div>
                <h2 className="text-heading">AI Terminology Flashcards</h2>
                <div className="text-caption text-gray-500">
                  Card {currentCard + 1} of {AI_TERMS.length}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevCard}
                disabled={currentCard === 0}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${((currentCard + 1) / AI_TERMS.length) * 100}%` }}
                ></div>
              </div>
              <button
                onClick={handleNextCard}
                disabled={currentCard === AI_TERMS.length - 1}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </section>

        {/* Flashcards */}
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">AI Terminology Flashcards</h2>
            <p className="text-gray-600">Click on a card to flip it and reveal the definition</p>
            <div className="mt-4 text-sm text-gray-500">
              Card {currentCard + 1} of {AI_TERMS.length}
            </div>
          </div>

          {/* Flashcard */}
          <Flashcard 
            term={AI_TERMS[currentCard].title} 
            definition={AI_TERMS[currentCard].content.definition} 
            currentIndex={currentCard}
            totalCards={AI_TERMS.length}
            onPrevious={handlePrevCard}
            onNext={handleNextCard}
          />

          {/* Flashcard Controls */}
          <div className="flex justify-center gap-4 mt-6">
            <button 
              onClick={() => setMode("menu")}
              className="btn btn-outline"
            >
              Back to Menu
            </button>
            <button 
              onClick={() => setMode("quiz")}
              className="btn btn-secondary"
            >
              Take Quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (mode === "quiz") {
    if (quizScore) {
      return (
        <div className="space-clean">
          <div className="card p-8 text-center">
            <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h1 className="text-display mb-4">Quiz Complete!</h1>
            <div className="space-y-6 mb-8">
              <div className="text-6xl font-bold text-blue-600">
                {quizScore.score}/{quizScore.total}
              </div>
              <div className="text-2xl">
                {quizScore.score >= 8 ? "Excellent! You're an AI expert!" : 
                 quizScore.score >= 6 ? "Good job! Keep learning!" : 
                 "Keep studying! You'll get there!"}
              </div>
              <div className="text-body text-gray-600">
                {quizScore.score >= 8 
                  ? "You've mastered the AI terminology fundamentals!"
                  : quizScore.score >= 6 
                  ? "Good progress! Review the flashcards to improve."
                  : "Take your time to review the material. Learning takes practice!"
                }
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <button onClick={resetQuiz} className="btn btn-primary btn-lg">
                Try Again
              </button>
              <button onClick={() => setMode("flashcards")} className="btn btn-secondary btn-lg">
                Study Flashcards
              </button>
              <button onClick={() => setMode("menu")} className="btn btn-outline btn-lg">
                Back to Menu
              </button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-clean">
        {/* Quiz Header */}
        <div className="card p-6 mb-6">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => setMode("menu")}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors duration-200"
            >
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-heading">AI Terminology Quiz</h2>
            <div className="text-right">
              <div className="text-sm text-gray-500">Progress</div>
            </div>
          </div>
        </div>

        <Quiz questions={AI_TERMS} />
      </div>
    );
  }

  return null;
}
