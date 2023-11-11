/**
 * nav-items.jsx
 */

import { getNavigationConfig } from "@/configuration/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

const NavItems = ({ session, pathname }) => {
  const { topNav } = session
    ? getNavigationConfig(session?.user?.role)
    : getNavigationConfig("GUEST");

  return (
    <nav className="m-0 mr-2 flex h-full w-full items-center gap-5 p-0">
      {topNav.map((el, idx) => {
        return (
          <Link
            key={idx}
            href={el.href}
            className="relative flex h-full w-full items-center justify-center whitespace-nowrap rounded-md px-2 text-sm hover:bg-neutral-50 dark:hover:bg-gray-900"
          >
            <div
              className={cn("absolute", {
                "-bottom-1.5 h-0.5 w-[100%] rounded-md  bg-blue-600":
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
