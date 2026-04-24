import { PrismaClient } from "@prisma/client";
import { ITEMS, ENEMIES } from "./seedData.js";

const prisma = new PrismaClient();
 
// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
    // clear tables (order matters for FK constraints)
    await prisma.battleLogMessage.deleteMany();
    await prisma.userItem.deleteMany();
    await prisma.battle.deleteMany();
    await prisma.userSave.deleteMany();
    await prisma.item.deleteMany();
    await prisma.user.deleteMany();
    await prisma.enemy.deleteMany();
 
    // seed enemies
    for (const enemy of ENEMIES) {
        await prisma.enemy.create({ data: enemy });
    }
    console.log(`CREATED ${ENEMIES.length} ENEMIES`);
 
    // seed items
    for (const item of ITEMS) {
        await prisma.item.create({ data: item });
    }
    console.log(`CREATED ${ITEMS.length} ITEMS`);
 
    // Note: Users are no longer seeded - they are created automatically
    // via findOrCreateUser middleware when a Clerk user first logs in
}
 
main().then(
    async () => {
        await prisma.$disconnect();
    }
).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});