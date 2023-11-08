/**
 * user/home/page.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth/next";

const Home = async () => {
  const session = await getServerSession(authOptions);

  return <div>User Home Page</div>;
};

export default Home;
