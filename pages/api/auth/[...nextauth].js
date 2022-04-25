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
  adapter: FaunaAdapter(client),
  pages: {
    //signIn: "/signin",
  },
  callbacks: {
    async session({ session, token, user }) {
      // console.log(
      //   "--Session CALLED--",
      //   session,
      //   "--user--",
      //   user,
      //   "--token--",
      //   token
      // );
      session.user.role = user.role; //ADD THIS LINE SO THAT ROLE IS INCLUDED AS PART OF SESSION INFO.
      return session;
    },
  },
});
