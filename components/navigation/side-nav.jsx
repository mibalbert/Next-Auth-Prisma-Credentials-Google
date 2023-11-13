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
  const { sideNav } = getNavigationConfig(session?.user?.role ?? "GUEST");

  return (
    <section className={cn(" h-full  w-full ", className)}>
      <div className="flex w-full py-6">
        <div className="relative grid w-full grid-flow-row auto-rows-max gap-2 text-sm ">
          <div className="absolute left-0 h-full w-full max-w-[80%]">
            {sideNav &&
              sideNav.map((item, index) => (
                <div key={index} className="my-2 space-y-2">
                  <div className="text-xl font-semibold text-gray-800 dark:text-gray-400 ">
                    {item.title}
                  </div>
                  {item.data && item.data.length > 0 ? (
                    <ul>
                      {item.data.map((subItem, subIndex) => (
                        <li key={subIndex}>
                          <Link
                            href={subItem.href}
                            className={cn(
                              "relative flex w-full items-center  rounded-md px-3 py-1.5 hover:bg-gray-100 dark:hover:bg-gray-600",
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
