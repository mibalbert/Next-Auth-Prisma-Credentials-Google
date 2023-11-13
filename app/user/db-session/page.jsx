/**
 * user/db-session/page.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import CodeCard from "@/components/shared/code-card";
import ExpendableCard from "@/components/home/expandalble-card";

const DbSession = async () => {
  const session = await getServerSession(authOptions);
  let dbSession;
  if (session) {
    const response = await fetch(
      `${process.env.BASE_URL}/api/user/get-db-session`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: session?.user?.id }),
        cache: "no-store", // Moved cache property here
      },
    );
    dbSession = await response.json();
  } else {
    dbSession = [];
  }

  console.log(dbSession);

  const codeData = `
    model Session {
      id           String   @id @default(cuid())
      sessionToken String   @unique
      userId       String
      expires      DateTime
      user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)
    
      @@index([userId])
    }`;

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h1 className="text-2xl font-semibold">DB Session</h1>
        <p>{`The way the database stores the `}</p>
      </div>
      <div>
        <CodeCard className="pointer-events-none mx-0" data={codeData} />
      </div>
      <ExpendableCard
        className="pointer-events-none mx-0"
        tag={"Session (SQL)"}
        data={dbSession?.data || null}
        href={"/user/db-session"}
      />
    </div>
  );
};
export default DbSession;
