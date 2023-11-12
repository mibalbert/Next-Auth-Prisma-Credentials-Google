/**
 * sign-in-form.jsx
 */

"use client";

import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signOut, useSession } from "next-auth/react";
import SendPasswordReset from "./send-reset-password";
import SendEmailActivate from "./send-email-activate";

const SignInForm = ({ setOpen, className }) => {
  const { data: session, status } = useSession();

  const [responseObj, setResponseObj] = useState({ message: "", ok: false });
  const [loading, setLoading] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otherLoading, setOtherLoading] = useState(false);

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const paramsError = searchParams.get("error");
  // if (paramsError) {
  //   setResponseObj({ message: paramsError, ok: false });
  // }

  if (session?.user?.email && pathName.startsWith("/auth/sign-in")) {
    redirect("/");
  }

  useEffect(() => {
    if (paramsError) {
      console.log("paramsError");
      setResponseObj({ message: paramsError, ok: false });
      console.log(responseObj);
    }
  }, [paramsError, responseObj]);
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    // setResponseObj({ message: "", ok: false });
    setShowSendEmail(false);
    setShowChangePassword(false);
  }, [email, password]);

  const handleSubmitForm = async () => {
    setLoading(true);

    let result;
    if (!pathName.startsWith("/auth/sign-in")) {
      result = await signIn("credentials", {
        redirect: false,
        email: watch("email"),
        password: watch("password"),
      });
      if (result.ok) {
        setOpen(false);
        router.refresh();
      }
    } else {
      result = await signIn("credentials", {
        redirect: true,
        callbackUrl: "/",
        email: watch("email"),
        password: watch("password"),
      });
      if (result.ok) {
        router.refresh();
      }
    }

    if (result.error) {
      if (result.error === "Invalid credentials") {
        setShowSendEmail(false);
        setShowChangePassword(true);
      } else if (result.error === "Email is not verified") {
        setShowChangePassword(false);
        setShowSendEmail(true);
      }
      setResponseObj({ message: result.error, ok: false });
    }
    setLoading(false);
  };

  const handleGoogleClick = async () => {
    await signIn("google", {
      callbackUrl: "/",
    });
  };

  return (
    <div
      className={cn("mx-auto flex w-full max-w-xs flex-col gap-4", className)}
    >
      {/* Form  */}
      {/* {status === "authenticated" ? (
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
      ) : ( */}
      <div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-5"
        >
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
            <span className="text-red-500">{errors.email.message}</span>
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
          <div>
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
            {responseObj.message && (
              <div
                className={cn(
                  "text-red-500",
                  responseObj.ok && "text-blue-500",
                )}
              >
                {responseObj.message}
              </div>
            )}
          </div>
          {showSendEmail && (
            <SendEmailActivate
              email={email}
              loading={loading}
              otherLoading={otherLoading}
              setOtherLoading={setOtherLoading}
              setResponseObj={setResponseObj}
            />
          )}
          {showChangePassword && (
            <SendPasswordReset
              email={email}
              loading={loading}
              otherLoading={otherLoading}
              setOtherLoading={setOtherLoading}
              setResponseObj={setResponseObj}
            />
          )}
          <Button
            className="w-full"
            type="submit"
            disabled={loading || otherLoading}
          >
            {loading ? (
              <div className="flex items-center gap-2">
                <span>Loading</span>
                <Icons.spinner className="h-4 w-4 animate-spin" />
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span>Sign In </span>
              </div>
            )}
          </Button>
          {/* End Form */}
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
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="mr-2 h-4 w-4" />
              Github
            </Button>
            <Button variant="outline" onClick={handleGoogleClick}>
              <Icons.google className="mr-2 h-4 w-4" />
              Google
            </Button>
          </div>
        </form>
      </div>
      {/* )} */}
    </div>
  );
};

export default SignInForm;
