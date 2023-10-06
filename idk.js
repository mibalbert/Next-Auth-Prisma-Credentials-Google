
import { randomUUID } from "crypto";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { Prisma } from "@prisma/client";
import bcrypt from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import isEmail from "validator/lib/isEmail";

import { prisma } from "@acme/db";


export const providers = ["email", "discord"]

const client = PrismaAdapter(prisma);

const maxAge = 30 * 24 * 60 * 60; // 30 days

const authorize = async (credentials) => {
  const { email, password } = credentials;
  let user;

  try {
    if (!isEmail(email)) {
      throw new Error("Email should be a valid email address");
    }
    user = await client.getUserByEmail(email);
    if (!user) {
      user = await client.createUser({
        email,
        password: bcrypt.hashSync(password, 10),
      });
    } else {
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (!passwordsMatch) {
        throw new Error("Password is not correct");
      }
    }
    const token = randomUUID();
    await client.createSession({
      userId: user.id,
      expires: new Date(Date.now() + maxAge * 1000),
      sessionToken: token,
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      image: user.image,
      sessionToken: token,
    };
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const EmailCredentials = CredentialsProvider({
  name: "email",
  credentials: {
    email: { label: "Email", type: "text" },
    password: { label: "Password", type: "password" },
  },
  authorize,
});

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  adapter: client,
  providers: [
    EmailCredentials
  ],
  session: {
    strategy: "jwt",
    maxAge: maxAge, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.userId = user.id;
        token.sessionToken = user.sessionToken;
      }
      if (token?.sessionToken) {
        const session = await prisma.session.findFirst({
          where: {
            sessionToken: token.sessionToken
          }
        });
        console.log(session)
        if (!session) {
          return null;
        }
      }
      return token;
    }
  },
  events: {
    signOut: async ({ token, session }) => {
      if (token?.sessionToken) {
        await client.session.finFirst({
          where: {
            sessionToken: token.sessionToken
          }
        });
      }
    },
  },
};

export const {
  handlers: { GET, POST },
  auth,
  CSRF_experimental,
} = NextAuth(authOptions);
