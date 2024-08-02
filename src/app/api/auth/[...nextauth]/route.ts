import apiRoutes from '@/src/config/api.config';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import { JWT } from 'next-auth/jwt';
const handler = NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',

      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const payload = {
          email: credentials?.username,
          password: credentials?.password,
        };

        const { data: response }: any = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}${apiRoutes.auth.login}`,
          payload
        );
        if (response.status === 200) {
          // Any object returned will be saved in `user` property of the JWT
          return response.data;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 900, //after leaving the tab
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...token, ...user };
      }

      // Extract the expiration time from the JWT and store it in the token
      if (token?.token) {
        //@ts-ignore
        const decodedToken = JSON.parse(
          //@ts-ignore
          Buffer.from(token.token.split('.')[1], 'base64').toString()
        );
        token.expiresIn = decodedToken.exp;
      }

      return token;
    },
    async session({ session, token, user }) {
      return { ...session, ...token, ...user };
    },
  },
});
export { handler as GET, handler as POST };
