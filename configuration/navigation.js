/**
 * navigation.js
 */

// Define navigation configurations (top nav links and side nav links)
const navigationConfig = {
  ////Guest
  guestTopNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Docs",
      href: "/docs/overview",
    },
    {
      title: "Dashboard (protected)",
      href: "/user/dashboard",
    },
    {
      title: "Sign-In Page",
      href: "/auth/sign-in",
    },
  ],
  guestSideNav: [
    {
      title: "Pages",
      data: [
        {
          title: "Home (Landing Page)",
          href: "/",
        },
        {
          title: "Dashboard (protected)",
          href: "/user/dashboard",
        },
        {
          title: "Sign-In",
          href: "/auth/sign-in",
        },
        {
          title: "Register",
          href: "/auth/register",
        },
      ],
    },
    {
      title: "Documentation",
      data: [
        {
          title: "Overview",
          href: "/docs/overview",
        },
        {
          title: "Database",
          href: "/docs/database",
        },
        {
          title: "Web Session",
          href: "/docs/web-session",
        },
        {
          title: "DB Session",
          href: "/docs/db-session",
        },
      ],
    },
  ],
  ////User
  userTopNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Dashboard (protected)",
      href: "/user/dashboard",
    },
  ],
  userSideNav: [
    {
      title: "Pages",
      data: [
        {
          title: "Home (Landing Page)",
          href: "/",
        },
        {
          title: "Dashboard",
          href: "/user/dashboard",
        },
      ],
    },
    {
      title: "Documentation",
      data: [
        {
          title: "Overview",
          href: "/user/overview",
        },
        {
          title: "Database",
          href: "/user/database",
        },
        {
          title: "Web Session",
          href: "/user/web-session",
        },
        {
          title: "DB Session",
          href: "/user/db-session",
        },
      ],
    },
  ],
};

// Export navigation configuration based on the user's role
export function getNavigationConfig(userRole) {
  switch (userRole) {
    case "USER":
      return {
        topNav: navigationConfig.userTopNav,
        sideNav: navigationConfig.userSideNav,
      };
    case "GUEST":
    default:
      return {
        topNav: navigationConfig.guestTopNav,
        sideNav: navigationConfig.guestSideNav,
      };
    //You can also add something like ADMIN
  }
}
