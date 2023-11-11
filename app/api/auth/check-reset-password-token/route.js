/**
 * api/activate/route.js
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { token } = await request.json();

    if (!token || typeof token !== "string" || token.length !== 64) {
      return NextResponse.json(
        { message: "Invalid Token", ok: false },
        { status: 400 },
      );
    }

    const isToken = await prisma.passwordResetToken.findFirst({
      where: {
        token,
      },
      include: {
        User: true,
      },
    });

    if (!isToken) {
      return NextResponse.json(
        { message: "Invalid Reset Password Code", ok: false },
        { status: 400 },
      );
    }

    if (!isToken.User) {
      return NextResponse.json(
        { message: "Target Email not existing!", ok: true },
        { status: 409 },
      );
    }

    if (isToken.resetAt) {
      return NextResponse.json(
        { message: "Reset Password Code Already Used!", ok: false },
        { status: 409 },
      );
    }

    const twentyFourHoursAgo = new Date(Date.now() - 4 * 60 * 60 * 1000);
    const isExpired = isToken.createdAt < twentyFourHoursAgo;

    if (isExpired) {
      return NextResponse.json(
        { message: "Reset Password Code Expired", ok: false },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { message: "Congratulations, Email Verified Successfully!", ok: true },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, ok: false },
      { status: 500 },
    );
  }
}
