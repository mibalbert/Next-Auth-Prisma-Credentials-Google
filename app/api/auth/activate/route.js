/**
 * api/activate/route.js
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

    const isToken = await prisma.activateToken.findFirst({
      where: {
        token,
      },
      include: {
        User: true,
      },
    });

    if (!isToken) {
      return NextResponse.json(
        { message: "Invalid Activation Code", ok: false },
        { status: 400 },
      );
    }

    if (isToken.User.active) {
      return NextResponse.json(
        { message: "Target Email Already Activated!", ok: true },
        { status: 409 },
      );
    }

    if (isToken.activatedAt) {
      return NextResponse.json(
        { message: "Activation Code Already Used!", ok: false },
        { status: 409 },
      );
    }

    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const isExpired = isToken.createdAt < twentyFourHoursAgo;

    if (isExpired) {
      return NextResponse.json(
        { message: "Activation Code Expired", ok: false },
        { status: 400 },
      );
    }

    // Update user's active status and token's activatedAt field
    await prisma.user.update({
      where: {
        id: isToken.User.id,
      },
      data: {
        active: true,
      },
    });

    const updatedToken = await prisma.activateToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    if (updatedToken) {
      return NextResponse.json(
        { message: "Congratulations, Email Verified Successfully!", ok: true },
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

// const user = await prisma.user.findFirst({
//   where: {
//     ActivateToken: {
//       some: {
//         AND: [
//           {
//             activatedAt: null,
//           },
//           {
//             createdAt: {
//               gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
//             },
//           },
//           {
//             token,
//           },
//         ],
//       },
//     },
//   },
// });
