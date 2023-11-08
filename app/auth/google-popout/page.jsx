// /**
//  * google-sing-in-popout.jsx
//  */

// "use client";

// import { signIn, useSession } from "next-auth/react";
// import { useEffect } from "react";

// const GooglePopout = () => {
//   const { data: session, status } = useSession();

//   useEffect(() => {
//     if (!(status === "loading") && !session) void signIn("google");

//     // if (session?.user)
//   }, [session, status]);

//   return (
//     <div
//     // style={{
//     //   width: "100vw",
//     //   height: "100vh",
//     //   position: "absolute",
//     //   left: 0,
//     //   top: 0,
//     //   background: "white",
//     // }}
//     ></div>
//   );
// };

// export default GooglePopout;
