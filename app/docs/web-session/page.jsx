/**
 * web-session/page.jsx
 */

import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import CodeCard from "@/components/shared/code-card";
import { getServerSession } from "next-auth";

const WebSession = async () => {
  const session = await getServerSession(authOptions);
  const notSession = `Sign-In first
In order to view how the stored jwt(session) looks like`;

  return (
    <div>
      {!session ? (
        <CodeCard
          //  className="mx-0 pointer-events-none"
          data={notSession}
        />
      ) : (
        <CodeCard
          //  className="mx-0 pointer-events-none"
          data={session}
        />
      )}
    </div>
  );
};

export default WebSession;
