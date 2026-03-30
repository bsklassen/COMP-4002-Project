import { useEffect, useState } from 'react';
import type { BattleLogMessage } from '../types/BattleLogMessage';
import * as BattleLogService from '../services/battleLogService';
import { useUser } from '../components/common/usercontext/UserContext';
 
/**
 * Custom hook for battle log state and actions.
 * Fetches messages for the currently logged in user.
 * Messages persist between sessions per user (I.4).
 */
export function useBattleLog(dependencies: unknown[]) {
    const [messages, setMessages] = useState<BattleLogMessage[]>([]);
    const [error, setError] = useState<string | null>(null);
    const { userId } = useUser();
 
    // Fetch all existing messages for the current user
    const fetchMessages = async () => {
        if (!userId) return;
        try {
            const result = await BattleLogService.fetchMessages(userId);
            setMessages([...result]);
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };
 
    const handleAttack = async () => {
        if (!userId) return;
        try {
            await BattleLogService.processAttackAction(userId);
            await fetchMessages();
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };
 
    const handleSkill = async () => {
        if (!userId) return;
        try {
            await BattleLogService.processSkillAction(userId);
            await fetchMessages();
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };
 
    const handleGuard = async () => {
        if (!userId) return;
        try {
            await BattleLogService.processGuardAction(userId);
            await fetchMessages();
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };
 
    const handleMovement = async () => {
        if (!userId) return;
        try {
            await BattleLogService.addMovementMessage('Movement option selected.', userId);
            await fetchMessages();
        } catch (errorObject) {
            setError(`${errorObject}`);
        }
    };
 
    // On mount and when userId changes, fetch messages for the current user
    // This ensures each user sees their own battle log (I.4)
    useEffect(() => {
        fetchMessages();
    }, [userId, ...dependencies]);
 
    return {
        messages,
        error,
        handleAttack,
        handleSkill,
        handleGuard,
        handleMovement
    };
}
 