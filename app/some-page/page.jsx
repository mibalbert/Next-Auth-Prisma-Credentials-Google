/**
 * some-page/page.jsx
 */

import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";

const SomePage = async () => {
  const sesssion = await getServerSession(authOptions);

  return <div>{sesssion}</div>;
};

export default SomePage;
