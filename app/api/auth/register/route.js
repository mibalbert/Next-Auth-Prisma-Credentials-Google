/**
 * api/register/route.js
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";

const expiresInDays = 30;

function generateAccessToken(userId) {
  const secretKey = process.env.JWT_SECRET || "yourSecretKey";
  const expiresIn = `${expiresInDays}d`;

  const payload = {
    userId: userId,
  };

  const accessToken = jwt.sign(payload, secretKey, { expiresIn });
  return accessToken;
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { email, firstName, lastName, password } = data;

    const user = await prisma.user.findFirst({
      where: {
        email: email,
      },
    });

    if (user) {
      return NextResponse.json(
        {
          message: "Email already used, try using a diffrent email!",
          ok: false,
        },
        { status: 200 },
      );
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const accessToken = generateAccessToken(email);

    const newUser = await prisma.user.create({
      data: {
        email: email,
        name: `${firstName} ${lastName}`,
        password: hash,
        role: "USER",
      },
    });
    let account;
    if (newUser) {
      account = await prisma.account.create({
        data: {
          type: "credentials",
          provider: "credentials",
          providerAccountId: "credentials123",
          access_token: accessToken,
          expires_at: Math.floor(
            (Date.now() + expiresInDays * 24 * 60 * 60 * 1000) / 1000,
          ), // 30 days from now
          user: {
            connect: {
              id: newUser.id,
            },
          },
        },
      });
    }

    if (account) {
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.NODEMAILER_ADMIN_EMAIL,
          pass: process.env.NODEMAILER_ADMIN_PASS,
        },
      });
      const token = await prisma.activateToken.create({
        data: {
          userId: newUser.id,
          token: `${uuidv4()}${uuidv4()}`.replace(/-/g, ""),
        },
      });

      const mailOptions = {
        from: `Email Activation Token <${process.env.NODEMAILER_ADMIN_EMAIL}>`,
        to: `${email}`,
        subject: "Activate your Email now to enjoy all the benefits of ....",
        text: `That was easy! ${process.env.BASE_URL}/auth/activate/${token.token}`,
      };
      return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.error("Error occurred:", error);
            reject(
              NextResponse.json({
                message: "Error occurred: " + error.message,
                ok: false,
                status: 500,
              }),
            );
          } else {
            console.log("Email sent successfully:", info.response);
            resolve(
              NextResponse.json({
                message:
                  "Verification Email sent successfully. Check out your inbox!",
                ok: true,
                status: 200,
              }),
            );
          }
        });
      });
    } else {
      console.error("Account creation failed");
      return NextResponse.json(
        { message: "Internal Server Error", ok: false },
        { status: 500 },
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error", ok: false },
      { status: 500 },
    );
  }
}
