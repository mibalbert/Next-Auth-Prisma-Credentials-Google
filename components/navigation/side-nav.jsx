/**
 * sidebar-nav.jsx
 */

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

import { getNavigationConfig } from "@/configuration/navigation";

const SideNav = ({ className, session }) => {
  const pathname = usePathname();

  console.log(session);
  const { sideNav } = getNavigationConfig(session?.user?.role);
  console.log("sidenav", sideNav);

  return (
    <section className={cn("h-full w-full  bg-card/40 ", className)}>
      <div className="flex w-full px-6 py-6">
        <div className="relative grid w-full grid-flow-row gap-2 text-sm auto-rows-max ">
          <div className="absolute left-0 w-full h-full">
            {sideNav &&
              sideNav.map((item, index) => (
                <div key={index}>
                  <div className="text-xl font-semibold text-neutral-800 dark:text-neutral-400">
                    {item.title}
                  </div>
                  {item.data && item.data.length > 0 ? (
                    <ul>
                      {item.data.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "relative flex w-full items-center  rounded-md px-3 py-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-600"
                            )}
                          >
                            <div
                              className={cn("absolute", {
                                "left-0 h-[70%]  w-0.5 rounded-md  bg-blue-600":
                                  pathname === subItem.href,
                              })}
                            ></div>
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SideNav;
