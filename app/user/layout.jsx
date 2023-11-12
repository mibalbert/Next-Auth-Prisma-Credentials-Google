/**
 * layout.jsx
 */

import SideNav from "@/components/navigation/side-nav";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const Layout = async ({ children }) => {
  const session = await getServerSession(authOptions);

  return (
    <section className="">
      <div className="mx-auto w-full max-w-7xl flex-1 grid-cols-[200px_minmax(0,1fr)] items-start md:grid md:gap-0">
        <aside className=" top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 lg:sticky lg:block">
          <SideNav
            session={session}
            className="w-full border-r border-gray-200 dark:border-gray-800"
          />
        </aside>
        <div className="px-10 py-5">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
