"use client";

import usePathStore from "@/app/store/pathStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const WindowHistory = ({ children }) => {
  const pathname = usePathname();

  console.log("pathnae", pathname);
  const pushPath = usePathStore((state) => state.pushPath);

  useEffect(() => {
    pushPath(pathname);
  }, []);

  return <div>{children}</div>;
};

export default WindowHistory;
