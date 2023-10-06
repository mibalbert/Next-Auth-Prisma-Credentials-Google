/**
 * sign-in/page.jsx
 */

import SignInForm from "@/components/auth/sign-in-form";

const SignIn = () => {
  return (
    <section className="flex items-center justify-center w-full min-h-[calc(100vh-64px)]">
      <SignInForm />
    </section>
  );
};

export default SignIn;
