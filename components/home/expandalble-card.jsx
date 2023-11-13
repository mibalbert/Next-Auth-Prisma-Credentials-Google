/**
 * card.jsx
 */
"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";
const ExpendableCard = ({ data, className }) => {
  const [isExpanded, setExpanded] = useState(false);

  const handleToggleExpand = () => {
    setExpanded(!isExpanded);
  };

  return (
    <div className="h-full rounded-lg lg:max-w-3xl">
      <div className={cn(" overflow-hidden text-sm leading-6 ")}>
        <div className="max-h-[50vh] overflow-y-auto">
          {!isExpanded ? (
            <div>
              <pre className="bg-gray-950 px-10 py-5">
                <div>Current Session</div>
                <code>{JSON.stringify(data[0], null, 2)}</code>
              </pre>
            </div>
          ) : (
            <div>
              <pre className="bg-gray-950 px-10 py-5">
                <div>All your stored Sessions</div>
                <code>{JSON.stringify(data, null, 2)}</code>
              </pre>
            </div>
          )}
        </div>
        <br />
        <div>
          {data.length > 1 && (
            <div>
              And {data.length > 1 ? data.length - 1 : data.length} more
              Sessions stored
            </div>
          )}
          {/* Add a button to toggle expansion */}
          <button
            onClick={handleToggleExpand}
            className="cursor-pointer text-blue-500"
          >
            {isExpanded ? "Collapse" : "Expand"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExpendableCard;

// <div className={cn(
//   "group relative mx-auto max-w-xl rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1 dark:bg-black/20 dark:shadow-white/5 dark:ring-white/5 md:w-full",
//   className,
// )}
// >
// <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-200 to-blue-300  opacity-[0.15] blur-lg dark:from-sky-700 dark:to-blue-800"></div>
// <div className="relative h-full max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
//   <article className="relative flex flex-col w-full h-full gap-2 px-5 py-5 pr-5 overflow-hidden bg-white rounded-lg shadow-md isolate shadow-gray-300 ring-1 ring-black/5 dark:bg-gray-950/70 dark:shadow-gray-800 dark:ring-white/5 sm:gap-8 sm:px-10 sm:py-6 lg:max-w-3xl lg:flex-row">
//     <div>
//       <div className="items-center hidden text-sm gap-x-3 sm:flex">
//         <span className="relative z-10 rounded-full bg-blue-800  px-3 py-1.5 font-medium text-white hover:bg-blue-600">
//           {tag}
//         </span>
//       </div>
//       <div className="relative max-w-xl group">
//         <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-green-500 dark:text-gray-200">
//           <span className="absolute inset-0" />
//           {title}
//         </h3>
//       </div>
//       <div className="flex items-center mt-2 text-sm gap-x-3 sm:hidden">
//         <div className="inline-flex items-center text-gray-500">
//           <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-200">
//             {description}
//           </span>
//         </div>
//       </div>

// </div>
//         </article>
//         </div>
//       </div>
