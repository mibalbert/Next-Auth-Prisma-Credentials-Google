/**
 * register/page.jsx
 */

"use client";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa6";

import { experimental_useFormState as useFormState } from "react-dom";
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { createTodo } from "@/app/actions/actions";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

const initialState = {
  message: null,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button className="w-full" type="submit" aria-disabled={pending}>
      Register
    </Button>
  );
}

const Register = () => {
  const [state, formAction] = useFormState(createTodo, initialState);

  const router = useRouter();

  const handleGoBack = () => {
    router.back(); // This navigates back to the previous page in the history stack
  };

  return (
    <div className="relative w-full h-full flex justify-center min-h-screen">
      <Button
        variant="none"
        onClick={handleGoBack}
        className="absolute top-[5%] left-[5%] flex gap-1  group "
      >
        <FaArrowLeft className="group-hover:translate-x-[-3px] transform transition-transform w-2 h-2" />
        <span className="group-hover:underline underline-offset-4 group-hover:scale-105 transition-all pb-0.5 text-md duration-300">
          Back
        </span>
      </Button>
      <section className="w-full h-full grid grid-cols-12 min-h-screen items-center">
        <div className="col-span-9">
          <form
            action={formAction}
            className="max-w-md w-full mx-auto flex flex-col gap-4 p-10 rounded-xl"
          >
            <h1 className="text-center text-2xl font-semibold">Register</h1>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="ex: john@example.com"
                className="placeholder:text-neutral-300 border-neutral-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                type="text"
                name="firstName"
                placeholder="ex: John"
                className="placeholder:text-neutral-300 border-neutral-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                type="text"
                name="lastName"
                placeholder="ex: Doe"
                className="placeholder:text-neutral-300 border-neutral-400"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="*******"
                className="placeholder:text-neutral-300 border-neutral-400"
              />
            </div>
            {state && state.error && <div>{state.error}</div>}
            <SubmitButton />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 bg-background text-muted-foreground  bg-white dark:bg-neutral-900">
                  Or continue with
                </span>
              </div>
            </div>
            <div className="w-full ">
              <Button
                variant="outline"
                className="w-full"
                onClick={() => signIn("google")}
              >
                <Icons.google className="w-4 h-4 mr-2" />
                Google
              </Button>
            </div>
          </form>
        </div>
        <div className="bg-neutral-300 w-full h-full col-span-3">
          ASdasdasdas
        </div>
      </section>
    </div>
  );
};

export default Register;
