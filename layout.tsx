import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import SiteHeader from "@/components/SiteHeader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AI Explained - Games",
  description: "Learn AI through interactive games",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gray-50`}>
        <SiteHeader />
        <main className="min-h-screen">
          {children}
        </main>
        <footer className="bg-white border-t border-gray-200 py-12 mt-20">
          <div className="container-modern">
            <div className="grid md:grid-cols-4 gap-8">
              {/* Brand */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold">
                    AI
                  </div>
                  <span className="text-xl font-bold text-gray-900">AI Explained - Games</span>
                </div>
                <p className="text-gray-600 text-sm">
                  Master artificial intelligence through interactive learning and engaging games.
                </p>
              </div>

              {/* Quick Links */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Learn</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/lesson/ai-fundamentals" className="text-gray-600 hover:text-blue-600 transition-colors">AI Fundamentals</a></li>
                </ul>
              </div>

              {/* Games */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Games</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/games/ai-concept-matcher" className="text-gray-600 hover:text-blue-600 transition-colors">Concept Matcher</a></li>
                  <li><a href="/games/prompt-builder" className="text-gray-600 hover:text-blue-600 transition-colors">Prompt Builder</a></li>
                  <li><a href="/games/match-maker" className="text-gray-600 hover:text-blue-600 transition-colors">Mix & Match</a></li>
                </ul>
              </div>

              {/* Community */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900">Community</h3>
                <ul className="space-y-2 text-sm">
                  <li><a href="/leaderboard" className="text-gray-600 hover:text-blue-600 transition-colors">Leaderboard</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-200 mt-8 pt-8 text-center">
              <p className="text-gray-500 text-sm">
                © 2025 AI Explained - Games. All rights reserved. Learn • Play • Master
              </p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}