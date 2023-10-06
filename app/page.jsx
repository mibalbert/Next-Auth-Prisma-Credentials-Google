import Image from "next/image";

export default async function Home() {
  const data = await prisma.user.findFirst({
    where: {
      email: "bitcode222@gmail.com",
    },
    select: {
      accounts: true,
    },
  });

  return (
    <main className="flex flex-col items-center justify-between min-h-screen p-24">
      <div>
        {/* <pre className="max-w-md break-words">
          {JSON.stringify(data, null, 4)}
        </pre> */}
      </div>
    </main>
  );
}
