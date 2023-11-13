/**
 * sign-out-button.jsx
 */

import React from "react";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  return (
    <div>
      <div>User Aleardy logged-in, as {session?.user?.name}</div>
      <div>
        In order to sign-in to a diffrent account, you must log out first!
      </div>
      <Button
        onClick={() => {
          signOut({ callbackUrl: "/auth/sign-in" });
        }}
      >
        Sign-Out
      </Button>
    </div>
  );
};

export default SignOutButton;
