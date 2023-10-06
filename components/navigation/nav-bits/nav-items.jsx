/**
 * nav-items.jsx
 */

import { getNavigationConfig } from "@/configuration/navigation";
import Link from "next/link";

const NavItems = ({ session }) => {
  const { topNav } = session
    ? getNavigationConfig(session?.user?.role)
    : getNavigationConfig("GUEST");

  return (
    <nav className="flex items-center w-full h-full gap-5 mr-2">
      {topNav.map((el, idx) => {
        return (
          <Link
            key={idx}
            href={el.href}
            className="w-full text-sm whitespace-nowrap"
          >
            {el.title}
          </Link>
        );
      })}
    </nav>
  );
};

export default NavItems;
