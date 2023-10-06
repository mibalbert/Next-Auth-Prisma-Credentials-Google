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
      title: "About Us",
      href: "/about",
    },
    {
      title: "Products",
      href: "/products",
    },
    {
      title: "Services",
      href: "/services",
    },
    {
      title: "Contact Us",
      href: "/contact",
    },
    {
      title: "Blog",
      href: "/blog",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
  ],
  userTopNav: [
    {
      title: "Dashboard",
      href: "/user/dashboard",
    },
    {
      title: "Profile",
      href: "/user/profile",
    },
    {
      title: "Cart",
      href: "/cart",
    },
    {
      title: "Settings",
      href: "/user/settings",
    },
    {
      title: "Logout",
      href: "/user/logout",
    },
  ],
  userSideNav: [
    {
      title: "Home",
      data: [{
        title: "Dashboard",
        href: "/user/dashboard",
      },
      ]
    },
    {
      title: "Jobs",
      data: [{
        title: "Jobs",
        href: "/user/jobs",
      },
      {
        title: "+Create Job",
        href: "/user/create-job"
      },
      ],
    },
    {
      title: "Cars",
      data: [{
        title: "Cars",
        href: "/user/cars",
      },
      {
        title: "+Add a new Car",
        href: "/user/add-new-car"
      },
      ],
    },
    {
      title: "Documents",
      data: [{
        title: "Quotes",
        href: "/user/quotes",
      },
      {
        title: "Invoices",
        href: "/user/invoices"
      },
      {
        title: "Payments",
        href: "/user/payments"
      }
      ]
    },
    {
      title: "Support",
      data: [{
        title: "Help Desk",
        href: "/user/help",
      },
      ]  // disabled: true,
    },
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





