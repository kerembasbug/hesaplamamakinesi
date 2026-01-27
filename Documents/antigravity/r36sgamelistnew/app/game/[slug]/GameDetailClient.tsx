'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '../../../lib/i18n/LanguageContext';
import { getGameInfo } from '../../../lib/gameInfoService';
import { getConsoleStyle, getGameInitials, getConsoleEmoji } from '../../../lib/gameImageService';

interface Game {
  name: string;
  console: string;
  slug: string;
  searchTerms: string[];
}

interface GameDetailClientProps {
  game: Game;
  relatedGames: Game[];
}

export default function GameDetailClient({ game, relatedGames }: GameDetailClientProps) {
  const { t } = useLanguage();
  const gameInfo = getGameInfo(game.name, game.console);
  const consoleStyle = getConsoleStyle(game.console);
  const initials = getGameInitials(game.name);
  const consoleEmoji = getConsoleEmoji(game.console);

  const [gameImage, setGameImage] = useState<string | null>(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const fetchGameImage = async () => {
      try {
        setImageLoading(true);
        setImageError(false);

        const response = await fetch(
          `/api/game-image?name=${encodeURIComponent(game.name)}&console=${encodeURIComponent(game.console)}`
        );
        const data = await response.json();

        if (data.image) {
          setGameImage(data.image);
        } else {
          setImageError(true);
        }
      } catch (error) {
        console.error('Error fetching game image:', error);
        setImageError(true);
      } finally {
        setImageLoading(false);
      }
    };

    fetchGameImage();
  }, [game.name, game.console]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-gradient-to-r from-purple-900 via-blue-900 to-cyan-900 border-b-2 border-cyan-500/50">
        <div className="container mx-auto px-4 py-4">
          <a href="/" className="inline-flex items-center gap-2 text-cyan-300 hover:text-white transition-colors">
            <span>←</span>
            <span className="font-semibold">R36S Game Library</span>
          </a>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm">
            <li>
              <a href="/" className="text-blue-600 dark:text-blue-400 hover:underline">Home</a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-600 dark:text-gray-400">{game.console}</li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-900 dark:text-white font-medium truncate max-w-xs">{game.name}</li>
          </ol>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8">
          <div className={`${consoleStyle.pattern} ${consoleStyle.gradient} p-8 md:p-12 relative`}>
            {/* Dark overlay for text visibility */}
            <div className="absolute inset-0 bg-black/40"></div>

            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Game Image */}
              <div className="relative flex-shrink-0">
                <div
                  className="w-48 h-48 md:w-56 md:h-56 rounded-2xl bg-black/30 backdrop-blur-sm border-4 border-white/30 shadow-2xl flex items-center justify-center overflow-hidden"
                >
                  {/* Loading state */}
                  {imageLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
                    </div>
                  )}

                  {/* Game image from API */}
                  {gameImage && !imageError && (
                    <img
                      src={gameImage}
                      alt={game.name}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  )}

                  {/* Fallback to initials */}
                  {(imageError || (!imageLoading && !gameImage)) && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                      <div className="text-center z-10">
                        <span className="text-6xl md:text-7xl font-black text-white/90 drop-shadow-lg">{initials}</span>
                        <div className="mt-2">
                          <span className="text-4xl">{consoleEmoji}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                {/* Console Badge */}
                <div className="absolute -bottom-3 -right-3 bg-white dark:bg-gray-900 rounded-full px-4 py-2 shadow-lg border-2 border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-bold text-gray-800 dark:text-white">{game.console}</span>
                </div>
              </div>

              {/* Game Info */}
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-wrap gap-2 justify-center md:justify-start mb-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full font-medium border border-white/20">
                    <span>{gameInfo.genreIcon}</span>
                    <span>{gameInfo.genre}</span>
                  </span>
                  {gameInfo.year !== 'Classic' && (
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-black/30 backdrop-blur-sm text-white text-sm rounded-full font-medium border border-white/20">
                      <span>📅</span>
                      <span>{gameInfo.year}</span>
                    </span>
                  )}
                </div>

                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {game.name}
                </h1>

                <p className="text-white text-lg md:text-xl leading-relaxed max-w-2xl drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  Play this classic {gameInfo.genre} game on your R36S handheld console with perfect emulation and enhanced features.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About This Game */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">📝</span>
                About This Game
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {gameInfo.description}
              </p>
            </section>

            {/* R36S Features */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">✨</span>
                R36S Features for {game.name}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {gameInfo.features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-600 rounded-lg"
                  >
                    <span className="text-green-500 text-xl flex-shrink-0">✓</span>
                    <span className="text-gray-700 dark:text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* How to Play */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <span className="text-2xl">🎮</span>
                How to Play on R36S
              </h2>
              <ol className="space-y-4">
                {gameInfo.howToPlay.map((step, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-4"
                  >
                    <span className={`flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r ${consoleStyle.gradient} text-white font-bold flex items-center justify-center text-sm`}>
                      {index + 1}
                    </span>
                    <span className="text-gray-700 dark:text-gray-300 pt-1">{step}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* Console Information */}
            <section className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="text-2xl">{gameInfo.consoleIcon}</span>
                About {game.console}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                {gameInfo.consoleInfo}
              </p>
              <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  <strong>Tip:</strong> The R36S perfectly emulates {game.console} games, allowing you to experience classics like {game.name} with modern conveniences like save states, display scaling, and customizable controls.
                </p>
              </div>
            </section>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Quick Info Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Game Details</h3>
              <dl className="space-y-4">
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-gray-600 dark:text-gray-400">Platform</dt>
                  <dd className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{consoleEmoji}</span>
                    <span>{game.console}</span>
                  </dd>
                </div>
                <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                  <dt className="text-gray-600 dark:text-gray-400">Genre</dt>
                  <dd className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <span>{gameInfo.genreIcon}</span>
                    <span>{gameInfo.genre}</span>
                  </dd>
                </div>
                {gameInfo.year !== 'Classic' && (
                  <div className="flex justify-between items-center pb-3 border-b border-gray-200 dark:border-gray-700">
                    <dt className="text-gray-600 dark:text-gray-400">Era</dt>
                    <dd className="font-semibold text-gray-900 dark:text-white">~{gameInfo.year}</dd>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <dt className="text-gray-600 dark:text-gray-400">R36S Support</dt>
                  <dd className="font-semibold text-green-600 dark:text-green-400">✓ Fully Supported</dd>
                </div>
              </dl>

              {/* CTA Buttons */}
              <div className="mt-6 space-y-3">
                <a
                  href="https://r36shandheld.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`block w-full py-3 px-4 bg-gradient-to-r ${consoleStyle.gradient} text-white font-bold rounded-lg text-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105`}
                >
                  🛒 Buy R36S Console
                </a>
                <a
                  href="https://r36s.com.au"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-3 px-4 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-lg text-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                >
                  🇦🇺 R36S Australia
                </a>
              </div>
            </div>

            {/* Related Games */}
            {relatedGames.length > 0 && (
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <span>{consoleEmoji}</span>
                  More {game.console} Games
                </h3>
                <div className="space-y-2">
                  {relatedGames.slice(0, 8).map((relatedGame) => (
                    <a
                      key={relatedGame.slug}
                      href={`/game/${relatedGame.slug}`}
                      className="block p-3 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-lg hover:shadow-md transition-all duration-200 hover:translate-x-1"
                    >
                      <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-1">
                        {relatedGame.name}
                      </p>
                    </a>
                  ))}
                </div>
                <a
                  href={`/?console=${encodeURIComponent(game.console)}`}
                  className="block mt-4 text-center text-blue-600 dark:text-blue-400 hover:underline font-medium text-sm"
                >
                  View all {game.console} games →
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold rounded-xl hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors shadow-lg"
          >
            <span>←</span>
            <span>Back to Game Library</span>
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            R36S Game List - {new Date().getFullYear()} | Your ultimate retro gaming companion
          </p>
        </div>
      </footer>

      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoGame',
            name: game.name,
            gamePlatform: game.console,
            genre: gameInfo.genre,
            description: gameInfo.description,
            applicationCategory: 'Game',
            offers: {
              '@type': 'Offer',
              availability: 'https://schema.org/InStock',
              seller: {
                '@type': 'Organization',
                name: 'R36S Handheld',
                url: 'https://r36shandheld.com'
              }
            }
          }),
        }}
      />
    </div>
  );
}
