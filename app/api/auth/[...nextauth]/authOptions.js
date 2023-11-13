/**
 * authOptions.js
 */

import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { randomUUID } from "crypto";
import * as bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const authOptions = {
  pages: {
    signIn: "/auth/sign-in",
    signOut: "/auth/sign-out",
    error: "/auth/sign-in",
    verifyRequest: "/auth/verify-request",
    newUser: "/auth/new-user",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV !== "production",
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      checks: ["none"],
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) {
            return null;
          }
          let user = await prisma.user.findFirst({
            where: {
              email: credentials.email,
            },
            select: {
              id: true,
              email: true,
              name: true,
              password: true,
              active: true,
              role: true,
              account: {
                select: {
                  provider: true,
                },
              },
            },
          });
          if (!user) {
            throw new Error("Email not registered!");
          }
          if (user && user?.account?.provider === "google") {
            throw new Error("Email used to sign-in with Google, use that instead");
          }
          if (!(await bcrypt.compare(credentials.password, user.password))) {
            throw new Error("Invalid credentials");
          }
          if (!user.active) {
            throw new Error("Email is not verified");
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            image: user.image,
          };
        } catch (error) {
          throw new Error(error)
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile }) {
      try {
        if (account && account.provider === "google") {
          const user = await prisma.user.findFirst({
            where: {
              email: profile.email,
            },
            include: {
              account: true,
            },
          });
          if (user?.account?.provider === "credentials") {
            // return "/"
            throw new Error(
              "Account created using credentials, use that to sign-in",
            );
          }
          if (!user) {
            const newUser = await prisma.User.create({
              data: {
                email: profile.email,
                name: profile.name,
                role: "USER",
              },
            });
            if (!newUser) {
              throw new Error("Could not create a new User");
            }
            const newAccount = await prisma.Account.create({
              data: {
                type: account.type,
                provider: account.provider,
                providerAccountId: account.providerAccountId,
                access_token: account.access_token,
                expires_at: account.expires_at,
                user: {
                  connect: {
                    id: newUser.id,
                  },
                },
              },
            });
            if (!newAccount) {
              throw new Error(
                "Could not create new user with these google credentials",
              );
            }
          }
        }
        return true;
      } catch (error) {
        throw new Error(error);
      }
    },
    async jwt({ token, user }) {
      if (user) {
        const sessToken = randomUUID();
        const session = await prisma.Session.create({
          data: {
            userId: user.id,
            expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            sessionToken: sessToken,
          },
        });
        if (!session) {
          throw new Error("Could not create a new Session!");
        }
        token = {
          ...token,
          id: user?.id,
          role: user?.role,
          sessionId: session.id,
          sessionToken: session.sessionToken,
        };
      }
      return token;
    },
    //Client side session. Everything you return here can be accessed in the client side.
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token?.id;
        session.user.role = token?.role ?? "USER";
      }
      return session;
    },
  },
  //Uncomment if you want not to store the sessions in the db. Bassically this delets the current session of the logged-in user.
  // events: {
  //   signOut: async ({ token }) => {
  //     if (token?.sessionToken) {
  //       const deleteSession = await prisma.Session.delete({
  //         where: {
  //           id: token?.sessionId,
  //           sessionToken: token?.sessionToken,
  //         },
  //       });
  //       if (!deleteSession) {
  //         throw new Error("Could not delete Session!");
  //       }
  //     }
  //   },
  // },
};
