/**
 * authOptions.js
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";
import { profile } from "console";

const maxAge = 30 * 24 * 60 * 60; // 30 days in seconds

export const authOptions = {
  pages: {
    signIn: '/auth/sign-in',
    signOut: '/auth/sign-out',
    error: '/auth/sign-in',
    verifyRequest: '/auth/verify-request',
    newUser: '/auth/new-user'
  },
  session: {
    strategy: "jwt",
    maxAge: maxAge, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        let user = await prisma.User.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
            role: true,
            accounts: {
              select: {
                provider: true,
              },
            },
          },
        });
        if (!user) {
          throw new Error("Email not registered!");
        }
        if (user && user.accounts[0].provider === "google") {
          throw new Error("Email used to sign-in with Google, use that instead");
        }
        if (!(await bcrypt.compare(credentials.password, user.password))) {
          throw new Error("Invalid credentials");
        }
        const token = randomUUID();
        const oo = await prisma.Session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + maxAge * 1000),
            sessionToken: token,
          }
        });
        if (oo) {
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
            sessionToken: token,
            sessionId: oo.id
          };
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          id: user.id,
          role: user.role,
          sessionToken: user.sessionToken,
          sessionId: user.sessionId
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        // session.user.se = token.role;
      }
      return session;
    },
  },

  events: {
    signOut: async ({ token }) => {
      console.log("TOKENNNNNNNN", token)
      if (token?.sessionToken) {
        const ooo = await prisma.Session.delete({
          where: {
            id: token.sessionId,
            sessionToken: token.sessionToken
          }
        });
        console.log(ooo)
      }
    },
  },
};