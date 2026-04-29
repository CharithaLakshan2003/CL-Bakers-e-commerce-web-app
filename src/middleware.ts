import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Mock middleware to protect routes
  // In a real app, NextAuth middleware would be used
  const { pathname } = request.nextUrl;
  
  // Just logging for now, frontend zustand handles UI auth logic
  return NextResponse.next();
}

export const config = {
  matcher: ['/account/:path*', '/admin/:path*', '/baker/:path*', '/checkout'],
};
