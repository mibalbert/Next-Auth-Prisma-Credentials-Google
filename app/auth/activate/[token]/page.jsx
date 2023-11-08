/**
 * auth/activate/[token]/page.jsx
 */

// "use client";

import Link from "next/link";
// import { useQuery } from "react-query";

import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { FaArrowLeft } from "react-icons/fa6";
// import { useEffect } from "react";

const ActivateAccount = async ({ params }) => {
  const token = params.token;

  const data = await fetch(`http://localhost:3000/api/auth/activate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  });

  const resultData = await data.json();

  // useEffect(()=>{

  //   function doIt() {

  //   }

  // },[])

  // const { data: resultData, isLoading } = useQuery({
  //   queryKey: ["checkToken", token],
  //   queryFn: async ({ tokenKey }) => {
  //     const result = await fetch(`http://localhost:3000/api/auth/activate`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ token: tokenKey }),
  //     });
  //     const data = await result.json();
  //     return data;
  //   },
  // });

  console.log(resultData);
  return (
    <div className="relative flex justify-center w-full h-full min-h-screen">
      <Link
        href={"/"}
        className="absolute top-[5%] left-[5%] flex gap-1 items-center group "
      >
        <FaArrowLeft className="group-hover:translate-x-[-3px] transform transition-transform w-2 h-2" />
        <span className="group-hover:underline underline-offset-4 group-hover:scale-105 transition-all pb-0.5 text-md duration-300">
          Home
        </span>
      </Link>
      <section className="grid items-center w-full h-full min-h-screen grid-cols-12">
        <div className="col-span-9">
          {/* {isLoading ? (
            <div className="text-center">Loading...</div>
          ) : ( */}
          <div className="w-full max-w-md mx-auto space-y-5">
            <div className="flex items-center justify-center w-full gap-3">
              {resultData?.ok && <Icons.success className="w-6 h-6" />}
              {!resultData?.ok && <Icons.failed className="w-6 h-6" />}
              <div className="">{resultData?.message}</div>
            </div>
            {!resultData?.ok ? (
              <div className="w-full max-w-xs mx-auto">
                <Button variant="" className="w-full">
                  Resend verification email
                </Button>
              </div>
            ) : (
              <div className="flex items-center justify-center w-full max-w-xs mx-auto ">
                <Link
                  href={"/auth/sign-in"}
                  className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-center transition-colors rounded-md bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300"
                >
                  Go to Sign-In
                </Link>
              </div>
            )}
          </div>
          {/* )} */}
        </div>
        <div className="w-full h-full col-span-3 bg-neutral-300">
          ASdasdasdas
        </div>
      </section>
    </div>
  );
};

export default ActivateAccount;
