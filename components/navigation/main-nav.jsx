/**
 * main-nav.jsx
 */

"use client";

// import { getServerSession } from "next-auth";
// import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ModeToggle } from "./nav-bits/theme-chooser";

import UserDropdown from "./nav-bits/user-dropdown";
import NavItems from "./nav-bits/nav-items";
import SignInModal from "./nav-bits/sign-in-modal";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";

const MainNav = () => {
  // const session = await getServerSession(authOptions);

  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes("/auth")) {
    return <></>;
  }

  return (
    <section className="dark:supports-backdrop-blur:bg-black/30 supports-backdrop-blur:bg-white/30 sticky top-0 z-50 m-0 flex h-14 w-full items-center border-black/5 bg-gray-50/60 p-0 shadow-sm shadow-gray-300 backdrop-blur-md dark:border-white/5 dark:bg-black/60 dark:shadow-gray-800">
      <div className="mx-auto flex w-full max-w-7xl justify-between">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold ">
            Logo
          </Link>
        </div>
        <div className="flex gap-4">
          <NavItems session={session} pathname={pathname} />
          <ModeToggle />
          {session?.user ? (
            <UserDropdown />
          ) : (
            <div className="flex gap-2">
              <SignInModal />
              <Button
                onClick={() => router.push("/auth/register")}
                variant="outline"
                className="border-neutral-300"
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MainNav;
