import type { Item } from "../types/items.js";
import { itemTestData } from "../data/itemTestData.js";
import prisma from "../../../../prisma/client.js";


class ItemRepository {
    private seeded = false;
    private useDatabase = Boolean(process.env.DB_URL ?? process.env.DATABASE_URL);
    private items: Item[] = [...itemTestData]

    private async ensureSeeded(): Promise<void> {
        if (this.seeded) return;
        if (!this.useDatabase) {
            this.seeded = true
            return;
        }

        try {
            const existingCount = await prisma.item.count();
            if(existingCount===0) {
                await prisma.item.createMany({ data: itemTestData });
            }
        } catch {
            this.useDatabase = false;
        }

        this.seeded = true;
    }
    
    async getAllItems(): Promise<Item[]> {
        await this.ensureSeeded();
        if(!this.useDatabase) {
            return structuredClone(this.items).sort((a, b) => a.id - b.id);
        }

        return prisma.item.findMany({ orderBy: {id:"asc"} });
    }

    async delete(id: number): Promise<boolean> {
        await this.ensureSeeded();
        if(!this.useDatabase) {
            const initialLength = this.items.length;
            this.items = this.items.filter(item => item.id !== id);
            return this.items.length < initialLength;
        }
        const result = await prisma.userItem.deleteMany({ where: {itemId: id }});
        return result.count >0;
    }

    async clearUserItems(userId: string): Promise<void> {
        if (!this.useDatabase) return; // in-memory has no per-user items
        await prisma.userItem.deleteMany({ where: { userId } });
    }

    async getUserItems(userId: string): Promise<Item[]> {
        await this.ensureSeeded();
        if (!this.useDatabase) return [];
        const userItems = await prisma.userItem.findMany({
            where: { userId },
            include: { item: true },
        });
        return userItems.map((ui) => ui.item);
    }

    async removeUserItem(userId: string, itemId: number): Promise<boolean> {
        if (!this.useDatabase) return false;
        // Only delete one row (user may have multiple of same item in future)
        const existing = await prisma.userItem.findFirst({ where: { userId, itemId } });
        if (!existing) return false;
        await prisma.userItem.delete({ where: { userId_itemId: { userId, itemId } } });
        return true;
    }

    async grantItems(userId: string, itemIds: number[]): Promise<void> {
        if (!this.useDatabase) return;
        for (const itemId of itemIds) {
            await prisma.userItem.upsert({
                where: { userId_itemId: { userId, itemId } },
                create: { userId, itemId },
                update: {},
            });
        }
    }
}

export const itemRepository = new ItemRepository()