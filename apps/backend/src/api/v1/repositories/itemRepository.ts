import type { Item } from "../types/items.ts";
import { itemTestData } from "../data/itemTestData.ts";
import prisma from "../../../../prisma/client.ts";


class ItemRepository {
    private seeded = false;
    private useDatabase = Boolean(process.env.DATABASE_URL);
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
}

export const itemRepository = new ItemRepository()