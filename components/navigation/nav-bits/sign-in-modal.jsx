/**
 * sign-in-modal.jsx
 */

"use client";

import SignInForm from "@/components/form/sign-in-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { useState } from "react";

const SignInModal = ({ className }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger
        className={cn(
          "whitespace-nowrap rounded-lg bg-black px-4 text-sm font-semibold text-white shadow-md dark:bg-white dark:text-black",
          className,
        )}
      >
        Sign-In Modal
      </DialogTrigger>
      <DialogContent className="flex w-full max-w-md flex-col gap-4 p-12">
        <DialogHeader className={"space-y-3 pb-5 "}>
          <DialogTitle className="text-center">
            Welcome to the platform!
          </DialogTitle>
          <DialogDescription>
            {`Sign in securely for a personalized experience. Your privacy is our priority. Excited to have you on board!`}
          </DialogDescription>
        </DialogHeader>
        <SignInForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
