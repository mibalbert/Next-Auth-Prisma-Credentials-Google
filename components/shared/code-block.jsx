/**
 * code-block.jsx
 */

"use client";
import { CodeBlock, dracula } from "react-code-blocks";

import React from "react";
import { cn } from "@/lib/utils";

const MyCoolCodeBlock = ({
  code,
  language,
  showLineNumbers,
  startingLineNumber,
  glow,
}) => {
  return (
    <div
      className={cn(
        "group relative mx-auto  rounded-xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px]  transition duration-200 hover:-translate-y-1 dark:bg-black/20 dark:shadow-white/5 dark:ring-white/5 md:w-full",
        glow ? "ring-blue-500/50" : "ring-black/5",
      )}
    >
      <div
        className={cn(
          "absolute -inset-0.5 rounded-xl bg-gradient-to-br from-sky-200 to-blue-300  opacity-[0.15] blur-lg dark:from-sky-700 dark:to-blue-800",
          glow ? "make-it-glow" : "",
        )}
      ></div>
      <div className="relative h-full max-w-full rounded-xl shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
        <CodeBlock
          customStyle={{
            padding: "30px",
            backgroundColor: "#1f2937",
            borderRadius: "10px",
          }}
          text={code}
          language={language}
          showLineNumbers={showLineNumbers}
          startingLineNumber={startingLineNumber}
          theme={dracula}
        />
      </div>
    </div>
  );
};

export default MyCoolCodeBlock;
