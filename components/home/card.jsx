/**
 * card.jsx
 */

import Link from "next/link";

const Card = ({ tag, title, description, data }) => {
  return (
    <>
      <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1 dark:bg-black/20 dark:shadow-white/5 dark:ring-white/5">
        <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-200 to-blue-300  opacity-[0.15] blur-lg dark:from-sky-700 dark:to-blue-800"></div>
        <div className="relative h-full max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
          <Link href={`/posts/`} className="h-full w-full">
            <article className="relative isolate flex h-full max-w-3xl flex-col gap-2 overflow-hidden rounded-lg bg-white px-5 py-5 pr-5 shadow-md shadow-gray-300 ring-1 ring-black/5 dark:bg-black dark:shadow-gray-800 dark:ring-white/5 sm:gap-8 sm:px-10 sm:py-6 lg:flex-row">
              <div>
                <div className="hidden items-center gap-x-3 text-sm sm:flex">
                  <span className="relative z-10 rounded-full bg-gray-100  px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
                    {tag}
                  </span>
                </div>
                <div className="group relative max-w-xl">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 dark:text-gray-200">
                    <span className="absolute inset-0" />
                    {title}
                  </h3>
                </div>
                <div className="mt-2 flex items-center gap-x-3 text-sm sm:hidden">
                  <div className="inline-flex items-center text-gray-500">
                    <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200 dark:text-gray-200">
                      {/* {post.categories?.title} */}
                    </span>
                  </div>
                  <div className="inline-flex items-center text-gray-500 dark:text-gray-300">
                    {/* <CalendarIcon className="w-4 h-4" /> */}
                    <span className="ml-1">123 1231 23</span>
                  </div>
                  <div className="inline-flex items-center text-gray-500 dark:text-gray-300">
                    {/* <Clock10Icon className="w-4 h-4" /> */}
                    <span className="ml-1">124</span>
                  </div>
                </div>
                <div>
                  <pre>
                    <code className="mt-3 max-w-[90%] overflow-hidden text-sm leading-6  text-gray-600 dark:text-gray-200">
                      <span className="overflow-hidden">
                        {JSON.stringify(data, null, 2)}
                      </span>
                    </code>
                  </pre>
                </div>

                <div className="mt-3 flex border-t border-gray-900/5 pt-2 dark:border-gray-100/5">
                  <div className="relative flex items-center gap-x-2">
                    <div className="text-sm">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">
                        {data?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Card;
// /**
//  * card.jsx
//  */

// import Link from "next/link";

// const Card = () => {
//   return (
//     <>
//       <div className="group relative w-full rounded-2xl bg-white/20 p-2.5 shadow-sm shadow-black/5 ring-[0.8px] ring-black/5 transition duration-200 hover:-translate-y-1">
//         <div className="absolute -inset-0.5 rounded-lg bg-gradient-to-br from-sky-500 to-blue-600 opacity-[0.15] blur-lg"></div>
//         <div className="relative max-w-full rounded-[0.62rem] shadow-sm shadow-black/5 ring-[0.8px] ring-black/5">
//           <Link href={`/posts/`}>
//             <article className="relative flex flex-col max-w-3xl gap-2 px-5 py-5 bg-white rounded-lg shadow-md isolate shadow-gray-300 ring-1 ring-black/5 sm:gap-8 sm:px-10 sm:py-6 lg:flex-row">
//               {/* <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-square lg:w-64 lg:shrink-0"> */}
//               {/* <Image
//                   src={await getPublicImageUrl(post.id, post.image || "")}
//                   alt={post.title ?? "Cover"}
//                   height={256}
//                   width={256}
//                   priority
//                   placeholder={`data:image/svg+xml;base64,${toBase64(
//                     shimmer(256, 256),
//                   )}`}
//                   className="absolute inset-0 object-cover w-full h-full rounded-2xl bg-gray-50"
//                 /> */}
//               {/* <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
//               </div> */}
//               <div>
//                 {/* Desktop category view */}
//                 <div className="items-center hidden text-sm gap-x-3 sm:flex">
//                   <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
//                     {/* {post.categories?.title} */}
//                     This is the title
//                   </span>
//                 </div>

//                 <div className="relative max-w-xl group">
//                   <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
//                     <span className="absolute inset-0" />
//                     {/* {post.title} */}
//                     This si the post fuckign title
//                   </h3>
//                   {/* Mobile category and toolbar view*/}
//                   <div className="flex items-center mt-2 text-sm gap-x-3 sm:hidden">
//                     <div className="inline-flex items-center text-gray-500">
//                       <span className="relative z-10 rounded-full bg-gray-100 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-200">
//                         {/* {post.categories?.title} */}
//                       </span>
//                     </div>
//                     <div className="inline-flex items-center text-gray-500">
//                       {/* <CalendarIcon className="w-4 h-4" /> */}
//                       <span className="ml-1">123 1231 23</span>
//                     </div>
//                     <div className="inline-flex items-center text-gray-500">
//                       {/* <Clock10Icon className="w-4 h-4" /> */}
//                       <span className="ml-1">
//                         124
//                         {/* {getMinutes(readTime.minutes ? readTime.minutes : 0)} */}
//                       </span>
//                     </div>
//                   </div>
//                   <p className="mt-3 text-sm leading-6 text-gray-600">
//                     {/* {post.description} */}
//                     Lorem ipsum, dolor sit amet consectetur adipisicing elit.
//                     Earum expedita illum est nam quo?
//                   </p>
//                   {/* Desktop toolbar view */}
//                   <div className="items-center hidden mt-3 text-sm gap-x-3 sm:flex">
//                     <div className="inline-flex items-center text-gray-500">
//                       {/* <CalendarIcon className="w-4 h-4" /> */}
//                       <span className="ml-1">12.03.2220 </span>
//                     </div>
//                     <div className="inline-flex items-center text-gray-500">
//                       {/* <Clock10Icon className="w-4 h-4" /> */}
//                       <span className="ml-1">20 </span>
//                     </div>
//                     <div className="inline-flex items-center text-gray-500">
//                       {/* <MessageCircleIcon className="w-4 h-4" /> */}5{" "}
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex pt-2 mt-3 border-t border-gray-900/5">
//                   <div className="relative flex items-center gap-x-2">
//                     {/* <Image
//                       src={post.profiles?.avatar_url ?? "/images/avatar.png"}
//                       alt={post.profiles?.full_name ?? "Avatar"}
//                       height={40}
//                       width={40}
//                       priority
//                       placeholder={`data:image/svg+xml;base64,${toBase64(
//                         shimmer(40, 40),
//                       )}`}
//                       className="h-[40px] w-[40px] rounded-full bg-gray-50 object-cover"
//                     /> */}
//                     <div className="text-sm">
//                       <p className="font-semibold text-gray-900">John Doe</p>
//                       {/* <p className="text-gray-600">{mainPostConfig.author}</p> */}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </article>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Card;
