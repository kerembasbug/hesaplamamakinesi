import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Try to get country from Cloudflare/Vercel headers
  // Note: request.geo is deprecated in Next.js 16, using headers only
  const country = request.headers.get('cf-ipcountry') || 
                  request.headers.get('x-vercel-ip-country') || 
                  request.headers.get('x-forwarded-for')?.split(',')[0] ||
                  'US'; // Default to US

  return NextResponse.json({ country });
}

