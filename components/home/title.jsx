/**
 * title.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Link from "next/link";

const Title = async () => {
  const session = await getServerSession(authOptions);

  return (
    <div className="mx-auto my-20 w-full max-w-5xl space-y-8 text-center dark:text-white">
      <div className="space-y-2">
        <div className="text-4xl font-bold">NextJs 14 - NextAuth - Prisma</div>
        <div>#NextAuth with #Credentails and #Google</div>
      </div>
      <div className="mx-auto   w-full  max-w-[90%] text-lg  md:max-w-xl">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto
        sint animi dolores id veniam soluta sed possimus temporibus placeat
        eaque.
      </div>
      <div className="flex w-full justify-center">
        <div className="flex flex-col items-center gap-2">
          <div className="flex gap-2">
            <div>
              Hi, {session?.user?.name || <span>( Sign-In first )</span>}
            </div>
          </div>
          <div className="flex gap-2">
            <div>Logged in with email:</div>
            <div>{session?.user?.email || <span>( Sign-In first )</span>}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Title;
