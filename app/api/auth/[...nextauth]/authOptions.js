/**
 * authOptions.js
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";
import * as bcrypt from "bcrypt";
import { randomUUID } from "crypto";

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
        let user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          select: {
            id: true,
            email: true,
            name: true,
            password: true,
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
        await prisma.session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + maxAge * 1000),
            sessionToken: token,
          }
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
          sessionToken: token,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.sessionToken = user.sessionToken;
      }
      // if (token?.sessionToken) {
      //   const { session } = await prisma.session.findFirst({
      //     where: {
      //       sessionToken: token.sessionToken
      //     }
      //   });
      //   if (!session) {
      //     return false;
      //   }
      // }
      console.log("user", user)
      console.log("token", token)

      return token
    },
    async session({ session, user }) {
      console.log("session", session)
      // if (session.user) {
      //   session.user.id = user.id;
      // }

      return session;
    },
  },

  events: {
    signOut: async ({ token, session }) => {
      if (token?.sessionToken) {
        await prisma.session.delete({
          where: {
            sessionToken: token.sessionToken
          }
        });
      }
    },
  },
};