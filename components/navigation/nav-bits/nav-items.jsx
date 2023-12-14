/**
 * nav-items.jsx
 */

import { getNavigationConfig } from "@/configuration/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

// const topNav = [
//   {
//     title: "Home",
//     href: "/",
//   },
//   {
//     title: "Dashboard",
//     href: "/user/dashboard",
//   },
//   {
//     title: "Docs",
//     href: "/docs/overview",
//   },
// ];

const NavItems = ({ session, pathname }) => {
  const { topNav } = getNavigationConfig(session?.user?.role ?? "GUEST");

  return (
    <nav className="m-0 mr-2 flex  h-[100%] w-full items-center gap-3  p-0">
      {topNav.map((el, idx) => {
        return (
          <Link
            key={idx}
            href={el.href}
            className="relative flex h-full w-full items-center justify-center whitespace-nowrap  px-3 text-sm hover:bg-gray-100 hover:text-black dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <div
              className={cn("absolute", {
                "bottom-0 h-0.5 w-[100%] rounded-md  bg-blue-600":
                  pathname.split("")[1] === el.href.split("")[1],
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
