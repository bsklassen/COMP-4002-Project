import type { BattleLogMessage } from "../types/BattleLogMessage";
 
type BattleLogMessagesResponseJSON = { message: string; data: BattleLogMessage[] };
type BattleLogMessageResponseJSON = { message: string; data: BattleLogMessage };
 
// Base url for backend
// Vite provides this value from the .env file rather than dotenv package
const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1`;
const BATTLE_LOG_ENDPOINT = "/battlelogs";
 
export async function fetchMessages(userId: string): Promise<BattleLogMessage[]> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}?userId=${userId}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch battle log messages");
    }
    const json: BattleLogMessagesResponseJSON = await response.json();
    return json.data;
}
 
export async function getMessageById(messageId: number): Promise<BattleLogMessage> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}/${messageId}`
    );
    if (!response.ok) {
        throw new Error(`Failed to fetch message with id ${messageId}`);
    }
    const json: BattleLogMessageResponseJSON = await response.json();
    return json.data;
}
 
export async function createMessage(
    type: string,
    text: string,
    userId: string
): Promise<BattleLogMessage> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}`,
        {
            method: "POST",
            body: JSON.stringify({ type, text, userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to create battle log message");
    }
    const json: BattleLogMessageResponseJSON = await response.json();
    return json.data;
}
 
export async function startBattle(userId: string): Promise<BattleLogMessage> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}/start`,
        {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to start battle");
    }
    const json: BattleLogMessageResponseJSON = await response.json();
    return json.data;
}
 
export async function processAttack(userId: string): Promise<BattleLogMessage[]> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}/attack`,
        {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to process attack action");
    }
    const json: BattleLogMessagesResponseJSON = await response.json();
    return json.data;
}
 
export async function processSkill(userId: string): Promise<BattleLogMessage[]> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}/skill`,
        {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to process skill action");
    }
    const json: BattleLogMessagesResponseJSON = await response.json();
    return json.data;
}
 
export async function processGuard(userId: string): Promise<BattleLogMessage[]> {
    const response: Response = await fetch(
        `${BASE_URL}${BATTLE_LOG_ENDPOINT}/guard`,
        {
            method: "POST",
            body: JSON.stringify({ userId }),
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    if (!response.ok) {
        throw new Error("Failed to process guard action");
    }
    const json: BattleLogMessagesResponseJSON = await response.json();
    return json.data;
}