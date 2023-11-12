/**
 * register/page.jsx
 */

"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa6";

import { registerNewUser } from "@/app/actions/actions";

import Link from "next/link";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let email = watch("email");
  let firstName = watch("firstName");
  let lastName = watch("lastName");
  let password = watch("password");
  let confirmPassword = watch("confirmPassword");
  useEffect(() => {
    setError("");
  }, [email, firstName, lastName, confirmPassword, password]);

  const registerUser = async (data) => {
    setLoading(true);
    const result = await registerNewUser(data);

    setLoading(false);

    console.log("reusllttt", result);

    if (!result.success) {
      setError(result.message);
    }
    if (result.success) {
      setSuccess(result.message);
    }
  };

  return (
    <div className="relative flex h-full min-h-screen w-full justify-center">
      <Link
        href={"/"}
        variant="none"
        className="group absolute left-[5%] top-[5%] flex  items-center gap-1"
      >
        <FaArrowLeft className="h-2 w-2 transform transition-transform group-hover:translate-x-[-3px]" />
        <span className="text-md pb-0.5 underline-offset-4 transition-all duration-300 group-hover:scale-105 group-hover:underline">
          Back
        </span>
      </Link>
      <section className="grid h-full min-h-screen w-full grid-cols-12 items-center">
        <div className="col-span-9">
          {!success ? (
            <form
              onSubmit={handleSubmit(registerUser)}
              className="mx-auto flex w-full max-w-md flex-col gap-4 rounded-xl p-10"
            >
              <h1 className="text-center text-2xl font-semibold">Register</h1>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ex: john@example.com"
                  className="border-neutral-400 placeholder:text-neutral-300"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
              </div>
              {errors.email && (
                <div className="text-red-500">{errors.email.message}</div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  type="text"
                  name="firstName"
                  placeholder="ex: John"
                  className="border-neutral-400 placeholder:text-neutral-300"
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                />
              </div>
              {errors.firstName && (
                <div className="text-red-500">{errors.firstName.message}</div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  type="text"
                  name="lastName"
                  placeholder="ex: Doe"
                  className="border-neutral-400 placeholder:text-neutral-300"
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                />
              </div>
              {errors.lastName && (
                <div className="text-red-500">{errors.lastName.message}</div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="*******"
                  className="border-neutral-400 placeholder:text-neutral-300"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
              </div>
              {errors.password && (
                <div className="text-red-500">{errors.password.message}</div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                  placeholder="*******"
                  className="border-neutral-400 placeholder:text-neutral-300"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    minLength: {
                      value: 6,
                      message:
                        "Confirm Password must be at least 6 characters long",
                    },
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                />
              </div>
              {errors.confirmPassword && (
                <div className="text-red-500">
                  {errors.confirmPassword.message}
                </div>
              )}
              {error && (
                <div className="flex items-center gap-1">
                  <Icons.failed
                    className="h-5 w-5 text-red-500"
                    strokeWidth={2.5}
                  />
                  <div className="text-red-500">{error}</div>
                </div>
              )}

              <Button className="w-full" type="submit" disabled={loading}>
                {!loading ? (
                  "Register"
                ) : (
                  <span className="flex items-center gap-1">
                    Register
                    <Icons.spinner className="h-4 w-4 animate-spin" />
                  </span>
                )}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background text-muted-foreground bg-white px-2 dark:bg-neutral-900">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="w-full ">
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => signIn("google")}
                >
                  <Icons.google className="mr-2 h-4 w-4" />
                  Google
                </Button>
              </div>
            </form>
          ) : (
            <div className="mx-auto w-full max-w-md space-y-3">
              <div className="flex items-center gap-2">
                <Icons.success
                  className="h-4 w-4 text-green-500"
                  strokeWidth={3}
                />
                <div>{success}</div>
              </div>
              <div className="flex w-full items-center justify-center">
                <Link href={"/auth/sign-in"} className="underline ">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="col-span-3 h-full w-full bg-neutral-300">
          ASdasdasdas
        </div>
      </section>
    </div>
  );
};

export default Register;
