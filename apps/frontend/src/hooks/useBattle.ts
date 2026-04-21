import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";
import type { BattleLogMessage } from "../types/BattleLogMessage";
import type { Item } from "../types/items";
import * as battleService from "../services/battleService";
import type { Battle, Enemy, ActiveBuff } from "../services/battleService";
import { clearUserItems, getUserItems, removeUserItem } from "../apis/itemApi";

const DEFEAT_DELAY_MS = 5000;

let _msgIdCounter = 1;
function nextId() { return _msgIdCounter++; }

export function useBattle() {
  const navigate = useNavigate();
  const { userId } = useAuth();

  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [battle, setBattle] = useState<Battle | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [playerWon, setPlayerWon] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<BattleLogMessage[]>([]);
  const [currentFight, setCurrentFight] = useState(1);
  const [activeBuffs, setActiveBuffs] = useState<ActiveBuff[]>([]);
  const [inventory, setInventory] = useState<Item[]>([]);

  function appendMessage(type: BattleLogMessage["type"], text: string) {
    setMessages((prev) => [
      ...prev,
      { id: nextId(), type, text, timestamp: new Date() },
    ]);
  }

  useEffect(() => {
    let cancelled = false;

    async function init() {
      setIsLoading(true);
      try {
        if (!userId) throw new Error("Not logged in");
        const save = await battleService.getUserSave(userId);
        const loadedEnemy = await battleService.getEnemyByOrder(save.currentFight);
        const loadedBattle = await battleService.startBattle(loadedEnemy.id, userId);

        if (cancelled) return;
        setCurrentFight(save.currentFight);
        setEnemy(loadedEnemy);
        setBattle(loadedBattle);
        setPlayerHp(loadedBattle.playerHp);
        setEnemyHp(loadedBattle.enemyHp);
        setIsComplete(loadedBattle.isComplete);
        setPlayerWon(loadedBattle.playerWon);
        setActiveBuffs(loadedBattle.activeBuffs ?? []);
        appendMessage("system", `A wild ${loadedEnemy.name} appears!`);

        // Load inventory in parallel — non-fatal if it fails
        try {
          const items = await getUserItems(userId);
          if (!cancelled) setInventory(items);
        } catch { /* inventory unavailable */ }
      } catch (err) {
        if (!cancelled) appendMessage("system", `Failed to load battle: ${err}`);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void init();
    return () => { cancelled = true; };
  }, [userId]);

  // Shared result handler used by both submitAction and usePotion
  function handleResult(result: Awaited<ReturnType<typeof battleService.playerAction>>, action: string, itemLabel?: string) {
    setPlayerHp(result.battle.playerHp);
    setEnemyHp(result.battle.enemyHp);
    setIsComplete(result.isComplete);
    setPlayerWon(result.playerWon);
    setBattle(result.battle);
    setActiveBuffs(result.battle.activeBuffs ?? []);

    if (itemLabel) {
      appendMessage("ally", `[Player] used ${itemLabel} → restored ${result.playerHpRestored ?? 0} HP`);
    } else if (action === "heal") {
      appendMessage("ally", `[Player] used Heal → restored ${result.playerHpRestored ?? 0} HP`);
    } else if (action !== "guard") {
      const actionLabel = action === "attack" ? "Attack" : "Skill";
      appendMessage("ally", `[Player] used ${actionLabel} → dealt ${result.playerDamageDealt} damage`);
    }

    if (result.enemyMove !== undefined) {
      const enemyMoveLabel = result.enemyMove === "basic" ? "Basic Attack" : "Ultimate";
      const eName = enemy?.name ?? "Enemy";
      appendMessage("enemy", `[${eName}] used ${enemyMoveLabel} → dealt ${result.enemyDamageDealt} damage`);
    }

    if (result.isComplete) {
      if (result.playerWon) {
        const defeatedName = enemy?.name ?? "Enemy";
        appendMessage("system", `You defeated ${defeatedName}!\nMoving to the next floor...`);
        setTimeout(() => {
          navigate("/victory", { state: { enemyName: defeatedName } });
        }, DEFEAT_DELAY_MS);
      } else {
        appendMessage("system", "You were defeated!\nStarting on floor 1 again.");
        setTimeout(async () => {
          if (userId) {
            await Promise.all([
              battleService.resetSave(userId),
              clearUserItems(userId),
            ]);
          }
          navigate("/battle", { replace: true, state: { resetKey: Date.now() } });
        }, DEFEAT_DELAY_MS);
      }
    }
  }

  async function submitAction(action: "attack" | "skill" | "heal" | "guard") {
    if (!battle || isActing || isComplete) return;
    setIsActing(true);

    try {
      if (action === "guard") {
        const existing = activeBuffs.find((b) => b.name === "Guard");
        const turns = existing ? 3 : 3; // always refreshes to 3
        appendMessage("ally", `[Player] used Guard! DEF +30% for ${turns} turns.`);
      }

      const result = await battleService.playerAction(battle.id, action);
      handleResult(result, action);
    } catch (err) {
      appendMessage("system", `Error: ${err}`);
    } finally {
      setIsActing(false);
    }
  }

  async function usePotion(potionLabel: string, itemName: string) {
    if (!battle || isActing || isComplete || !userId) return;

    const item = inventory.find((i) => i.name === itemName);
    if (!item) {
      appendMessage("system", `You don't have a ${potionLabel}!`);
      return;
    }

    setIsActing(true);
    try {
      await removeUserItem(userId, item.id);
      // Remove one copy from local inventory
      setInventory((prev) => {
        const idx = prev.findIndex((i) => i.id === item.id);
        if (idx === -1) return prev;
        return [...prev.slice(0, idx), ...prev.slice(idx + 1)];
      });
      const result = await battleService.playerAction(battle.id, "heal");
      handleResult(result, "heal", potionLabel);
    } catch (err) {
      appendMessage("system", `Error: ${err}`);
    } finally {
      setIsActing(false);
    }
  }

  return {
    enemy,
    battle,
    playerHp,
    enemyHp,
    isLoading,
    isActing,
    isComplete,
    playerWon,
    messages,
    currentFight,
    activeBuffs,
    inventory,
    submitAction,
    usePotion,
  };
}
