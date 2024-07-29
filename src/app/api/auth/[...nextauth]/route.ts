import apiRoutes from '@/src/config/api.config';
import { HttpService } from '@/src/services';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
const http = new HttpService();
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
        // Add logic here to look up the user from the credentials supplied
        const response: any = await http.service().post(apiRoutes.auth.login, {
          email: credentials?.username,
          password: credentials?.password,
        });
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
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      return { ...session, ...token, ...user };
    },
  },
});
export { handler as GET, handler as POST };
