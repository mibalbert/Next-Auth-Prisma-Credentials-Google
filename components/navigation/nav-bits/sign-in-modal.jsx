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
import { useState } from "react";

const SignInModal = () => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(!open)}>
      <DialogTrigger className="py-2.5 px-4 text-sm rounded-lg whitespace-nowrap  border border-neutral-300 font-semibold">
        Sign-In Modal
      </DialogTrigger>
      <DialogContent className="flex flex-col w-full max-w-md gap-4 p-12">
        <DialogHeader className={"pb-5"}>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <SignInForm setOpen={setOpen} />
      </DialogContent>
    </Dialog>
  );
};

export default SignInModal;
