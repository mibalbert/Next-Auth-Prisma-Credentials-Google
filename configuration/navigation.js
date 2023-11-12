/**
 * navigation.js
 */

// Define navigation configurations
const navigationConfig = {
  guestTopNav: [
    {
      title: "Landing Page",
      href: "/",
    },
    {
      title: "Page (unprotected)",
      href: "/some-page",
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
  userTopNav: [
    {
      title: "Landing Page",
      href: "/",
    },
    {
      title: "Dashboard (protected)",
      href: "/user/dashboard",
    },
    {
      title: "Page (unprotected)",
      href: "/some-page",
    },
  ],
  userSideNav: [
    {
      title: "Pages",
      data: [
        {
          title: "Landing Page",
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
      };
    //You can also add something like ADMIN
  }
}
