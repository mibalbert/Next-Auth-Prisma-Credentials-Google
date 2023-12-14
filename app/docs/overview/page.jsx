/**
 * overview/page.jsx
 */

import Image from "next/image";

const Overview = async () => {
return (
    <div className="pt-10 pb-20 space-y-14">
      {/* NextJS NextAuth.js Prisma PlanetScale */}
      <div className="space-y-5">
        <h1 className="text-4xl font-semibold">NextJs 14 Template</h1>
        <h2 className="text-2xl">Introduction</h2>
        <hr />
      </div>
      <p>
        The Next.js NextAuth template is a streamlined and customizable solution
        for implementing authentication in Next.js applications. Leveraging the
        power of NextAuth.js, this template provides a solid foundation for
        building secure, user-centric web applications.
      </p>
      <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
        <div className="relative flex items-center justify-center col-span-1 border rounded-xl ">
          <Image
            src="/next-auth.png"
            alt=""
            width={300}
            height={300}
            className="object-cover object-center"
          />{" "}
        </div>
        <div className="relative flex items-center justify-center col-span-1 border rounded-xl">
          <Image
            src="/next-auth.png"
            alt=""
            width={300}
            height={300}
            className="object-cover object-center"
          />
        </div>
        <div className="relative flex items-center justify-center col-span-1 border rounded-xl ">
          <Image
            src="/next-auth.png"
            alt=""
            width={300}
            height={300}
            className="object-cover object-center"
          />{" "}
        </div>
        <div className="relative flex items-center justify-center col-span-1 border rounded-xl ">
          <Image
            src="/next-auth.png"
            alt=""
            width={300}
            height={300}
            className="object-cover object-center"
          />
        </div>
      </div>
      <section className="space-y-10">
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold ">Key Features</h1>
          <hr />
        </div>
        {/* Feature List */}
        <ol className="space-y-10">
          {/* Next.js Integration */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Next.js Integration:
            </h2>
            <p>
              Seamlessly integrates with Next.js, a popular React framework, to
              offer a robust frontend development experience.
            </p>
          </li>

          {/* NextAuth.js Authentication */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; NextAuth.js Authentication:
            </h2>
            <p>
              Utilizes NextAuth.js to handle authentication processes
              efficiently. Supports various authentication providers, including
              social media logins (Google, Facebook, GitHub), email/password,
              and more.
            </p>
          </li>

          {/* Customizable UI Components */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Customizable UI Components:
            </h2>
            <p>
              Provides a set of customizable UI components for authentication
              forms, making it easy to maintain a consistent look and feel
              across your application.
            </p>
          </li>

          {/* Session Management */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Session Management:
            </h2>
            <p>
              Implements secure session management to ensure a smooth user
              experience while maintaining the highest standards of security.
            </p>
          </li>

          {/* Role-Based Access Control (RBAC) */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Role-Based Access Control (RBAC):
            </h2>
            <p>
              Offers the flexibility to implement role-based access control,
              allowing you to define and manage user permissions within your
              application.
            </p>
          </li>

          {/* API Routes and Middleware */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; API Routes and Middleware:
            </h2>
            <p>
              Demonstrates best practices for securing API routes and middleware
              in a Next.js environment, ensuring that authenticated users can
              access protected resources.
            </p>
          </li>
        </ol>
      </section>
      <section className="space-y-10">
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold ">Getting Started</h1>
          <hr />
        </div>
        {/* Installation */}
        <div>
          <h2 className="mb-2 text-xl font-semibold">Installation:</h2>
          <ul className="pl-6 list-disc">
            <li>
              Simple and straightforward installation process with clear
              instructions.
            </li>
            <li>
              Includes a step-by-step guide to set up and configure the
              template.
            </li>
          </ul>
        </div>

        {/* Configuration */}
        <div className="mt-6">
          <h2 className="mb-2 text-xl font-semibold">Configuration:</h2>
          <p>
            Easily configurable settings for authentication providers, session
            management, and other relevant options.
          </p>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="space-y-10">
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold ">Usage Examples</h1>
          <hr />
        </div>
        {/* Basic Authentication */}
        <ul className="space-y-10">
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Basic Authentication:
            </h2>
            <p>
              Walkthrough on implementing basic email/password authentication.
            </p>
          </li>

          {/* Social Media Logins */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Social Media Logins:
            </h2>
            <p>
              Demonstrates how to integrate and configure popular social media
              logins for a seamless user experience.
            </p>
          </li>

          {/* Protected Routes */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Protected Routes:
            </h2>
            <p>
              Illustrates how to create and secure routes that require
              authentication.
            </p>
          </li>
        </ul>
      </section>

      {/* Why Use This Template */}
      <section className="space-y-10">
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold ">Why Use This Template?</h1>
          <hr />
        </div>
        <ul className="space-y-10">
          {/* Time Efficiency */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Time Efficiency:
            </h2>
            <p>
              Saves development time by providing a pre-configured
              authentication setup, allowing developers to focus on building
              application features.
            </p>
          </li>

          {/* Security Best Practices */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Security Best Practices:
            </h2>
            <p>
              Adheres to best practices for authentication and session
              management, reducing the risk of common security vulnerabilities.
            </p>
          </li>

          {/* Scalability */}
          <li className="px-5">
            <h2 className="mb-2 text-xl font-semibold">
              &#x2022; Scalability:
            </h2>
            <p>
              Designed to scale with your application, accommodating future
              authentication requirements as your project evolves.
            </p>
          </li>
        </ul>
      </section>

      <section className="space-y-10">
        {/* Conclusion */}

        <div className="space-y-5">
          <h1 className="text-2xl font-semibold ">Conclusion</h1>
          <hr />
        </div>
        <p className="text-md">
          The Next.js NextAuth template is a versatile and efficient solution
          for integrating authentication into your Next.js applications. By
          combining the power of Next.js and NextAuth.js, this template empowers
          developers to build secure, user-friendly web applications with ease.
        </p>
      </section>
    </div>
  );
};

export default Overview;
