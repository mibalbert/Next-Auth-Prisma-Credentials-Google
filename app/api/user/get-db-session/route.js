/**
 * api/reset-password/route.js
 */

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request) {
  try {
    const { id } = await request.json();

    const data = await prisma.session.findMany({
      where: {
        userId: id
      }
    })
    if (data) {

      return NextResponse.json(
        { message: "Successfully retrieved the Database Session!", data },
        { status: 200 },
      );
    }

    return NextResponse.json(
      { message: "No Database Session was found!", data: [] },
      { status: 404 },
    );

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: `Internal Server Error: ${error.message}` },
      { status: 500 },
    );
  }
}
