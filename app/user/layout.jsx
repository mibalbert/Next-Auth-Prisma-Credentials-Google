/**
 * layout.jsx
 */

import SideNav from "@/components/navigation/side-nav";

const Layout = ({ children }) => {
  return (
    <section>
      <div className="flex-1 grid-cols-[250px_minmax(0,1fr)]  items-start md:grid md:gap-0">
        <aside className="fixed z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 lg:sticky lg:block">
          <SideNav className="border-r" />
        </aside>
        <div className="px-10 py-5">{children}</div>
      </div>
    </section>
  );
};

export default Layout;
