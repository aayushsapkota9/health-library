import NextAuth, { User as NextAuthUser, DefaultSession } from 'next-auth';
import { Role } from './enums/Role.enums';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
    };
    token: string;
  }
  interface User extends NextAuthUser {
    id: string;
    email: string;
    name: string;
    role: Role;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      email: string;
      name: string;
      role: Role;
    };
    expiresIn: number;
    exp: number;
    jti: string;
    iat: number;
  }
}
