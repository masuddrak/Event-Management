import { connectDB } from "@/lib/ocnnectDB";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
const bcrypt = require("bcrypt");

const handler = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) return null;
        // check mongodb
        const db =await connectDB();
        const currentUser = await db.collection("users").findOne({ email });
        if (!currentUser) return null;
        // decode password
        const bcreptPassword = bcrypt.compareSync(
          password,
          currentUser.password
        ); // true
        if (!bcreptPassword) return null;

        return currentUser;
      },
    }),
  ],
  callbacks: {},
  pages: {
    signIn: "/login",
  },
});
export { handler as GET, handler as POST };
