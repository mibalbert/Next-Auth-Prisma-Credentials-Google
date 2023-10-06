/**
 * main-nav.jsx
 */

// "use client";

import UserDropdown from "./nav-bits/user-dropdown";
import NavItems from "./nav-bits/nav-items";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { ModeToggle } from "./nav-bits/theme-chooser";
import { Button } from "../ui/button";
import SignInModal from "./nav-bits/sign-in-modal";

const MainNav = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex items-center w-full border-b h-14 border-slate-200 dark:border-slate-800">
      <div className="flex justify-between w-full mx-auto max-w-7xl">
        <div className="flex items-center">
          <div className="text-lg font-bold ">Logo</div>
        </div>
        <div className="flex gap-4">
          <NavItems session={session} />
          <ModeToggle />
          {session?.user ? <UserDropdown /> : <SignInModal />}
        </div>
      </div>
    </section>
  );
};

export default MainNav;
