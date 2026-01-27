// Game Image Service - Generates placeholder images and console-themed visuals

interface ImageConfig {
    gradient: string;
    pattern: string;
    accentColor: string;
    bgColor: string;
}

// Console-specific color schemes
const consoleStyles: Record<string, ImageConfig> = {
    'PSP': {
        gradient: 'from-blue-600 via-indigo-600 to-purple-700',
        pattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
        accentColor: '#4f46e5',
        bgColor: '#1e1b4b'
    },
    'PlayStation 1': {
        gradient: 'from-gray-800 via-gray-700 to-gray-900',
        pattern: 'bg-[conic-gradient(at_top,_var(--tw-gradient-stops))]',
        accentColor: '#6366f1',
        bgColor: '#1f2937'
    },
    'Dreamcast': {
        gradient: 'from-orange-500 via-red-500 to-pink-600',
        pattern: 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))]',
        accentColor: '#f97316',
        bgColor: '#7c2d12'
    },
    'Nintendo 64': {
        gradient: 'from-red-600 via-yellow-500 to-green-500',
        pattern: 'bg-gradient-to-br',
        accentColor: '#ef4444',
        bgColor: '#991b1b'
    },
    'SNES': {
        gradient: 'from-purple-600 via-blue-600 to-indigo-700',
        pattern: 'bg-gradient-to-tr',
        accentColor: '#8b5cf6',
        bgColor: '#4c1d95'
    },
    'SFC': {
        gradient: 'from-purple-600 via-red-500 to-orange-500',
        pattern: 'bg-gradient-to-br',
        accentColor: '#a855f7',
        bgColor: '#581c87'
    },
    'Gameboy Advance': {
        gradient: 'from-indigo-600 via-purple-600 to-pink-500',
        pattern: 'bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))]',
        accentColor: '#6366f1',
        bgColor: '#312e81'
    },
    'Gameboy Color': {
        gradient: 'from-purple-500 via-pink-500 to-rose-500',
        pattern: 'bg-gradient-to-r',
        accentColor: '#a855f7',
        bgColor: '#701a75'
    },
    'NES': {
        gradient: 'from-red-700 via-red-600 to-gray-800',
        pattern: 'bg-gradient-to-br',
        accentColor: '#dc2626',
        bgColor: '#7f1d1d'
    },
    'Famicom': {
        gradient: 'from-red-600 via-yellow-500 to-white',
        pattern: 'bg-gradient-to-r',
        accentColor: '#f59e0b',
        bgColor: '#b91c1c'
    },
    'Sega Genesis': {
        gradient: 'from-blue-800 via-blue-600 to-black',
        pattern: 'bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))]',
        accentColor: '#2563eb',
        bgColor: '#1e3a8a'
    },
    'Mega Drive': {
        gradient: 'from-blue-700 via-blue-500 to-gray-900',
        pattern: 'bg-gradient-to-bl',
        accentColor: '#3b82f6',
        bgColor: '#1e40af'
    },
    'Arcade': {
        gradient: 'from-yellow-500 via-orange-500 to-red-600',
        pattern: 'bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))]',
        accentColor: '#f59e0b',
        bgColor: '#78350f'
    },
    'Capcom Play System I': {
        gradient: 'from-red-700 via-orange-600 to-yellow-500',
        pattern: 'bg-gradient-to-tr',
        accentColor: '#ea580c',
        bgColor: '#9a3412'
    },
    'Capcom Play System II': {
        gradient: 'from-blue-700 via-purple-600 to-pink-600',
        pattern: 'bg-gradient-to-br',
        accentColor: '#7c3aed',
        bgColor: '#5b21b6'
    },
    'NeoGeo': {
        gradient: 'from-red-600 via-yellow-500 to-red-700',
        pattern: 'bg-[conic-gradient(at_center,_var(--tw-gradient-stops))]',
        accentColor: '#dc2626',
        bgColor: '#991b1b'
    },
    'NeoGeo Pocket': {
        gradient: 'from-gray-600 via-gray-500 to-red-600',
        pattern: 'bg-gradient-to-r',
        accentColor: '#ef4444',
        bgColor: '#374151'
    },
    'NeoGeo Pocket Color': {
        gradient: 'from-blue-600 via-purple-500 to-red-500',
        pattern: 'bg-gradient-to-r',
        accentColor: '#8b5cf6',
        bgColor: '#4338ca'
    },
    'Nintendo DS': {
        gradient: 'from-gray-500 via-blue-500 to-cyan-500',
        pattern: 'bg-gradient-to-br',
        accentColor: '#06b6d4',
        bgColor: '#164e63'
    },
    'PC Engine': {
        gradient: 'from-gray-700 via-orange-600 to-red-600',
        pattern: 'bg-gradient-to-tr',
        accentColor: '#ea580c',
        bgColor: '#431407'
    },
    'Sega NAOMI': {
        gradient: 'from-blue-600 via-cyan-500 to-teal-500',
        pattern: 'bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]',
        accentColor: '#06b6d4',
        bgColor: '#0e7490'
    }
};

// Get console-specific styling
export function getConsoleStyle(consoleName: string): ImageConfig {
    return consoleStyles[consoleName] || {
        gradient: 'from-gray-700 via-gray-600 to-gray-800',
        pattern: 'bg-gradient-to-br',
        accentColor: '#6b7280',
        bgColor: '#374151'
    };
}

// Generate initials from game name for placeholder
export function getGameInitials(gameName: string): string {
    const words = gameName.replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 0);
    if (words.length === 0) return '??';
    if (words.length === 1) return words[0].substring(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
}

// Console icon mapping
export function getConsoleEmoji(consoleName: string): string {
    const emojiMap: Record<string, string> = {
        'PSP': '🎮',
        'PlayStation 1': '🎯',
        'Dreamcast': '💿',
        'Nintendo 64': '🎮',
        'SNES': '🕹️',
        'SFC': '🕹️',
        'Gameboy Advance': '📱',
        'Gameboy Color': '📱',
        'NES': '🎮',
        'Famicom': '🎮',
        'Sega Genesis': '🌊',
        'Mega Drive': '🌊',
        'Arcade': '🕹️',
        'Capcom Play System I': '⚔️',
        'Capcom Play System II': '⚔️',
        'NeoGeo': '🔥',
        'NeoGeo Pocket': '📱',
        'NeoGeo Pocket Color': '📱',
        'Nintendo DS': '📱',
        'PC Engine': '🖥️',
        'Sega NAOMI': '💎'
    };
    return emojiMap[consoleName] || '🎮';
}

// Placeholder image URLs based on console era
export function getPlaceholderImage(consoleName: string): string {
    const era8bit = ['NES', 'Famicom', 'Gameboy Color'];
    const era16bit = ['SNES', 'SFC', 'Sega Genesis', 'Mega Drive', 'PC Engine', 'NeoGeo'];
    const era32bit = ['PlayStation 1', 'Nintendo 64', 'Dreamcast', 'Arcade'];
    const eraHandheld = ['Gameboy Advance', 'PSP', 'Nintendo DS', 'NeoGeo Pocket', 'NeoGeo Pocket Color'];

    if (era8bit.includes(consoleName)) {
        return 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop';
    }
    if (era16bit.includes(consoleName)) {
        return 'https://images.unsplash.com/photo-1493711662062-fa541f7f73f3?w=600&h=400&fit=crop';
    }
    if (era32bit.includes(consoleName)) {
        return 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600&h=400&fit=crop';
    }
    if (eraHandheld.includes(consoleName)) {
        return 'https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=600&h=400&fit=crop';
    }

    return 'https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&h=400&fit=crop';
}
