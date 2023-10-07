/**
 * page.jsx
 */

import { Icons } from "@/components/ui/icons";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);

  let sess;
  if (session) {
    sess = await prisma.session.findMany({
      where: {
        userId: session.user.id,
      },
    });
  }

  return (
    <main className="w-full min-h-[calc(100vh-7.5rem)] pattern-grid inner-shadow flex items-center justify-center">
      <div className="grid items-center w-full grid-cols-3 gap-10 mx-auto max-w-[250px] sm:max-w-xs lg:max-w-lg md:gap-20 xl:max-w-3xl 2xl:max-w-4xl">
        <Icons.nextjs13 className="flex items-center justify-center col-span-3 lg:col-span-1" />
        <Icons.prisma className="flex items-center justify-center col-span-3 lg:col-span-1" />
        <div className="relative flex items-center justify-center col-span-3 lg:col-span-1">
          <Image
            src="/next-auth.png"
            alt="next-auth"
            width={200}
            height={200}
            className="object-cover w-full h-full scale-125"
          />
        </div>
        {session && (
          <div>
            <div>{`Web Session`}</div>
            <pre>{JSON.stringify(session, null, 2)}</pre>
          </div>
        )}
        {session && (
          <div>
            <div>{`DB Session`}</div>
            <pre>{JSON.stringify(sess, null, 2)}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
