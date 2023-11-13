/**
 * middleware.js
 */

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname.startsWith("/user") &&
      req.nextauth.token?.role !== "USER"
    ) {
      return NextResponse.redirect(
        //Use this type of url if you want to extract the error message and display it
        // new URL("/auth/signIn?error=You_Are_Not_Authorized!&message2=Sign_In_with_the_proper_credentials_to_gain_access", req.url)
        new URL("/", req.url),
      );
    }
    return null;
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  },
);
export const config = {
  matcher: ["/user/:path*"],
};
