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
export async function fetchMessages(): Promise<BattleLogMessage[]> {
    const messages = await battleLogRepo.fetchMessages();
    return messages.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}
 
// Add a new system message to the battle log.
// Business logic: system messages are for game events.
export async function addSystemMessage(text: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("system", text);
}
 
// Add a new ally message to the battle log.
// Business logic: ally messages are for player actions.
export async function addAllyMessage(text: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("ally", text);
}
 
// Add a new enemy message to the battle log.
// Business logic: enemy messages are for enemy actions and damage feedback.
export async function addEnemyMessage(text: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("enemy", text);
}
 
// Process an attack action.
// Business logic: attack action always results in damage feedback.
export async function processAttackAction(): Promise<BattleLogMessage[]> {
    return battleLogRepo.processAttack();
}
 
// Process a skill action.
// Business logic: skills deal more damage than regular attacks.
export async function processSkillAction(): Promise<BattleLogMessage[]> {
    return battleLogRepo.processSkill();
}
 
// Process a guard action.
// Business logic: guarding is a defensive action with system feedback.
export async function processGuardAction(): Promise<BattleLogMessage[]> {
    return battleLogRepo.processGuard();
}
 
// Add a system message for movement.
export async function addMovementMessage(text: string): Promise<BattleLogMessage> {
    return battleLogRepo.createMessage("system", text);
}
 
// Start a new battle - clears old messages and adds initial message.
// Business logic: new battles should have clean state.
export async function startNewBattle(): Promise<BattleLogMessage> {
    return battleLogRepo.startBattle();
}