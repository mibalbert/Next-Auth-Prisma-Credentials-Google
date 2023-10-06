/**
 * layout.jsx
 */

import SideNav from "@/components/navigation/side-nav";

const Layout = ({ children }) => {
  return (
    <section>
      <nav>
        <SideNav />
      </nav>
      <div>{children}</div>
    </section>
  );
};

export default Layout;
