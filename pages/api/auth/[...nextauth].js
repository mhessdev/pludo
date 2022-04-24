import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Client as FaunaClient } from "faunadb";
import { FaunaAdapter } from "@next-auth/fauna-adapter";

const client = new FaunaClient({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
});

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: FaunaAdapter(client),
});
