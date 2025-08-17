import Link from "next/link";

// Simple Game Card Component
function GameCard({ 
  title, 
  description, 
  href, 
  icon
}: {
  title: string;
  description: string;
  href: string;
  icon: string;
}) {
  return (
    <Link href={href} className="block p-6 bg-white rounded-xl border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed pb-1">{description}</p>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Master AI Fundamentals
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-6 leading-relaxed max-w-3xl mx-auto">
            Level up your AI skills — one game at a time
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/lesson/ai-fundamentals" className="btn btn-primary btn-xl">
              Start Learning
            </Link>
            <Link href="/lesson/ai-fundamentals" className="btn btn-outline btn-xl">
              Study Terms
            </Link>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">What You'll Learn</h2>
            <p className="text-gray-600 text-lg leading-relaxed pb-1">Essential AI concepts made simple and memorable</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">AI Fundamentals</h3>
              <p className="text-gray-600 leading-relaxed pb-1">Core concepts like machine learning, neural networks, and how AI systems work</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">Prompt Engineering</h3>
              <p className="text-gray-600 leading-relaxed pb-1">Learn to communicate effectively with AI tools for better results</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">Practical Skills</h3>
              <p className="text-gray-600 leading-relaxed pb-1">Real-world applications and hands-on experience with AI technologies</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">40+</div>
              <p className="text-gray-600">AI Concepts</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">6</div>
              <p className="text-gray-600">Interactive Games</p>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <p className="text-gray-600">Beginner Friendly</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Games */}
      <section className="py-12 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-3 leading-tight">Start Playing</h2>
            <p className="text-gray-600 text-lg leading-relaxed pb-1">Choose your learning adventure</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <GameCard 
              title="AI Concept Matcher"
              description="Match AI terms with their definitions in this engaging memory game"
              href="/games/ai-concept-matcher"
              icon="🧠"
            />
            <GameCard 
              title="Mix & Match"
              description="Connect AI terminology with their meanings in this interactive puzzle"
              href="/games/match-maker"
              icon="🔗"
            />
            <GameCard 
              title="Prompt Builder"
              description="Learn to craft effective prompts for AI systems through hands-on practice"
              href="/games/prompt-builder"
              icon="✍️"
            />
            <GameCard 
              title="Crossword Puzzle"
              description="Solve AI-themed crossword puzzles to reinforce your knowledge"
              href="/games/crossword"
              icon="📝"
            />
            <GameCard 
              title="Token Buster"
              description="Understand how AI processes text through token-based challenges"
              href="/games/token-buster"
              icon="🔤"
            />
            <GameCard 
              title="Prompt Debugger"
              description="Debug and improve AI prompts through systematic analysis"
              href="/games/prompt-debugger"
              icon="🐛"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
