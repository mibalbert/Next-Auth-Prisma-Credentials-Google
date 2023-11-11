/**
 * navigation.js
 */

// Define navigation configurations
const navigationConfig = {
  guestTopNav: [
    {
      title: "Page (unprotected)",
      href: "/auth/sign-in",
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
      title: "Dashboard (protected)",
      href: "/user/dashboard",
    },
    {
      title: "Page (unprotected)",
      href: "/auth/sign-in",
    },
  ],
  userSideNav: [
    {
      title: "Example",
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
      title: "Example",
      data: [
        {
          title: "Example - One",
          href: "/user/example-one",
        },
        {
          title: "Example - Two",
          href: "/user/example-two",
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
