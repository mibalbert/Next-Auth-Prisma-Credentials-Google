/**
 * api/reset-password/route.js
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const data = await request.json();

    const { token } = data;

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

    if (!isToken.User.active) {
      return NextResponse.json(
        { message: "Email not activated, do that first!", ok: false },
        { status: 409 },
      );
    }

    if (isToken.resetdAt) {
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

    ///Change the password with the user's password (hashed)

    // Update user's active status and token's activatedAt field
    // await prisma.user.update({
    //   where: {
    //     id: isToken.User.id,
    //   },
    //   data: {
    //     active: true,
    //   },
    // });

    ////////////Change the tokn=en ot be user

    if (!user) {
      return NextResponse.json(
        { message: "Reset Password Code Expired", ok: false },
        { status: 400 },
      );
    }

    const updatedToken = await prisma.passwordResetToken.update({
      where: {
        token,
      },
      data: {
        resetdAt: new Date(),
      },
    });

    if (updatedToken) {
      return NextResponse.json(
        {
          message: "Token verified, you can choose a new password now!",
          ok: true,
        },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "Token verification failed!", ok: false },
      { status: 500 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}`, ok: false },
      { status: 500 },
    );
  }
}
