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
import { MobileNav } from "./mobile-nav";

const MainNav = () => {
  // const session = await getServerSession(authOptions);

  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes("/auth")) {
    return <></>;
  }

  return (
    <section className="dark:supports-backdrop-blur:bg-black/30 supports-backdrop-blur:bg-white/30 sticky top-0 z-50 m-0 flex h-14 items-center border-b border-gray-200 bg-gray-50/30 p-0 shadow-gray-300 backdrop-blur-md dark:border-gray-800 dark:bg-black/60 dark:shadow-none lg:w-full">
      <div className="mx-auto flex w-[90%] max-w-7xl justify-between  lg:w-full">
        <div className="flex items-center">
          <Link href="/" className="text-lg font-bold ">
            Logo
          </Link>
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          {!pathname.startsWith("/user") && (
            <NavItems session={session} pathname={pathname} />
          )}
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
        <MobileNav />
      </div>
    </section>
  );
};

export default MainNav;
