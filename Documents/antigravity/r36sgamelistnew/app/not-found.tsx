import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Page Not Found | R36S Game Library',
  description: 'The page you are looking for could not be found. Browse our complete library of 15,000+ retro games compatible with R36S handheld console.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* 404 Visual */}
        <div className="mb-8">
          <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
            404
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          Game Not Found
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist. It might have been moved,
          deleted, or perhaps the URL was typed incorrectly.
        </p>

        {/* Helpful Content */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 text-left">
          <h2 className="text-lg font-semibold text-white mb-3">
            Looking for a specific game?
          </h2>
          <p className="text-gray-300 mb-4">
            Our R36S Game Library contains over 15,000 retro games from consoles including
            PSP, PlayStation 1, Nintendo 64, SNES, Sega Genesis, Game Boy Advance, and many more.
            Use our search feature to find any game in our comprehensive database.
          </p>
          <ul className="text-gray-400 text-sm space-y-2">
            <li>• Search by game name, console, or genre</li>
            <li>• Browse all supported consoles</li>
            <li>• Discover new retro classics to play on your R36S</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <span>🎮</span>
            <span>Browse Game Library</span>
          </Link>
          <Link
            href="https://r36shandheld.com"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <span>🛒</span>
            <span>Get R36S Console</span>
          </Link>
        </div>

        {/* Footer Note */}
        <p className="mt-12 text-gray-500 text-sm">
          R36S Game List - Your ultimate guide to retro gaming on R36S handheld
        </p>
      </div>
    </div>
  );
}
