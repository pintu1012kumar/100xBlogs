import { NextRequest, NextResponse } from 'next/server'

const corsOptions = {
  'Access-Control-Allow-Origin': '*', // Allow all origins
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

export function middleware(req: NextRequest) {
  const isPreflight = req.method === 'OPTIONS'

  // Handle preflight CORS
  if (isPreflight && req.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.json({}, { headers: corsOptions })
  }

  const res = NextResponse.next()

  // Set CORS headers for API routes
  if (req.nextUrl.pathname.startsWith('/api')) {
    Object.entries(corsOptions).forEach(([key, value]) => {
      res.headers.set(key, value)
    })
  }

  return res
}

export const config = {
  matcher: ['/api/:path*'], // Only apply middleware to API routes
}
