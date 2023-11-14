/**
 * navigation.js
 */

// Define navigation configurations (top nav links and side nav links)
const navigationConfig = {
  ////Guest
  guestTopNav: [
    {
      title: "Docs",
      href: "/docs/overview",
    },
    {
      title: "Home",
      href: "/",
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
      title: "Overview & Pages",
      data: [
        {
          title: "Overview",
          href: "/docs/overview",
        },
        {
          title: "Sign-In",
          href: "/docs/sign-in",
        },
        {
          title: "Register",
          href: "/docs/register",
        },
      ],
    },
    {
      title: "Documentation",
      data: [
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
      title: "Dashboard",
      href: "/user/dashboard",
    },
    {
      title: "Docs",
      href: "/docs/overview",
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
      ],
    },
    {
      title: "User Pages",
      data: [
        {
          title: "Dashboard",
          href: "/user/dashboard",
        },
      ]
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
