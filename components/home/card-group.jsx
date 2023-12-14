/**
 * card-group.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Card from "@/components/home/card";

const CardGroup = async () => {
  const webSession = await getServerSession(authOptions);

  console.log(webSession);

  let dbSession;

  if (webSession) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/get-db-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: webSession?.user?.id }),
        cache: "no-store", // Moved cache property here
      },
    );
    dbSession = await response.json();
  } else {
    dbSession = [];
  }

  return (
    <div className="mx-auto grid w-[90%] max-w-screen-xl grid-cols-1 gap-10 lg:w-full lg:grid-cols-2">
      <Card
        tag={"Session (JWT)"}
        title={"Browser Stored Session"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={webSession}
        href={"/docs/web-session"}
      />
      <Card
        tag={"Session (SQL)"}
        title={"Database Stored Session"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={dbSession?.data || null}
        href={"/docs/db-session"}
      />
    </div>
  );
};

export default CardGroup;
