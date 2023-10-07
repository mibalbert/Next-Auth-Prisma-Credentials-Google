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

const MainNav = () => {
  // const session = await getServerSession(authOptions);

  const { data: session } = useSession();

  const router = useRouter();
  const pathname = usePathname();

  if (pathname.includes("/auth")) {
    return <></>;
  }

  return (
    <section className="flex items-center w-full h-14 ">
      <div className="flex justify-between w-full mx-auto max-w-7xl">
        <div className="flex items-center">
          <div className="text-lg font-bold ">Logo</div>
        </div>
        <div className="flex gap-4">
          <NavItems session={session} />
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
