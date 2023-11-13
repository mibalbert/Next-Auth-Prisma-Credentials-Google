/**
 * nav-items.jsx
 */

import { getNavigationConfig } from "@/configuration/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavItems = ({ session, pathname }) => {
  const { topNav } = getNavigationConfig(session?.user?.role ?? "GUEST");

  return (
    <nav className="m-0 mr-2 flex  h-[100%] w-full items-center gap-5  p-0">
      {topNav.map((el, idx) => {
        return (
          <Link
            key={idx}
            href={el.href}
            className="relative flex items-center justify-center w-full h-full px-2 text-sm rounded-md whitespace-nowrap hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <div
              className={cn("absolute", {
                "-bottom-1 h-0.5 w-[100%] rounded-md  bg-blue-600":
                  pathname === el.href,
              })}
            ></div>
            {el.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
