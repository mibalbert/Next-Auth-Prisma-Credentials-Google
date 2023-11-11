/**
 * card-group.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import Card from "@/components/home/card";
import prisma from "@/lib/prisma";

const CardGroup = async () => {
  const session = await getServerSession(authOptions);

  const sess = await prisma.session.findMany({
    where: {
      userId: session?.user?.id,
    },
  });

  const data = await prisma.User.findFirst({
    where: {
      email: session?.user?.email,
    },
    include: {
      account: true,
    },
  });

  return (
    <div className="grid w-full max-w-screen-xl grid-cols-2 gap-10 mx-auto">
      <Card
        tag={"Account"}
        title={"Account Model stored in DB"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={{
          ...data[0],
          account: "",
          password: data[0]?.password.slice(0, 10) + "...",
        }}
      />
      <Card
        tag={"Account"}
        title={"Account Model stored in DB"}
        description={
          "This is the JSON data stored in the db about the account of the logged-in user."
        }
        data={data[0]?.account}
      />
      <Card tag={"Account"} title={"Account Model stored in DB"} />
      <Card tag={"Account"} title={"Account Model stored in DB"} />
    </div>
  );
};

export default CardGroup;
