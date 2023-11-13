/**
 * sign-in/page.jsx
 */

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import SignInForm from "@/components/form/sign-in-form";
import SignOutButton from "@/components/form/sign-out-button";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";

const SignIn = async () => {
  const session = await getServerSession(authOptions);

  return (
    <section className="flex min-h-[calc(100vh-64px)] w-full items-center justify-center">
      <Link
        href={"/"}
        variant="none"
        className="group absolute left-[5%] top-[5%] flex  items-center gap-1 "
      >
        <FaArrowLeft className="h-2 w-2 transform transition-transform group-hover:translate-x-[-3px]" />
        <span className="text-md pb-0.5 underline-offset-4 transition-all duration-300 group-hover:scale-105 group-hover:underline">
          Back
        </span>
      </Link>
      <section className="grid h-full min-h-screen w-full grid-cols-12 items-center">
        <div className="col-span-9 flex w-full flex-col items-center justify-center gap-5">
          {session?.user?.email ? (
            <SignOutButton />
          ) : (
            <div className="mx-auto flex w-full max-w-xs flex-col gap-4">
              <div className="text-center text-xl font-semibold">Sign In</div>
              <SignInForm />
            </div>
          )}
        </div>
        <div className="col-span-3 h-full w-full bg-neutral-300">
          ASdasdasdas
        </div>
      </section>
    </section>
  );
};

export default SignIn;
