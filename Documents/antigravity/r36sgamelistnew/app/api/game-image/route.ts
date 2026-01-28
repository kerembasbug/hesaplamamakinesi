import { NextResponse } from 'next/server';
import gameImagesCache from '@/src/data/game-images-cache.json';

// Type for cache
const imageCache = gameImagesCache as Record<string, string>;

// Generate slug from game name
function generateSlug(name: string): string {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get('name');
    const slug = searchParams.get('slug');

    if (!gameName && !slug) {
        return NextResponse.json({ error: 'Game name or slug is required' }, { status: 400 });
    }

    // Try to find from cache using slug
    const gameSlug = slug || generateSlug(gameName || '');

    if (imageCache[gameSlug]) {
        return NextResponse.json({
            image: imageCache[gameSlug],
            source: 'cache',
            slug: gameSlug
        });
    }

    // Not found in cache
    return NextResponse.json({
        image: null,
        source: 'not_found',
        slug: gameSlug
    });
}
