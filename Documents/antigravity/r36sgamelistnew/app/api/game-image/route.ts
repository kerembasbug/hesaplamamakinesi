import { NextResponse } from 'next/server';

// LibRetro Thumbnails - Free, no API key required!
// Uses GitHub raw content for game covers

// Map console names to LibRetro system names
const consoleMap: Record<string, string> = {
    'PSP': 'Sony - PlayStation Portable',
    'PlayStation 1': 'Sony - PlayStation',
    'PS1': 'Sony - PlayStation',
    'Dreamcast': 'Sega - Dreamcast',
    'Nintendo 64': 'Nintendo - Nintendo 64',
    'N64': 'Nintendo - Nintendo 64',
    'SNES': 'Nintendo - Super Nintendo Entertainment System',
    'SFC': 'Nintendo - Super Nintendo Entertainment System',
    'Super Nintendo': 'Nintendo - Super Nintendo Entertainment System',
    'Gameboy Advance': 'Nintendo - Game Boy Advance',
    'GBA': 'Nintendo - Game Boy Advance',
    'Gameboy Color': 'Nintendo - Game Boy Color',
    'GBC': 'Nintendo - Game Boy Color',
    'Gameboy': 'Nintendo - Game Boy',
    'GB': 'Nintendo - Game Boy',
    'NES': 'Nintendo - Nintendo Entertainment System',
    'Famicom': 'Nintendo - Family Computer Disk System',
    'Sega Genesis': 'Sega - Mega Drive - Genesis',
    'Mega Drive': 'Sega - Mega Drive - Genesis',
    'Genesis': 'Sega - Mega Drive - Genesis',
    'Sega CD': 'Sega - Mega-CD - Sega CD',
    'Sega Saturn': 'Sega - Saturn',
    'Arcade': 'FBNeo - Arcade Games',
    'MAME': 'MAME',
    'Nintendo DS': 'Nintendo - Nintendo DS',
    'NDS': 'Nintendo - Nintendo DS',
    'Neo Geo': 'SNK - Neo Geo',
    'Neo Geo Pocket': 'SNK - Neo Geo Pocket Color',
    'PC Engine': 'NEC - PC Engine - TurboGrafx 16',
    'TurboGrafx-16': 'NEC - PC Engine - TurboGrafx 16',
    'Atari 2600': 'Atari - 2600',
    'Atari 7800': 'Atari - 7800',
    'CPS1': 'FBNeo - Arcade Games',
    'CPS2': 'FBNeo - Arcade Games',
    'CPS3': 'FBNeo - Arcade Games',
    'Game Gear': 'Sega - Game Gear',
    'Master System': 'Sega - Master System - Mark III',
    'Sega 32X': 'Sega - 32X',
    'WonderSwan': 'Bandai - WonderSwan Color',
};

// Generate multiple name variations to try
function generateNameVariations(name: string): string[] {
    const variations: string[] = [];

    // Original name (cleaned)
    const baseName = name
        .replace(/\s*-\s*/g, ' - ') // Normalize dashes
        .replace(/\s+/g, ' ')
        .trim();

    variations.push(baseName);

    // Without region codes in parentheses but keep rest
    const noRegion = baseName
        .replace(/\s*\((USA|Europe|Japan|World|USA, Europe|En,.*?|J|E|U)\)\s*/gi, '')
        .trim();
    if (noRegion !== baseName) variations.push(noRegion);

    // With (USA) added
    if (!baseName.includes('(USA)')) {
        variations.push(`${noRegion} (USA)`);
        variations.push(`${noRegion} (World)`);
        variations.push(`${noRegion} (Europe)`);
    }

    // Replace Roman numerals
    const withArabic = noRegion
        .replace(/\bIII\b/g, '3')
        .replace(/\bII\b/g, '2')
        .replace(/\bIV\b/g, '4')
        .replace(/\bVI\b/g, '6')
        .replace(/\bVII\b/g, '7')
        .replace(/\bVIII\b/g, '8');
    if (withArabic !== noRegion) variations.push(withArabic);

    // Common title variations
    const titleVariations: Record<string, string[]> = {
        '007': ['007 - GoldenEye', 'GoldenEye 007'],
        'Mario Kart 64': ['Mario Kart 64 (USA)', 'Mario Kart 64 (Europe)'],
        'Super Mario 64': ['Super Mario 64 (USA)', 'Super Mario 64 (Europe)'],
        'Assassins Creed': ["Assassin's Creed - Bloodlines", "Assassin's Creed"],
        'GoldenEye': ['007 - GoldenEye', 'GoldenEye 007 (USA)'],
    };

    for (const [key, vals] of Object.entries(titleVariations)) {
        if (baseName.toLowerCase().includes(key.toLowerCase())) {
            variations.push(...vals);
        }
    }

    return [...new Set(variations)]; // Remove duplicates
}

// URL encode for LibRetro (special handling for some chars)
function encodeForLibRetro(str: string): string {
    return str
        .replace(/&/g, '_')
        .replace(/'/g, "'") // Keep apostrophes
        .split('')
        .map(char => {
            if (/[a-zA-Z0-9\-_'. ()!]/.test(char)) return char;
            return encodeURIComponent(char);
        })
        .join('');
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const gameName = searchParams.get('name');
    const consoleName = searchParams.get('console');

    if (!gameName) {
        return NextResponse.json({ error: 'Game name is required' }, { status: 400 });
    }

    const system = consoleName ? consoleMap[consoleName] : null;

    if (!system) {
        return NextResponse.json({
            image: null,
            source: 'unsupported_console',
            message: `Console "${consoleName}" not mapped`
        });
    }

    const nameVariations = generateNameVariations(gameName);
    const baseUrl = 'https://thumbnails.libretro.com';
    const encodedSystem = encodeURIComponent(system);

    // Try each name variation with each image type
    const imageTypes = ['Named_Boxarts', 'Named_Snaps', 'Named_Titles'];

    for (const tryName of nameVariations) {
        for (const imageType of imageTypes) {
            const encodedName = encodeForLibRetro(tryName);
            const imageUrl = `${baseUrl}/${encodedSystem}/${imageType}/${encodedName}.png`;

            try {
                const response = await fetch(imageUrl, {
                    method: 'HEAD',
                    next: { revalidate: 86400 } // Cache for 24 hours
                });

                if (response.ok) {
                    return NextResponse.json({
                        image: imageUrl,
                        source: 'libretro',
                        type: imageType,
                        matchedName: tryName
                    });
                }
            } catch {
                continue;
            }
        }
    }

    // Fallback: Try a search on Cover Project or return null
    return NextResponse.json({
        image: null,
        source: 'not_found',
        triedVariations: nameVariations.slice(0, 5) // Show what we tried
    });
}
