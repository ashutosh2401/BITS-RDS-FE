import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const TOKEN_NAME = 'auth_token';

/**
 * Save JWT in an HTTP-only cookie
 */
export const setAuthCookie = (token: string) => {
  cookies().set(TOKEN_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'Strict', // Adjust based on your CSRF needs
    maxAge: 60 * 60 * 24, // 1 day
  });
};

/**
 * Get JWT from cookies
 */
export const getAuthToken = (): string | null => {
  return cookies().get(TOKEN_NAME)?.value || null;
};

/**
 * Remove JWT cookie (logout)
 */
export const removeAuthCookie = () => {
  cookies().set(TOKEN_NAME, '', { expires: new Date(0) });
};
