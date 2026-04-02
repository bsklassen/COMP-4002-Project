import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { BattleLogMessage } from "../types/BattleLogMessage";
import * as battleService from "../services/battleService";
import type { Battle, Enemy } from "../services/battleService";
import { useUser } from "../components/common/usercontext/UserContext";

let _msgIdCounter = 1;
function nextId() { return _msgIdCounter++; }

export function useBattle() {
  const navigate = useNavigate();
  const { userId } = useUser();

  const [enemy, setEnemy] = useState<Enemy | null>(null);
  const [battle, setBattle] = useState<Battle | null>(null);
  const [playerHp, setPlayerHp] = useState(100);
  const [enemyHp, setEnemyHp] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isActing, setIsActing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [playerWon, setPlayerWon] = useState<boolean | null>(null);
  const [messages, setMessages] = useState<BattleLogMessage[]>([]);

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
        setEnemy(loadedEnemy);
        setBattle(loadedBattle);
        setPlayerHp(loadedBattle.playerHp);
        setEnemyHp(loadedBattle.enemyHp);
        setIsComplete(loadedBattle.isComplete);
        setPlayerWon(loadedBattle.playerWon);
        appendMessage("system", `A wild ${loadedEnemy.name} appears!`);
      } catch (err) {
        if (!cancelled) appendMessage("system", `Failed to load battle: ${err}`);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void init();
    return () => { cancelled = true; };
  }, [userId]);

  async function submitAction(action: "attack" | "skill" | "skill2" | "guard") {
    if (!battle || isActing || isComplete) return;
    setIsActing(true);

    try {
      if (action === "guard") {
        appendMessage("ally", "[Player] is guarding!");
      }

      const result = await battleService.playerAction(battle.id, action);

      setPlayerHp(result.battle.playerHp);
      setEnemyHp(result.battle.enemyHp);
      setIsComplete(result.isComplete);
      setPlayerWon(result.playerWon);
      setBattle(result.battle);

      if (action !== "guard") {
        const actionLabel =
          action === "attack" ? "Attack" : action === "skill" ? "Skill" : "Skill 2";
        appendMessage("ally", `[Player] used ${actionLabel} → dealt ${result.playerDamageDealt} damage`);
      }

      const enemyMoveLabel =
        result.enemyMove === "basic" ? "Basic Attack" : "Ultimate";
      appendMessage("enemy", `[Enemy] used ${enemyMoveLabel} → dealt ${result.enemyDamageDealt} damage`);

      if (result.isComplete) {
        if (result.playerWon) {
          appendMessage("system", "Victory! The enemy has been defeated.");
          navigate("/victory", { state: { enemyName: enemy?.name ?? "Enemy" } });
        } else {
          appendMessage("system", "You were defeated!");
        }
      }
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
    submitAction,
  };
}
