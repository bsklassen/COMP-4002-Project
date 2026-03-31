import type { BattleLogMessage } from '../types/BattleLogMessage';
import * as battleLogRepo from '../apis/battleLogRepo';
 
/**
 * These Service functions handle the business logic of our application.
 * In some cases it is a straightforward delegation to the repo,
 * but in others it involves making a decision about how to invoke
 * a repository.
 */
 
// A straightforward request to get all messages from the repository.
// Sorts messages by timestamp for chronological display.
export async function fetchMessages(userId: string): Promise<BattleLogMessage[]> {
    const messages = await battleLogRepo.fetchMessages(userId);
    return messages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
 
// Add a new system message to the battle log.
// Business logic: system messages are for game events.
export async function addSystemMessage(text: string, userId: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("system", text, userId);
}
 
// Add a new ally message to the battle log.
// Business logic: ally messages are for player actions.
export async function addAllyMessage(text: string, userId: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("ally", text, userId);
}
 
// Add a new enemy message to the battle log.
// Business logic: enemy messages are for enemy actions and damage feedback.
export async function addEnemyMessage(text: string, userId: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("enemy", text, userId);
}
 
// Process an attack action.
// Business logic: attack action always results in damage feedback.
export async function processAttackAction(userId: string): Promise<BattleLogMessage[]> {
    return battleLogRepo.processAttack(userId);
}
 
// Process a skill action.
// Business logic: skills deal more damage than regular attacks.
export async function processSkillAction(userId: string): Promise<BattleLogMessage[]> {
    return battleLogRepo.processSkill(userId);
}
 
// Process a guard action.
// Business logic: guarding is a defensive action with system feedback.
export async function processGuardAction(userId: string): Promise<BattleLogMessage[]> {
    return battleLogRepo.processGuard(userId);
}
 
// Add a system message for movement.
export async function addMovementMessage(text: string, userId: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("system", text, userId);
}
 
// Start a new battle - clears old messages and adds initial message.
// Business logic: new battles should have clean state.
export async function startNewBattle(userId: string): Promise<BattleLogMessage> {
    return battleLogRepo.startBattle(userId);
}