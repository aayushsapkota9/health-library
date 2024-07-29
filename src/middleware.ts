import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { adminRoutes, loggedInRoutes } from '../src/router/routes';
import { Role } from './types/enums/Role.enums';

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl.clone();
  const isLoggedIn = session && session.exp && Date.now() < session.exp * 1000;
  const userRole = session?.user.role;

  // Redirect to login if trying to access protected or admin routes and not logged in
  if (
    !isLoggedIn &&
    (adminRoutes.includes(url.pathname) ||
      loggedInRoutes.includes(url.pathname)) &&
    url.pathname !== '/auth/login'
  ) {
    const url = new URL(request.url);
    const response = NextResponse.redirect(new URL('/api/auth/signin', url));
    return response;
  }

  // Admin routes
  if (adminRoutes.includes(url.pathname) && isLoggedIn) {
    if (userRole === Role.SUPER_ADMIN) {
      return NextResponse.next();
    } else {
      const redirectUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // Logged-in routes
  if (loggedInRoutes.includes(url.pathname) && isLoggedIn) {
    if (userRole === Role.SUPER_ADMIN) {
      const redirectUrl = new URL('/unauthorized', request.url);
      return NextResponse.redirect(redirectUrl);
    } else {
      return NextResponse.next();
    }
  }

  // If trying to access an auth route while already logged in
  if (url.pathname === '/auth/login' && isLoggedIn) {
    const redirectUrl =
      userRole === Role.SUPER_ADMIN
        ? new URL('/admin/dashboard', request.url)
        : new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Default behavior
  return NextResponse.next();
}
