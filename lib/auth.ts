import NextAuth from "next-auth";
import Resend from "next-auth/providers/resend";
import { getDb } from "@/lib/db";
import { users } from "@/drizzle/schema";
import { eq } from "drizzle-orm";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Resend({
      apiKey: process.env.RESEND_API_KEY,
      from: "1stvibe.ai <hello@1stvibe.ai>",
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      const db = getDb();
      const existing = await db
        .select()
        .from(users)
        .where(eq(users.email, user.email))
        .limit(1);
      if (existing.length === 0) {
        await db.insert(users).values({
          id: crypto.randomUUID(),
          email: user.email,
        });
      }
      return true;
    },
    async session({ session }) {
      if (session.user?.email) {
        const db = getDb();
        const [dbUser] = await db
          .select()
          .from(users)
          .where(eq(users.email, session.user.email))
          .limit(1);
        if (dbUser) {
          session.user.id = dbUser.id;
        }
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
    verifyRequest: "/verify-email",
  },
});
