/**
 * sign-in/page.jsx
 */

import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";
import SignInForm from "@/components/form/sign-in-form";

const SignIn = () => {
  return (
    <section className="flex items-center justify-center w-full min-h-[calc(100vh-64px)]">
      <Link
        href={"/"}
        variant="none"
        className="absolute top-[5%] left-[5%] flex gap-1  group items-center "
      >
        <FaArrowLeft className="group-hover:translate-x-[-3px] transform transition-transform w-2 h-2" />
        <span className="group-hover:underline underline-offset-4 group-hover:scale-105 transition-all pb-0.5 text-md duration-300">
          Back
        </span>
      </Link>
      <section className="grid items-center w-full h-full min-h-screen grid-cols-12">
        <div className="flex flex-col items-center justify-center w-full col-span-9 gap-5">
          <div className="text-xl font-semibold">Sign In</div>
          <SignInForm />
        </div>
        <div className="w-full h-full col-span-3 bg-neutral-300">
          ASdasdasdas
        </div>
      </section>
    </section>
  );
};

export default SignIn;
