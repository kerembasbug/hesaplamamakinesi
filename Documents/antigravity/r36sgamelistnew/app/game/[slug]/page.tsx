import { notFound } from 'next/navigation';
import gamesData from '../../../src/data/games.json';
import type { Metadata } from 'next';
import GameDetailClient from './GameDetailClient';
import { getGameInfo } from '../../../lib/gameInfoService';

interface Game {
  name: string;
  console: string;
  slug: string;
  searchTerms: string[];
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const games = gamesData as Game[];
  // Generate static pages for top 1000 games for better SEO
  return games.slice(0, 1000).map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const games = gamesData as Game[];
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    return {
      title: 'Game Not Found - R36S Game List',
      description: 'The requested game was not found in the R36S game library.',
    };
  }

  const gameInfo = getGameInfo(game.name, game.console);
  const title = `${game.name} - Play on R36S | ${game.console} Game Guide`;
  const description = `Play ${game.name} on R36S handheld console. This ${gameInfo.genre} game for ${game.console} features perfect emulation, save states, and HD upscaling. Complete game guide and info.`;

  return {
    title,
    description,
    keywords: [
      game.name,
      `${game.name} R36S`,
      `${game.name} ${game.console}`,
      `R36S ${game.console} games`,
      `play ${game.name} on R36S`,
      `${game.console} emulation`,
      `${gameInfo.genre} games R36S`,
      'R36S game list',
      'R36S supported games',
      'retro gaming handheld',
      game.console,
    ].join(', '),
    authors: [{ name: 'R36S Game Library' }],
    creator: 'R36S Game Library',
    publisher: 'R36S Game Library',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: `${game.name} - R36S ${game.console} Game`,
      description: `Play ${game.name} (${gameInfo.genre}) on your R36S handheld. Full ${game.console} emulation with save states and enhanced graphics.`,
      type: 'article',
      siteName: 'R36S Game Library',
      locale: 'en_US',
      images: [
        {
          url: '/og-game-image.jpg',
          width: 1200,
          height: 630,
          alt: `${game.name} - ${game.console} game on R36S`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} | R36S ${game.console}`,
      description: `Play this classic ${gameInfo.genre} game on R36S handheld console.`,
    },
    alternates: {
      canonical: `/game/${game.slug}`,
    },
    category: 'Gaming',
  };
}

export default async function GamePage({ params }: PageProps) {
  const { slug } = await params;
  const games = gamesData as Game[];
  const game = games.find((g) => g.slug === slug);

  if (!game) {
    notFound();
  }

  // Get related games from the same console
  const relatedGames = games
    .filter((g) => g.console === game.console && g.slug !== game.slug)
    .slice(0, 10);

  return <GameDetailClient game={game} relatedGames={relatedGames} />;
}
