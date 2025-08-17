import Link from "next/link";

// Game data with difficulty, players, and descriptions
const GAMES = [
  {
    id: "ai-concept-matcher",
    title: "AI Concept Matcher",
    description: "Match AI terms with their definitions in this fast-paced learning game. Test your knowledge and improve your understanding.",
    icon: "target",
    difficulty: "Easy",
    players: 1247,
    color: "blue",
    href: "/games/ai-concept-matcher"
  },
  {
    id: "prompt-builder",
    title: "Prompt Builder",
    description: "Learn to write quality prompts fast and compete for the best time and grade. Master the art of AI communication.",
    icon: "build",
    difficulty: "Medium",
    players: 892,
    color: "purple",
    href: "/games/prompt-builder"
  },
  {
    id: "match-maker",
    title: "Mix & Match",
    description: "Match AI terms to simple explanations—learn by pairing concepts. Perfect for beginners starting their AI journey.",
    icon: "link",
    difficulty: "Easy",
    players: 1563,
    color: "green",
    href: "/games/match-maker"
  },
  {
    id: "crossword",
    title: "AI Crossword",
    description: "Fill the grid with beginner-friendly AI clues. Arrow keys supported for easy navigation.",
    icon: "puzzle",
    difficulty: "Easy",
    players: 987,
    color: "orange",
    href: "/games/crossword"
  },
  {
    id: "token-buster",
    title: "Token Buster",
    description: "Beat the budget by choosing concise prompts that save tokens. Learn efficiency in AI communication.",
    icon: "diamond",
    difficulty: "Hard",
    players: 456,
    color: "red",
    href: "/games/token-buster"
  },
  {
    id: "neural-network-builder",
    title: "GenAI Prompt Builder",
    description: "Learn to write amazing prompts that get the best results from AI tools through guided practice.",
    icon: "write",
    difficulty: "Easy",
    players: 723,
    color: "indigo",
    href: "/games/neural-network-builder"
  },
  {
    id: "prompt-debugger",
    title: "Prompt Debugger",
    description: "Analyze and improve existing prompts to get better results from AI tools.",
    icon: "search",
    difficulty: "Medium",
    players: 389,
    color: "teal",
    href: "/games/prompt-debugger"
  }
];



// Game card component
function GameCard({ game }: { game: typeof GAMES[0] }) {
  const colorClasses = {
    blue: "hover:shadow-blue-500/25",
    purple: "hover:shadow-purple-500/25",
    green: "hover:shadow-green-500/25",
    orange: "hover:shadow-orange-500/25",
    red: "hover:shadow-red-500/25",
    indigo: "hover:shadow-indigo-500/25",
    teal: "hover:shadow-teal-500/25"
  };

  const getIcon = (iconName: string) => {
    const icons = {
      target: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      build: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      puzzle: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      diamond: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      write: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      search: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.target;
  };

  return (
    <Link href={game.href} className={`game-card ${colorClasses[game.color as keyof typeof colorClasses]} flex flex-col h-full`}>
      <div className={`game-icon text-${game.color}-600`}>
        {getIcon(game.icon)}
      </div>
      
      <h3 className="text-heading mb-3 group-hover:text-blue-600 transition-colors duration-200">
        {game.title}
      </h3>
      
      <p className="text-body text-gray-600 mb-4 flex-grow">
        {game.description}
      </p>
      
      <div className="flex items-center justify-end mt-auto">
        <span className="text-caption text-gray-500">{game.players.toLocaleString()} players</span>
      </div>
    </Link>
  );
}

// Featured game component
function FeaturedGame() {
  const featuredGame = GAMES[0]; // AI Concept Matcher
  
  const getFeaturedIcon = (iconName: string) => {
    const icons = {
      target: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      build: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      ),
      link: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
      ),
      puzzle: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      ),
      diamond: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
        </svg>
      ),
      write: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
      ),
      search: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      )
    };
    return icons[iconName as keyof typeof icons] || icons.target;
  };
  
  return (
    <section className="container-modern mb-8">
      <div className="card p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                {getFeaturedIcon(featuredGame.icon)}
              </div>
            </div>
            <h2 className="text-xl font-bold text-gray-900">Featured Game</h2>
            <h3 className="text-lg font-semibold text-blue-600">{featuredGame.title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{featuredGame.description}</p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <span>{featuredGame.players.toLocaleString()} players</span>
              <span>Perfect for beginners</span>
            </div>
            <Link href={featuredGame.href} className="btn btn-primary">
              Play Now
            </Link>
          </div>
          <div className="flex justify-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl flex items-center justify-center">
              {getFeaturedIcon(featuredGame.icon)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function GamesPage() {
  return (
    <div className="space-modern">
      {/* Header */}
      <section className="container-modern text-center py-8">
        <h1 className="text-hero text-gradient mb-4 pb-2">AI Learning Games</h1>
        <p className="text-subtitle max-w-3xl mx-auto">
          Master artificial intelligence through interactive games designed to make learning fun and engaging. 
          Start building your AI skills today!
        </p>
      </section>

      {/* Featured Game */}
      <FeaturedGame />

      {/* All Games Grid */}
      <section className="container-modern">
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-display">All Available Games</h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            From beginner-friendly concept matching to advanced prompt engineering challenges
          </p>
        </div>
        
        <div className="grid-cards">
          {GAMES.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      </section>
    </div>
  );
}


