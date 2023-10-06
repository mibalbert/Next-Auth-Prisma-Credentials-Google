// /**
//  * middleware.js
//  */
import { withAuth } from "next-auth/middleware"

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.nextUrl.pathname === "/user") {
        return token?.userRole === "user"
      }
      // `/me` only requires the user to be logged in
      return !!token
    },
  },
})

export const config = { matcher: ["/admin", "/me"] }

// import { withAuth } from 'next-auth/middleware'
// import { NextResponse } from 'next/server'


// export default withAuth(
//   function middleware(req) {
//     // if (req.nextUrl.pathname.startsWith("/user") && req.nextauth.token?.role !== "USER") {
//     if (req.nextUrl.pathname.startsWith("/user")) {
//       return NextResponse.redirect(
//         // new URL("/auth/signIn?message=You_Are_Not_Authorized!&message2=Sign_In_with_the_proper_credentials_to_gain_access", req.url)
//         new URL('/', req.url)
//       );
//     }
//     return null; // Return null if none of the conditions are met
//   },
//   {
//     callbacks: {
//       authorized: ({ token }) => {
//         return !!token;
//       },
//     },
//   }
// );
// export const config = {
//   matcher: ["/user/:path*"],
// };
