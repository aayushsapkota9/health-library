import { NextRequest, NextResponse } from 'next/server';
import {
  authRoutes,
  adminRoutes,
  loggedInRoutes,
  publicRoutes,
} from '../src/router/routes';

export function middleware(request: NextRequest) {
  const currentUserString = request.cookies.get('currentUser')?.value;
  let currentUser;

  try {
    currentUser = currentUserString ? JSON.parse(currentUserString) : null;
  } catch (error) {
    console.error('Error parsing currentUser cookie:', error);
    currentUser = null;
  }

  const url = request.nextUrl.clone();
  const isLoggedIn = currentUser && Date.now() < currentUser.expiredAt * 1000;
  const isAdmin = currentUser?.roles.includes('admin');

  // Public routes are accessible to anyone
  if (publicRoutes.includes(url.pathname)) {
    return NextResponse.next();
  }

  // Redirect to login if trying to access protected routes and not logged in or session expired, avoiding redirect loop
  if (
    !isLoggedIn &&
    (adminRoutes.includes(url.pathname) ||
      loggedInRoutes.includes(url.pathname)) &&
    url.pathname !== '/auth/login'
  ) {
    const redirectUrl = new URL('/auth/login', request.url);
    const response = NextResponse.redirect(redirectUrl);
    response.cookies.delete('currentUser');
    return response;
  }

  // Admin routes
  if (adminRoutes.includes(url.pathname) && isLoggedIn) {
    if (isAdmin) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL('/auth/login', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Logged-in routes
  if (loggedInRoutes.includes(url.pathname) && isLoggedIn) {
    return NextResponse.next();
  }

  // Redirect to appropriate home page based on user role if trying to access auth route while already logged in
  if (authRoutes.includes(url.pathname) && isLoggedIn) {
    const redirectUrl = isAdmin
      ? new URL('/admin/dashboard', request.url)
      : new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Redirect to login if trying to access auth route while not logged in, avoiding redirect loop
  if (
    authRoutes.includes(url.pathname) &&
    !isLoggedIn &&
    url.pathname !== '/auth/login'
  ) {
    const redirectUrl = new URL('/auth/login', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Default behavior
  return NextResponse.next();
}
