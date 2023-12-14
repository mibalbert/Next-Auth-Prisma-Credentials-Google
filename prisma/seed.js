/**
 * seed.js
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const cuid = require('cuid');




const users = [
  {
    "id": "clpncpuuh0120urnkm22gi6op",
    "name": "Admin",
    "email": "admin@gmail.com",
    "password": "$2b$10$gcLVf6v76L6Bv4yXFBQUfOrS2.i0.pa.iDM4rURTvq90jN.UfgG.6",
    "image": null,
    "role": "ADMIN",
    "accountId": "clpncpv0s0001urnkzzsbejgu",
    "active": true
  },
  {
    "id": "huupcnplc0120urnkm22gi6op",
    "name": "User",
    "email": "user1@gmail.com",
    "password": "$2b$10$gcLVf6v76L6Bv4yXFBQUfOrS2.i0.pa.iDM4rURTvq90jN.UfgG.6",
    "image": null,
    "role": "USER",
    "accountId": "clpncpv0s0001urnkzzsbejgu",
    "active": true
  },
  {
    "id": "clpncpuuh0000urnkm22gi6pj",
    "name": "John Doe",
    "email": "bitcode222@gmail.com",
    "password": "$2b$10$gcLVf6v76L6Bv4yXFBQUfOrS2.i0.pa.iDM4rURTvq90jN.UfgG.6",
    "image": null,
    "role": "ADMIN",
    "accountId": "clpncpv0s0001urnkzzsbejgu",
    "active": true
  },
];



// const sessions = [];

// Generate 5 users
// for (let i = 1; i <= 5; i++) {
//   const user = {
//     id: cuid(),
//     name: `User ${i}`,
//     email: `user${i}@example.com`,
//     password: `$2b$10$gcLVf6v76L6Bv4yXFBQUfOrS2.i0.pa.iDM4rURTvq90jN.UfgG.6`,
//     role: 'USER',
//     active: true,
//   };

//   users.push(user);

//   // Generate 1 session for each user
//   sessions.push({
//     id: `session-${i}`,
//     sessionToken: `session-token-${i}`,
//     userId: `user-${i}`,
//     expires: new Date(),
//   });
// }
// async function clearData() {
//   await prisma.user.deleteMany({});
//   await prisma.session.deleteMany({});
// }

async function seedData() {
  // Clear existing data
  await clearData();
  // Seed Users

  await prisma.user.createMany({
    data: users,
  });
  // Seed Sessions
  await prisma.session.createMany({
    data: sessions,
  });

}

async function main() {
  try {
    await seedData();
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })