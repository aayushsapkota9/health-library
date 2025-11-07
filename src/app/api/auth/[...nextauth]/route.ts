import apiRoutes from '@/src/config/api.config';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { Role } from '@/src/types/enums/Role.enums';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'admin@admin.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password',
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const url = `${process.env.NEXT_PUBLIC_BASE_URL}${apiRoutes.auth.login}`;
        const response = await axios.post(url, {
          email: credentials.email,
          password: credentials.password,
        });

        const data = response.data.data;
        if (!data?.token || !data?.user) return null;

        const payload = data.user; // backend already gives id, email, name, role

        return {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role as Role,
          token: data.token,
          tokenExpiry: Number(new Date(payload.exp * 1000)) || undefined,
        };
      },
    }),
  ],

  session: { strategy: 'jwt', maxAge: 3600 },
  pages: { signIn: '/login', error: '/login' },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = (user as any).role;
        token.token = (user as any).token;
        token.exp = (user as any).tokenExpiry;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email!,
          name: token.name!,
          role: token.role as Role,
        };
        (session as any).token = token.token;
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  debug: false,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
