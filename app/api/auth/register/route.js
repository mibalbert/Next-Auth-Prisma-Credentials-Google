/**
 * api/register/route.js
 */


import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const expiresInDays = 30; // Token expires in 30 days

function generateAccessToken(userId) {
  const secretKey = process.env.JWT_SECRET || 'yourSecretKey'; // Replace 'yourSecretKey' with your actual secret key or provide a default value
  const expiresIn = `${expiresInDays}d`; // Token expires in 30 days

  const payload = {
    userId: userId,
  };

  const accessToken = jwt.sign(payload, secretKey, { expiresIn });
  return accessToken;
}

export async function POST(request) {
  try {
    const { data } = await request.json();

    const { email, firstName, lastName, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json({ message: 'User already registered' }, { status: 200 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const accessToken = generateAccessToken(email);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: `${firstName} ${lastName}`,
        password: hash,
      },
    });
    let account
    if (newUser) {
      account = await prisma.account.create({
        data: {
          type: 'credentials',
          provider: 'credentials',
          providerAccountId: 'credentials123',
          access_token: accessToken,
          expires_at: Math.floor((Date.now() + expiresInDays * 24 * 60 * 60 * 1000) / 1000), // 30 days from now
          user: {
            connect: {
              id: newUser.id
            }
          }
        },
      });
    }
    if (account) {
      return NextResponse.json({ message: 'Success!', user, account }, { status: 200 });
    } else {
      // Handle account creation error
      console.error('Account creation failed');
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}