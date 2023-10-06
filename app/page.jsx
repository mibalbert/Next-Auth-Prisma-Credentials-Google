/**
 * page.jsx
 */

import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  // const data = await prisma.user.findFirst({
  //   where: {
  //     email: "bitcode222@gmail.com",
  //   },
  //   select: {
  //     accounts: true,
  //   },
  // });

  const session = await getServerSession(authOptions);

  console.log("SESSSIONOONONON", session);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div></div>
    </main>
  );
}
