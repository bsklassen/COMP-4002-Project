import { PrismaClient } from "@prisma/client";
import { USERS, ITEMS, USER_ITEMS, BATTLE_LOG_MESSAGES } from "./seedData.ts";

const prisma = new PrismaClient();

// this method will add default values to the database
// IT WILL CLEAR THE DB WHEN INVOKED
// see https://www.prisma.io/docs/orm/prisma-migrate/workflows/seeding
async function main() {
    // clear tables (order matters for FK constraints)
    await prisma.battleLogMessage.deleteMany();
    await prisma.userItem.deleteMany();
    await prisma.item.deleteMany();
    await prisma.user.deleteMany();

    // seed items
    for (const item of ITEMS) {
        await prisma.item.create({ data: item });
    }
    console.log(`CREATED ${ITEMS.length} ITEMS`);

    // seed users
    for (const user of USERS) {
        await prisma.user.create({ data: user });
    }
    console.log(`CREATED ${USERS.length} USERS`);

    // seed user ↔ item associations
    for (const ui of USER_ITEMS) {
        await prisma.userItem.create({ data: ui });
    }
    console.log(`CREATED ${USER_ITEMS.length} USER-ITEM ASSOCIATIONS`);

    // seed battle log messages
    for (const msg of BATTLE_LOG_MESSAGES) {
        await prisma.battleLogMessage.create({ data: msg });
    }
    console.log(`CREATED ${BATTLE_LOG_MESSAGES.length} BATTLE LOG MESSAGES`);
}

main().then(
    async() => {
        await prisma.$disconnect()
    }
).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});