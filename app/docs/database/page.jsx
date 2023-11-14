/**
 * user/database/page.jsx
 */

import CodeCard from "@/components/shared/code-card";

const Database = () => {
  const schema = `@/prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider     = "mysql"
  url          = env("DATABASE_URL")
  relationMode = "prisma"
}

model Account {
  id                String  @id @default(cuid())
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User?
}

model Session {
  id           String   @id @default(cuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model User {
  id                 String               @id @default(cuid())
  name               String?
  email              String?              @unique
  password           String?
  image              String?
  role               UserRole?
  accountId          String?              @unique
  account            Account?             @relation(fields: [accountId], references: [id], onDelete: Cascade)
  active             Boolean              @default(false)
  ActivateToken      ActivateToken[]
  PasswordResetToken PasswordResetToken[]
  sessions           Session[]

  @@index([accountId])
}

enum UserRole {
  USER
  ADMIN
}

model ActivateToken {
  id          Int       @id @default(autoincrement())
  token       String    @unique
  createdAt   DateTime  @default(now())
  activatedAt DateTime?
  userId      String?
  User        User?     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}

model PasswordResetToken {
  id        Int       @id @default(autoincrement())
  token     String    @unique
  createdAt DateTime  @default(now())
  resetAt   DateTime?

  userId String?
  User   User?   @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
}
`;

  return (
    <div>
      <CodeCard className="pointer-events-none mx-0 p-14" data={schema} />
    </div>
  );
};

export default Database;
