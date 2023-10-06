/**
 * user/home/page.jsx
 */

import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";

const Home = async () => {
  const session = await getServerSession(authOptions);
  return <pre>{JSON.stringify(session, null, 2)}</pre>;
};

export default Home;
