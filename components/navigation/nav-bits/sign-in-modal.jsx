/**
 * sign-in-modal.jsx
 */

"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignInModal = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleClick = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (result.ok) {
      router.refresh();
      setOpen(false);
    }
    if (result.error) setError(result.error);
  };
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      {/* <Dialog> */}
      <DialogTrigger className="py-2.5 px-4 text-sm rounded-lg whitespace-nowrap  border border-neutral-300 font-semibold">
        Sign-In
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full flex flex-col gap-4">
        {/* <div className="max-w-sm w-full flex flex-col gap-4"> */}
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div>{error}</div>}

        <Button className="w-full" onClick={handleClick}>
          Sign In
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="px-2 bg-background text-muted-foreground bg-white dark:bg-neutral-900">
              Or continue with
            </span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-6">
          <Button variant="outline">
            <Icons.gitHub className="w-4 h-4 mr-2" />
            Github
          </Button>
          <Button variant="outline" onClick={() => signIn("google")}>
            <Icons.google className="w-4 h-4 mr-2" />
            Google
          </Button>
        </div>
        {/* </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
