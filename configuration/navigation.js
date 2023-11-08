/**
 * navigation.js
 */

// Define navigation configurations
const navigationConfig = {
  guestTopNav: [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Sign-In Page",
      href: "/auth/sign-in",
    },
  ],
  userTopNav: [
    {
      title: "Home",
      href: "/user/home",
    },
  ],
  userSideNav: [
    {
      title: "Example",
      data: [{
        title: "Home",
        href: "/user/home",
      },
      ]
    },
    {
      title: "Example",
      data: [{
        title: "Example - One",
        href: "/user/example-one",
      },
      {
        title: "Example - Two",
        href: "/user/example-two"
      },
      ],
    }
  ],
};

// Export navigation configuration based on the user's role
export function getNavigationConfig(userRole) {
  switch (userRole) {
    case 'USER':
      return {
        topNav: navigationConfig.userTopNav,
        sideNav: navigationConfig.userSideNav,
      };
    case 'GUEST':
    default:
      return {
        topNav: navigationConfig.guestTopNav,
      };
  }
}





