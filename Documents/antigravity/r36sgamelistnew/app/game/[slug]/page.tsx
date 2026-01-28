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
      title: 'Game Not Found | R36S Game Library',
      description: 'The requested game was not found. Browse our complete library of 15,000+ retro games for R36S handheld console.',
    };
  }

  const gameInfo = getGameInfo(game.name, game.console);

  // SEO-optimized title (50-60 chars)
  const title = `${game.name} | ${game.console} - R36S Games`;

  // SEO-optimized description (150-160 chars)
  const description = `Play ${game.name} on R36S handheld. ${gameInfo.genre} game for ${game.console} with save states, HD upscaling & perfect emulation. Download & play now!`;

  const siteUrl = 'https://r36sgamelist.com';
  const gameUrl = `${siteUrl}/game/${game.slug}`;

  return {
    title,
    description,
    keywords: [
      game.name,
      `${game.name} R36S`,
      `${game.name} ${game.console}`,
      `R36S ${game.console} games`,
      `play ${game.name}`,
      `${game.console} emulation`,
      `${gameInfo.genre} games`,
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
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: `${game.name} - Play on R36S`,
      description: `Play ${game.name} (${gameInfo.genre}) on R36S handheld console. Full ${game.console} emulation with enhanced graphics.`,
      type: 'article',
      siteName: 'R36S Game Library',
      url: gameUrl,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${game.name} | R36S ${game.console}`,
      description: `Play this classic ${gameInfo.genre} game on R36S handheld console.`,
    },
    alternates: {
      canonical: gameUrl,
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

  const gameInfo = getGameInfo(game.name, game.console);

  // Get related games from the same console
  const relatedGames = games
    .filter((g) => g.console === game.console && g.slug !== game.slug)
    .slice(0, 10);

  // JSON-LD Structured Data for VideoGame
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'VideoGame',
    name: game.name,
    description: gameInfo.description,
    gamePlatform: game.console,
    genre: gameInfo.genre,
    applicationCategory: 'Game',
    operatingSystem: 'R36S',
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  // Breadcrumb JSON-LD
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://r36sgamelist.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: game.console,
        item: `https://r36sgamelist.com?console=${encodeURIComponent(game.console)}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: game.name,
        item: `https://r36sgamelist.com/game/${game.slug}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <GameDetailClient game={game} relatedGames={relatedGames} />
    </>
  );
}
