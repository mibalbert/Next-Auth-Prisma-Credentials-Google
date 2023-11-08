/**
 * testing/page.jsx
 */

"use client";

import { useEffect, useState } from "react";
import usePathStore from "../store/pathStore";

const Testing = () => {
  const paths = usePathStore((state) => state.paths);

  return (
    <div className="flex items-center justify-center w-full h-[80vh]">
      {JSON.stringify(paths, null, 2)}
    </div>
  );
};

export default Testing;
