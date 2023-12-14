/**
 * user/db-session/page.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import CodeCard from "@/components/shared/code-card";
import ExpendableCard from "@/components/shared/expandalble-card";
import MyCoolCodeBlock from "../../../components/shared/code-block";

const DbSession = async () => {
  const session = await getServerSession(authOptions);
  // let dbSession;
  // if (session) {
  //   const response = await fetch(
  //     `${process.env.BASE_URL}/api/user/get-db-session`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ id: session?.user?.id }),
  //       cache: "no-store", // Moved cache property here
  //     },
  //   );
  //   dbSession = await response.json();
  // } else {
  //   dbSession = [];
  // }

  const dbStoredSession = await prisma.session.findMany({
    where: {
      userId: session.user.id,
    },
  });

  const codeData = `model Session {
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
      {/* <CodeCard data={codeData} /> */}
      {/* <ExpendableCard
        // className="mx-0 pointer-events-none"
        tag={"Session (SQL)"}
        data={dbSession?.data || null}
        href={"/user/db-session"}
      /> */}
      {/* <div>
        <pre>{JSON.stringify(dbStoredSession, null, 2)}</pre>
      </div> */}
      {session && (
        <MyCoolCodeBlock
          code={`Session Table (DB Stored): \n${JSON.stringify(
            dbStoredSession,
            null,
            4,
          )}`}
          language={"mongodb"} //Not actually mongodb code but i used this to somewhat properly "highlight" the code.
          showLineNumbers={false}
          glow={true}
        />
      )}
      <MyCoolCodeBlock
        code={codeData}
        language={"mongodb"} //Not actually mongodb code but i used this to somewhat properly "highlight" the code.
        showLineNumbers={false}
      />
    </div>
  );
};
export default DbSession;
