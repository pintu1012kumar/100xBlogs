import { NextRequest, NextResponse } from 'next/server'

const corsOptions = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization', // ✅ include Content-Type
}

export function middleware(req: NextRequest) {
  const isPreflight = req.method === 'OPTIONS'

  // Preflight request (for CORS)
  if (isPreflight && req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.json({}, { headers: corsOptions })
  }

  const res = NextResponse.next()

  // Add CORS headers to actual requests
  if (req.nextUrl.pathname.startsWith('/api')) {
    Object.entries(corsOptions).forEach(([key, value]) => {
      res.headers.set(key, value)
    })
  }

  return res
}

export const config = {
  matcher: ['/api/:path*'],
}
