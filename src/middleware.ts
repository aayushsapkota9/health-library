import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { Role } from './types/enums/Role.enums';
import { routeConfig } from './router/routes';

export async function middleware(request: NextRequest) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const url = request.nextUrl.clone();
  const isLoggedIn =
    !!session && session.exp && Date.now() < session.exp * 1000;
  const userRole: Role | undefined = session?.role as Role;

  // Redirect to login if trying to access protected routes and not logged in
  if (!isLoggedIn && routeConfig.some((route) => route.link === url.pathname)) {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url));
  }

  if (isLoggedIn) {
    const route = routeConfig.find((route) => route.link === url.pathname);
    if (route) {
      if (route.roles.includes(userRole!)) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL('/admin/unauthorized', request.url)
        );
      }
    }
  }

  // Redirect logged-in user from sign-in page
  if (url.pathname === '/api/auth/signin' && isLoggedIn) {
    const redirectUrl =
      userRole === Role.SUPER_ADMIN
        ? new URL('/admin/dashboard', request.url)
        : new URL('/', request.url);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
}
