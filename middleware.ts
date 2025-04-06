import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('auth_token')?.value; // Read token from cookie

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  return NextResponse.next();
}

// Apply middleware to protect `/dashboard` and nested routes
export const config = {
  matcher: ['/resume/new/:path*'],
};
