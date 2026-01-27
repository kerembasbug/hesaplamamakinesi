// Game Info Service - Generates rich descriptions for games
// Based on game name, console, and genre detection

interface GameInfo {
  name: string;
  console: string;
  genre: string;
  genreIcon: string;
  year: string;
  description: string;
  features: string[];
  consoleInfo: string;
  consoleIcon: string;
  consoleColor: string;
  howToPlay: string[];
}

// Console information database
const consoleData: Record<string, { info: string; icon: string; color: string; years: string }> = {
  'PSP': {
    info: 'PlayStation Portable (PSP) was Sony\'s first handheld gaming console, released in 2004. Known for its powerful graphics and multimedia capabilities, it brought console-quality gaming to portable devices.',
    icon: '🎮',
    color: 'from-blue-600 to-indigo-700',
    years: '2004-2014'
  },
  'PlayStation 1': {
    info: 'PlayStation 1 (PS1/PSX) revolutionized gaming when Sony released it in 1994. With its CD-ROM format and 3D graphics, it became one of the best-selling consoles of all time with over 100 million units sold.',
    icon: '🎯',
    color: 'from-gray-700 to-gray-900',
    years: '1994-2006'
  },
  'Dreamcast': {
    info: 'Sega Dreamcast was ahead of its time when released in 1998. It was the first console with built-in modem for online gaming and featured impressive arcade-quality graphics.',
    icon: '💿',
    color: 'from-orange-500 to-red-600',
    years: '1998-2001'
  },
  'Nintendo 64': {
    info: 'Nintendo 64 (N64) brought 3D gaming to millions when released in 1996. With iconic games and the innovative analog stick controller, it defined a generation of gaming.',
    icon: '🎮',
    color: 'from-red-600 to-yellow-500',
    years: '1996-2002'
  },
  'SNES': {
    info: 'Super Nintendo Entertainment System (SNES) is considered one of the greatest consoles ever made. Released in 1990, it brought 16-bit graphics and legendary games to living rooms worldwide.',
    icon: '🕹️',
    color: 'from-purple-600 to-blue-600',
    years: '1990-2003'
  },
  'SFC': {
    info: 'Super Famicom (SFC) is the Japanese version of the SNES, released in 1990. It features the same powerful 16-bit hardware with a distinct controller design.',
    icon: '🕹️',
    color: 'from-purple-600 to-red-500',
    years: '1990-2003'
  },
  'Gameboy Advance': {
    info: 'Game Boy Advance (GBA) was Nintendo\'s powerful 32-bit handheld, released in 2001. It combined portability with impressive graphics, becoming home to countless classic games.',
    icon: '📱',
    color: 'from-indigo-600 to-purple-600',
    years: '2001-2010'
  },
  'Gameboy Color': {
    info: 'Game Boy Color brought color gaming to Nintendo\'s handheld line in 1998. It maintained backward compatibility with original Game Boy games while adding vibrant color graphics.',
    icon: '📱',
    color: 'from-purple-500 to-pink-500',
    years: '1998-2003'
  },
  'NES': {
    info: 'Nintendo Entertainment System (NES) saved the video game industry in 1985. This 8-bit legend introduced iconic franchises and defined home gaming for a generation.',
    icon: '🎮',
    color: 'from-red-600 to-gray-700',
    years: '1985-1995'
  },
  'Famicom': {
    info: 'Famicom (Family Computer) was Nintendo\'s first home console, released in Japan in 1983. It laid the foundation for modern gaming with its innovative design and game library.',
    icon: '🎮',
    color: 'from-red-600 to-yellow-500',
    years: '1983-2003'
  },
  'Sega Genesis': {
    info: 'Sega Genesis (Mega Drive) was Sega\'s flagship 16-bit console. Released in 1988, it challenged Nintendo\'s dominance with blast processing and iconic games like Sonic.',
    icon: '🌊',
    color: 'from-blue-700 to-black',
    years: '1988-1997'
  },
  'Mega Drive': {
    info: 'Mega Drive (Sega Genesis in North America) was Sega\'s 16-bit powerhouse. Known for its arcade-quality ports and the birth of Sonic the Hedgehog.',
    icon: '🌊',
    color: 'from-blue-700 to-black',
    years: '1988-1997'
  },
  'Arcade': {
    info: 'Arcade games represent the golden age of gaming. From classic cabinets to modern systems, arcade games delivered pure, challenging gameplay in public venues worldwide.',
    icon: '🕹️',
    color: 'from-yellow-500 to-red-600',
    years: '1970s-present'
  },
  'Capcom Play System I': {
    info: 'Capcom Play System 1 (CPS-1) was Capcom\'s arcade hardware from 1988. It powered legendary fighting and action games with impressive 16-bit graphics.',
    icon: '⚔️',
    color: 'from-red-700 to-orange-600',
    years: '1988-1995'
  },
  'Capcom Play System II': {
    info: 'Capcom Play System 2 (CPS-2) elevated arcade gaming in 1993. Known for Street Fighter and Marvel games, it delivered stunning 2D graphics and smooth animations.',
    icon: '⚔️',
    color: 'from-blue-700 to-purple-700',
    years: '1993-2003'
  },
  'NeoGeo': {
    info: 'SNK NeoGeo was the ultimate arcade experience at home. Released in 1990, its powerful hardware delivered arcade-perfect ports of legendary fighting games.',
    icon: '🔥',
    color: 'from-red-600 to-yellow-500',
    years: '1990-2004'
  },
  'NeoGeo Pocket': {
    info: 'NeoGeo Pocket was SNK\'s 16-bit handheld console from 1998. Despite limited commercial success, it featured excellent fighting games and a clicky microswitched joystick.',
    icon: '📱',
    color: 'from-gray-600 to-red-600',
    years: '1998-1999'
  },
  'NeoGeo Pocket Color': {
    info: 'NeoGeo Pocket Color added vibrant colors to SNK\'s handheld in 1999. It featured arcade-quality fighting games in a portable format with an exceptional control stick.',
    icon: '📱',
    color: 'from-blue-600 to-red-600',
    years: '1999-2001'
  },
  'Nintendo DS': {
    info: 'Nintendo DS revolutionized gaming with dual screens and touch input in 2004. Its innovative design and massive game library made it one of the best-selling handhelds ever.',
    icon: '📱',
    color: 'from-gray-500 to-blue-600',
    years: '2004-2013'
  },
  'PC Engine': {
    info: 'PC Engine (TurboGrafx-16 in the West) was a compact 16-bit console from 1987. Despite its small size, it delivered impressive 2D graphics and a strong library.',
    icon: '🖥️',
    color: 'from-gray-700 to-orange-600',
    years: '1987-1994'
  },
  'Sega NAOMI': {
    info: 'Sega NAOMI was a powerful arcade platform from 1998. Based on Dreamcast hardware, it powered high-quality arcade games with impressive graphics.',
    icon: '💎',
    color: 'from-blue-600 to-cyan-500',
    years: '1998-2009'
  }
};

// Genre detection based on keywords in game name
const genrePatterns: { pattern: RegExp; genre: string; icon: string }[] = [
  { pattern: /street fighter|tekken|mortal kombat|king of fighters|guilty gear|blazblue|fatal fury|samurai|virtua fighter|dead or alive|soul calibur|darkstalkers|capcom vs|marvel vs|snk vs|fighting/i, genre: 'Fighting', icon: '🥊' },
  { pattern: /mario|sonic|crash|rayman|donkey kong|kirby|yoshi|platformer|jump|bandicoot|jak|ratchet|sly/i, genre: 'Platform', icon: '🏃' },
  { pattern: /final fantasy|dragon quest|chrono|pokemon|persona|tales of|xenogears|suikoden|breath of fire|legend of|rpg|quest/i, genre: 'RPG', icon: '⚔️' },
  { pattern: /resident evil|silent hill|clock tower|dino crisis|horror|evil|dead|zombie/i, genre: 'Horror', icon: '👻' },
  { pattern: /gran turismo|need for speed|ridge racer|burnout|wipeout|racing|turismo|racer|nascar|f1|formula/i, genre: 'Racing', icon: '🏎️' },
  { pattern: /fifa|pes|pro evolution|madden|nba|nfl|mlb|wwe|wrestling|football|soccer|basketball|sports/i, genre: 'Sports', icon: '⚽' },
  { pattern: /metal gear|splinter cell|hitman|stealth|thief/i, genre: 'Stealth', icon: '🥷' },
  { pattern: /zelda|castlevania|metroid|adventure|tomb raider|god of war/i, genre: 'Action-Adventure', icon: '🗡️' },
  { pattern: /call of duty|medal of honor|shooter|gun|doom|quake|halo/i, genre: 'Shooter', icon: '🔫' },
  { pattern: /metal slug|contra|run and gun|gunstar/i, genre: 'Run & Gun', icon: '💥' },
  { pattern: /puzzle|tetris|puyo|columns|bust a move|bubble/i, genre: 'Puzzle', icon: '🧩' },
  { pattern: /gradius|r-type|galaga|shmup|1942|1943|strikers|jamestown/i, genre: 'Shoot \'em Up', icon: '🚀' },
  { pattern: /bomberman|wario|party|minigame/i, genre: 'Party', icon: '🎉' },
  { pattern: /command|conquer|starcraft|warcraft|age of|strategy|civilization|tactics/i, genre: 'Strategy', icon: '🏰' },
  { pattern: /sim|tycoon|city|simulation/i, genre: 'Simulation', icon: '🏗️' },
  { pattern: /beat.?em|streets of rage|double dragon|final fight|brawler/i, genre: 'Beat \'em Up', icon: '👊' },
  { pattern: /gta|grand theft auto|sandbox|open world/i, genre: 'Open World', icon: '🌍' },
];

function detectGenre(gameName: string): { genre: string; icon: string } {
  for (const { pattern, genre, icon } of genrePatterns) {
    if (pattern.test(gameName)) {
      return { genre, icon };
    }
  }
  return { genre: 'Action', icon: '🎮' };
}

function estimateYear(gameName: string, consoleName: string): string {
  // Extract year from game name if present
  const yearMatch = gameName.match(/\b(19[8-9][0-9]|200[0-9]|201[0-9]|202[0-5])\b/);
  if (yearMatch) return yearMatch[1];
  
  // Return a middle year for the console's lifespan
  const console = consoleData[consoleName];
  if (console) {
    const years = console.years.split('-');
    const startYear = parseInt(years[0]);
    return String(startYear + 2);
  }
  return 'Classic';
}

function generateDescription(gameName: string, consoleName: string, genre: string): string {
  const consoleInfo = consoleData[consoleName]?.info || `${consoleName} is a classic gaming platform`;
  
  const templates = [
    `${gameName} is a legendary ${genre} game that delivers an unforgettable gaming experience on ${consoleName}. This classic title showcases the best of ${genre} gameplay with challenging levels, memorable characters, and addictive mechanics that keep players coming back for more. Experience ${gameName} on your R36S handheld console with enhanced display and convenient save states.`,
    
    `Dive into the world of ${gameName}, a beloved ${genre} title from the ${consoleName} era. This game represents the golden age of ${genre} gaming, offering hours of entertainment with its engaging gameplay and timeless appeal. The R36S perfectly emulates this classic, allowing you to enjoy ${gameName} anywhere with crystal-clear graphics.`,
    
    `${gameName} stands as one of the most memorable ${genre} games on ${consoleName}. Whether you're a nostalgic fan or discovering it for the first time, this title offers an authentic retro gaming experience. Play it on your R36S with perfect emulation, customizable controls, and the ability to save your progress at any moment.`
  ];
  
  // Use game name hash to consistently select template
  const hash = gameName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return templates[hash % templates.length];
}

function generateFeatures(consoleName: string): string[] {
  const baseFeatures = [
    'Perfect emulation on R36S hardware',
    'Save states - save anywhere, anytime',
    'Fast forward support for grinding sections',
    'Customizable button mapping',
    'HD display upscaling for crisp graphics'
  ];
  
  const consoleSpecific: Record<string, string[]> = {
    'PSP': ['Widescreen 16:9 display support', 'Analog stick precision controls'],
    'PlayStation 1': ['Memory card save support', 'CD-quality audio emulation'],
    'Nintendo 64': ['Analog stick controls', 'Rumble pak experience'],
    'Dreamcast': ['VMU save support', 'Arcade-perfect ports'],
    'Gameboy Advance': ['Link cable multiplayer (with additional setup)', 'Original resolution mode'],
    'SNES': ['Mode 7 graphics support', 'Classic controller feel'],
    'NES': ['Classic 8-bit experience', 'CRT filter options'],
    'Arcade': ['Arcade-perfect emulation', 'Original difficulty settings'],
  };
  
  return [...baseFeatures, ...(consoleSpecific[consoleName] || [])];
}

function generateHowToPlay(gameName: string, consoleName: string): string[] {
  return [
    `Navigate to the ${consoleName} section in your R36S menu`,
    `Find "${gameName}" in the game list`,
    'Press A to launch the game',
    'Use the menu button to access save states and settings',
    'Enjoy the classic gaming experience!'
  ];
}

export function getGameInfo(name: string, consoleName: string): GameInfo {
  const { genre, icon: genreIcon } = detectGenre(name);
  const year = estimateYear(name, consoleName);
  const consoleInfo = consoleData[consoleName] || {
    info: `${consoleName} is a classic gaming platform.`,
    icon: '🎮',
    color: 'from-gray-600 to-gray-800'
  };
  
  return {
    name,
    console: consoleName,
    genre,
    genreIcon,
    year,
    description: generateDescription(name, consoleName, genre),
    features: generateFeatures(consoleName),
    consoleInfo: consoleInfo.info,
    consoleIcon: consoleInfo.icon,
    consoleColor: consoleInfo.color,
    howToPlay: generateHowToPlay(name, consoleName)
  };
}

export { consoleData };
