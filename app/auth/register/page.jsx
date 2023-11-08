/**
 * register/page.jsx
 */

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaArrowLeft } from "react-icons/fa6";

import {
  registerNewUser,
  resendVerificationLinkServer,
} from "@/app/actions/actions";

import Link from "next/link";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(null);
  const router = useRouter();

  // const handleGoBack = () => {
  //   router.back(); // This navigates back to the previous page in the history stack
  // };

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
    <div className="relative flex justify-center w-full h-full min-h-screen">
      <Link
        href={"/"}
        variant="none"
        // onClick={handleGoBack}
        className="absolute top-[5%] left-[5%] flex gap-1  group items-center"
      >
        <FaArrowLeft className="group-hover:translate-x-[-3px] transform transition-transform w-2 h-2" />
        <span className="group-hover:underline underline-offset-4 group-hover:scale-105 transition-all pb-0.5 text-md duration-300">
          Back
        </span>
      </Link>
      <section className="grid items-center w-full h-full min-h-screen grid-cols-12">
        <div className="col-span-9">
          {!success ? (
            <form
              onSubmit={handleSubmit(registerUser)}
              className="flex flex-col w-full max-w-md gap-4 p-10 mx-auto rounded-xl"
            >
              <h1 className="text-2xl font-semibold text-center">Register</h1>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="ex: john@example.com"
                  className="placeholder:text-neutral-300 border-neutral-400"
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
                  className="placeholder:text-neutral-300 border-neutral-400"
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
                  className="placeholder:text-neutral-300 border-neutral-400"
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
                  className="placeholder:text-neutral-300 border-neutral-400"
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
                  className="placeholder:text-neutral-300 border-neutral-400"
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
                    className="w-5 h-5 text-red-500"
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
                    <Icons.spinner className="w-4 h-4 animate-spin" />
                  </span>
                )}
              </Button>
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="px-2 bg-white bg-background text-muted-foreground dark:bg-neutral-900">
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
                  <Icons.google className="w-4 h-4 mr-2" />
                  Google
                </Button>
              </div>
            </form>
          ) : (
            <div className="w-full max-w-md mx-auto space-y-3">
              <div className="flex items-center gap-2">
                <Icons.success
                  className="w-4 h-4 text-green-500"
                  strokeWidth={3}
                />
                <div>{success}</div>
              </div>
              <div className="flex items-center justify-center w-full">
                <Link href={"/auth/sign-in"} className="underline ">
                  Sign In
                </Link>
              </div>
            </div>
          )}
        </div>
        <div className="w-full h-full col-span-3 bg-neutral-300">
          ASdasdasdas
        </div>
      </section>
    </div>
  );
};

export default Register;
