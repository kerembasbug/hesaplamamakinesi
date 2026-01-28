/**
 * Batch Image Fetch Script
 * Fetches LibRetro thumbnail URLs for all games and saves to a cache file
 * Run: node scripts/fetch-game-images.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Console name to LibRetro system mapping
const consoleMap = {
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
    'Atari Lynx': 'Atari - Lynx',
    'Virtual Boy': 'Nintendo - Virtual Boy',
    'MSX': 'Microsoft - MSX',
    'MSX2': 'Microsoft - MSX2',
    'Commodore 64': 'Commodore - 64',
    'Amiga': 'Commodore - Amiga',
    'ZX Spectrum': 'Sinclair - ZX Spectrum',
    'Colecovision': 'Coleco - ColecoVision',
    'Intellivision': 'Mattel - Intellivision',
    'Vectrex': 'GCE - Vectrex',
    'Odyssey2': 'Magnavox - Odyssey2',
    'Channel F': 'Fairchild - Channel F',
    'Supervision': 'Watara - Supervision',
};

// Generate name variations for LibRetro matching
function generateNameVariations(name) {
    const variations = [];

    // Base name cleanup
    const baseName = name
        .replace(/\s*-\s*/g, ' - ')
        .replace(/\s+/g, ' ')
        .trim();

    variations.push(baseName);

    // Without region codes
    const noRegion = baseName
        .replace(/\s*\((USA|Europe|Japan|World|USA, Europe|En,.*?|J|E|U|Rev.*?)\)\s*/gi, '')
        .trim();
    if (noRegion !== baseName) variations.push(noRegion);

    // With common regions
    if (!baseName.includes('(USA)') && !baseName.includes('(Europe)')) {
        variations.push(`${noRegion} (USA)`);
        variations.push(`${noRegion} (Europe)`);
        variations.push(`${noRegion} (World)`);
        variations.push(`${noRegion} (Japan)`);
    }

    return [...new Set(variations)];
}

// URL encode for LibRetro
function encodeForLibRetro(str) {
    return str
        .replace(/&/g, '_')
        .split('')
        .map(char => {
            if (/[a-zA-Z0-9\-_'. ()!,]/.test(char)) return char;
            return encodeURIComponent(char);
        })
        .join('');
}

// Check if image exists
async function checkImage(url) {
    try {
        const response = await fetch(url, { method: 'HEAD' });
        return response.ok;
    } catch {
        return false;
    }
}

// Find image for a game
async function findGameImage(game) {
    const system = consoleMap[game.console];
    if (!system) return null;

    const nameVariations = generateNameVariations(game.name);
    const baseUrl = 'https://thumbnails.libretro.com';
    const encodedSystem = encodeURIComponent(system);

    for (const tryName of nameVariations) {
        const encodedName = encodeForLibRetro(tryName);
        const imageUrl = `${baseUrl}/${encodedSystem}/Named_Boxarts/${encodedName}.png`;

        if (await checkImage(imageUrl)) {
            return imageUrl;
        }
    }

    return null;
}

// Process games in batches
async function processBatch(games, startIndex, batchSize, results, stats) {
    const batch = games.slice(startIndex, startIndex + batchSize);

    const promises = batch.map(async (game, i) => {
        const index = startIndex + i;
        const imageUrl = await findGameImage(game);

        if (imageUrl) {
            results[game.slug] = imageUrl;
            stats.found++;
        } else {
            stats.notFound++;
        }

        // Progress log every 100 games
        if ((index + 1) % 100 === 0) {
            console.log(`Progress: ${index + 1}/${games.length} (Found: ${stats.found}, Not Found: ${stats.notFound})`);
        }
    });

    await Promise.all(promises);
}

async function main() {
    console.log('🎮 Starting bulk image fetch...\n');

    // Load games
    const gamesPath = path.join(__dirname, '..', 'src', 'data', 'games.json');
    const games = JSON.parse(fs.readFileSync(gamesPath, 'utf8'));

    console.log(`Total games: ${games.length}`);

    // Load existing cache if exists
    const cachePath = path.join(__dirname, '..', 'src', 'data', 'game-images-cache.json');
    let existingCache = {};
    if (fs.existsSync(cachePath)) {
        existingCache = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
        console.log(`Existing cache: ${Object.keys(existingCache).length} images`);
    }

    // Filter games that need processing
    const gamesToProcess = games.filter(g => !existingCache[g.slug]);
    console.log(`Games to process: ${gamesToProcess.length}\n`);

    if (gamesToProcess.length === 0) {
        console.log('✅ All games already cached!');
        return;
    }

    const results = { ...existingCache };
    const stats = { found: Object.keys(existingCache).length, notFound: 0 };

    // Process in batches of 50 (parallel requests)
    const batchSize = 50;
    const startTime = Date.now();

    for (let i = 0; i < gamesToProcess.length; i += batchSize) {
        await processBatch(gamesToProcess, i, batchSize, results, stats);

        // Small delay between batches to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 100));

        // Save progress every 500 games
        if ((i + batchSize) % 500 === 0 || i + batchSize >= gamesToProcess.length) {
            fs.writeFileSync(cachePath, JSON.stringify(results, null, 2));
            console.log(`💾 Cache saved: ${Object.keys(results).length} images\n`);
        }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);

    console.log('\n✅ Bulk fetch complete!');
    console.log(`   Total images found: ${stats.found}`);
    console.log(`   Not found: ${stats.notFound}`);
    console.log(`   Time elapsed: ${elapsed}s`);
    console.log(`   Cache saved to: ${cachePath}`);
}

main().catch(console.error);
