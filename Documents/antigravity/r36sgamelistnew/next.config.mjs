/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  // Compression and optimization
  compress: true,
  // Include JSON data files in standalone build (moved from experimental in Next.js 16)
  outputFileTracingIncludes: {
    '/': ['./src/data/games.json'],
    '/game/*': ['./src/data/games.json'],
    '/game/**': ['./src/data/games.json'],
  },
  // Ensure static files are properly included in standalone build (moved from experimental in Next.js 16)
  outputFileTracingExcludes: {
    '*': [
      'node_modules/@swc/core-linux-x64-gnu',
      'node_modules/@swc/core-linux-x64-musl',
      'node_modules/@esbuild/linux-x64',
    ],
  },
  // Turbopack configuration (Next.js 16 default)
  turbopack: {
    // Empty config to use Turbopack with default settings
    // Webpack config removed as Turbopack is now default
  },
};

export default nextConfig;

