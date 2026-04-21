import BattleLog from "./Battlelog";
import MovesPanel from "./MovesPanel";
import { useBattle } from "../../../hooks/useBattle";
import { useUser } from "@clerk/clerk-react";
import "./BattleScreen.css";
 
const ALLY_IMAGE = "/images/ally/player.png";
 
function BattleScreen() {
    const { user } = useUser();
    const {
        enemy,
        playerHp,
        enemyHp,
        isLoading,
        isActing,
        isComplete,
        messages,
        currentFight,
        activeBuffs,
        inventory,
        submitAction,
        usePotion,
    } = useBattle();
 
    // Get the last message for action description
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
 
    const maxEnemyHp = enemy?.maxHp ?? 1;
    const enemyHpPct = Math.max(0, Math.round((enemyHp / maxEnemyHp) * 100));
    const playerHpPct = Math.max(0, playerHp);
 
    return (
        <div className="battle-screen">
 
            {/* Floor counter + active buffs */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0.75rem", background: "#1a1a1a", color: "#f5deb3", fontWeight: "bold", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    {activeBuffs.map((buff) => (
                        <span key={buff.name + buff.target} style={{ background: "#2a4a2a", border: "1px solid #4a8a4a", borderRadius: "4px", padding: "0.1rem 0.4rem", fontSize: "0.75rem", color: "#90ee90" }}>
                            {buff.name} ({buff.affectedStat.toUpperCase()} {buff.value >= 1 ? `+${Math.round((buff.value - 1) * 100)}%` : `-${Math.round((1 - buff.value) * 100)}%`}) {buff.turnsRemaining}T
                        </span>
                    ))}
                </div>
                <span>Floor {currentFight}</span>
            </div>
 
            {/* ── TOP HALF: battle area ── */}
            <div className="battle-area">
 
                {/* Ally side */}
                <div className="ally-side">
                    <div className="combatant-container">
                        <img src={ALLY_IMAGE} alt={user?.username ?? "Ally"} className="ally-sprite" />
                        <div className="combatant-name">{user?.username ?? "Ally"}</div>
                        <div className="health-bar-container">
                            <div className="health-bar-fill" style={{ width: `${playerHpPct}%` }} />
                        </div>
                    </div>
                </div>
 
                {/* Enemy side */}
                <div className="enemy-side">
                    <div className="combatant-container">
                        {enemy ? (
                            <img src={enemy.imagePath} alt={enemy.name} className="enemy-placeholder" />
                        ) : (
                            <div className="enemy-placeholder">E</div>
                        )}
                        <div className="combatant-name">{isLoading ? "Loading…" : (enemy?.name ?? "Enemy")}</div>
                        <div className="health-bar-container">
                            <div className="health-bar-fill" style={{ width: `${enemyHpPct}%` }} />
                        </div>
                    </div>
                </div>
            </div>
 
            {/* ── BOTTOM HALF: UI panel ── */}
            <div className="battle-ui">
 
                {/* Left 50%: 2x2 button grid */}
                <MovesPanel
                    onAction={submitAction}
                    onUsePotion={usePotion}
                    inventory={inventory.map((i) => i.name)}
                    disabled={isLoading || isActing || isComplete}
                />
 
                {/* Right 50%: action desc + log side by side */}
                <div className="battle-info">
 
                    {/* Action description */}
                    <div className="action-desc">
                        {lastMessage ? (
                            <p>{lastMessage.text}</p>
                        ) : (
                            <p>Select an action...</p>
                        )}
                    </div>
 
                    {/* Battle log */}
                    <BattleLog messages={messages} />
 
                </div>
            </div>
        </div>
    );
}
 
export default BattleScreen;