/**
 * mobile-nav.jsx
 */

"use client";

import * as React from "react";
import Link, { LinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { ViewVerticalIcon } from "@radix-ui/react-icons";

import { siteConfig } from "@/configuration/site";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getNavigationConfig } from "@/configuration/navigation";
import SignInModal from "./nav-bits/sign-in-modal";

export function MobileNav({ session }) {
  const [open, setOpen] = React.useState(false);

  const userRole = session?.user?.role;
  const { topNav, sideNav } = getNavigationConfig(userRole);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 lg:hidden"
        >
          <ViewVerticalIcon className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="pr-0 pt-10 md:px-10">
        <MobileLink
          href="/"
          className="flex items-center"
          onOpenChange={setOpen}
        >
          <Icons.logo className="mr-2 h-4 w-4" />
          <span className="font-bold">{siteConfig.name}</span>
        </MobileLink>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] px-[26px]">
          <div className="flex flex-col space-y-3">
            {topNav?.map(
              (item) =>
                item.href && (
                  <MobileLink
                    key={item.href}
                    href={item.href}
                    onOpenChange={setOpen}
                  >
                    {item.title}
                  </MobileLink>
                ),
            )}
          </div>
          <div className="flex flex-col space-y-3 py-10">
            <div>Side Nav Items</div>
            {sideNav?.map((item, index) => (
              <div key={index} className="flex flex-col space-y-3 pt-6">
                <h4 className="font-medium">{item.title}</h4>
                {item?.items?.length &&
                  item.items.map((item) => (
                    <React.Fragment key={item.href}>
                      {!item.disabled &&
                        (item.href ? (
                          <MobileLink
                            href={item.href}
                            onOpenChange={setOpen}
                            className="text-muted-foreground"
                          >
                            {item.title}
                          </MobileLink>
                        ) : (
                          item.title
                        ))}
                    </React.Fragment>
                  ))}
              </div>
            ))}
            {/* <div key={123} className="flex flex-col pt-6 space-y-3">
              <h4 className="font-medium">{"Oh shit"}</h4>
              <React.Fragment key={12}>
                <MobileLink
                  href={"/it-worked"}
                  onOpenChange={setOpen}
                  className="text-muted-foreground"
                ></MobileLink>
                Johnny
              </React.Fragment>
            </div> */}
          </div>
          <div className="my-5 flex w-full flex-col gap-5">
            <SignInModal className="py-2" />
            <Button
              onClick={() => router.push("/auth/register")}
              variant="outline"
              className="border-neutral-300"
            >
              Register
            </Button>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

function MobileLink({ href, onOpenChange, className, children, ...props }) {
  const router = useRouter();
  return (
    <Link
      href={href}
      onClick={() => {
        router.push(href.toString());
        onOpenChange?.(false);
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </Link>
  );
}
