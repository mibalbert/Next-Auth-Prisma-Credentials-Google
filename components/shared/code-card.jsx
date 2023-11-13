/**
 * code-card.jsx
 */
"use client";

import { cn } from "@/lib/utils";

const CodeCard = ({ tag, title, description, data, className }) => {
  return (
    <pre
      className={cn(
        "overflow-auto rounded-lg bg-gray-950 px-2 pb-10 pt-3 lg:max-w-3xl",
        className,
      )}
    >
      {/* <div>Current Session</div> */}
      {/* <code>{JSON.stringify(data, null, 2)}</code> */}
      <code>{data}</code>
    </pre>
  );
};

export default CodeCard;

//   role="group"
//   aria-label={`Code Card for ${title}`}
//   className={cn(
//     "group relative mx-auto max-w-xl rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1 dark:bg-black/20 dark:shadow-white/5 dark:ring-white/5 md:w-full",
//     className,
//   )}
// >
//   <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-200 to-blue-300 opacity-[0.15] blur-lg dark:from-sky-700 dark:to-blue-800"></div>
//   <div className="relative flex flex-col w-full h-full gap-2 px-5 py-5 bg-white rounded-lg shadow-md isolate shadow-gray-300 ring-1 ring-black/5 dark:bg-gray-950/70 dark:shadow-gray-800 dark:ring-white/5 sm:gap-8 sm:py-6 lg:max-w-3xl lg:flex-row">
//     <div className="w-full h-full">
//       <div className="flex items-center text-sm gap-x-3">
//         <span className="relative z-10 rounded-full bg-blue-800 px-3 py-1.5 font-medium text-white hover:bg-blue-600">
//           {tag}
//         </span>
//       </div>
