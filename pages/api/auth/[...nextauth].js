import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Client as FaunaClient } from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";
import EmailProvider from "next-auth/providers/email";

const client = new FaunaClient({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
});

export default NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  adapter: FaunaAdapter(client),
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // Persist the OAuth access_token to the token right after signin
      if (user) {
        // User object only passed on initial JWT creation

        token.isAdmin = user.role === "admin";
      }
      //console.log(token);
      return token;
    },
  },
});
