/**
 * card-group.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Card from "@/components/home/card";

const CardGroup = async () => {
  const webSession = await getServerSession(authOptions);

  const response = await fetch(
    "http://localhost:3000/api/user/get-db-session",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: webSession?.user?.id }),
    },
  );
  const dbSession = await response.json();

  return (
    <div className="mx-auto grid w-[90%] max-w-screen-xl grid-cols-1 gap-10 lg:w-full lg:grid-cols-2">
      <Card
        tag={"Session (JWT)"}
        title={"Browser Stored Session"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={webSession}
        href={"/user/web-session"}
      />
      <Card
        tag={"Session (SQL)"}
        title={"Database Stored Session"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={dbSession.data}
        href={"/user/db-session"}
      />
    </div>
  );
};

export default CardGroup;
