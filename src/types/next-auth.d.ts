import NextAuth, { User as NextAuthUser, DefaultSession } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    token: string;
  }
  interface User extends NextAuthUser {
    id: string;
    email: string;
    name: string;
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
    };
    exp: number;
    jti: string;
    iat: number;
  }
}
