/**
 * sign-in-form.jsx
 */

"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

import NewWindow from "react-new-window";
import { useRefreshStore } from "@/app/store/pathStore";

// const GoogleWindow = () => {
//   const { refresh, changeRefresh } = useRefreshStore();

//   return (
//     <NewWindow url="/auth/google-popout">
//       <h1>Hi 👋</h1>
//     </NewWindow>
//   );
// };

const SignInForm = ({ setOpen }) => {
  const [responseObj, setResponseObj] = useState({ message: "", ok: false });
  const [loading, setLoading] = useState(false);
  const [showSendEmail, setShowSendEmail] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [otherLoading, setOtherLoading] = useState(false);
  const [googleOpened, setGoogleopened] = useState(false);

  const { data: session } = useSession();

  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const paramsError = searchParams.get("error");

  // console.log("THe pathname ", pathName);
  const [windowOpen, setWindowopen] = useState("Component now");
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const email = watch("email");
  const password = watch("password");

  useEffect(() => {
    setResponseObj({ message: "", ok: false });
    setShowSendEmail(false);
    setShowChangePassword(false);
  }, [email, password]);

  const handleSubmitForm = async () => {
    setLoading(true);

    let result;
    if (pathName.startsWith("/auth/sign-in")) {
      result = await signIn("credentials", {
        redirect: false,
        callbackUrl: "/",
        email: watch("email"),
        password: watch("password"),
      });
      if (result.ok) {
        router.refresh();
        setOpen(false);
      }
    }
    result = await signIn("credentials", {
      redirect: false,
      email: watch("email"),
      password: watch("password"),
    });

    if (result.ok) {
      router.refresh();
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
    await signIn("google");

    console.log(res);
  };

  // const popupCenter = (url, title) => {
  //   const dualScreenLeft = window.screenLeft ?? window.screenX;
  //   const dualScreenTop = window.screenTop ?? window.screenY;

  //   const width =
  //     window.innerWidth ?? document.documentElement.clientWidth ?? screen.width;

  //   const height =
  //     window.innerHeight ??
  //     document.documentElement.clientHeight ??
  //     screen.height;

  //   const systemZoom = width / window.screen.availWidth;

  //   const left = (width - 500) / 2 / systemZoom + dualScreenLeft;
  //   const top = (height - 550) / 2 / systemZoom + dualScreenTop;

  //   const newWindow = window.open(
  //     url,
  //     title,
  //     `width=${500 / systemZoom},height=${
  //       550 / systemZoom
  //     },top=${top},left=${left}`
  //   );

  //   newWindow?.focus();

  //   // const interval = setInterval(() => {
  //   //   if (newWindow.closed) {
  //   //     clearInterval(interval);
  //   //     console.log("> Popup Closed");
  //   //     // window.location.reload();
  //   //     router.refresh();
  //   //   }
  //   // }, 500);
  // };
  // console.log(windowOpen);

  return (
    <div className="flex flex-col w-full max-w-xs gap-4">
      {/* Form  */}
      {!session ? (
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
              <span className="text-red-500">{errors.email.message}</span>
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
            <div>
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
              {responseObj.message && (
                <div
                  className={cn(
                    "text-red-500",
                    responseObj.ok && "text-blue-500"
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
                  <Icons.spinner className="w-4 h-4 animate-spin" />
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>Sign In </span>
                </div>
              )}
            </Button>
          </form>
          {/* End Form */}
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
          <div className="grid grid-cols-2 gap-6">
            <Button variant="outline">
              <Icons.gitHub className="w-4 h-4 mr-2" />
              Github
            </Button>
            <Button variant="outline" onClick={handleGoogleClick}>
              <Icons.google className="w-4 h-4 mr-2" />
              Google
            </Button>
          </div>
          {/* <Button onClick={() => setGoogleopened(!googleOpened)}>
            {googleOpened ? "Close the pened window" : "Open a new window"}
          </Button>
          {googleOpened && (
            <NewWindow
              url="/auth/google-popout"
              onUnload={() => {
                console.log("goolge window closed");
                setGoogleopened(false);
              }}
              features={{ left: 200, top: 200, width: 400, height: 400 }}
            >
              <h2>Hi 👋</h2>
              <h4>Counting here as well ...</h4>
              <Button>Keeping the same style as my parent</Button>
            </NewWindow>
          )} */}
        </div>
      ) : (
        <div>
          <div>User Aleardy logged-in, as {session?.user?.name}</div>
          <div>
            In order to sign-in to a diffrent account, you must log out first!
          </div>
          <Button onClick={() => signOut()}>Sign-Out</Button>
        </div>
      )}
    </div>
  );
};

export default SignInForm;
