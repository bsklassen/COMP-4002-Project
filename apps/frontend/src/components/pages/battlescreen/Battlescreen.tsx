import BattleLog from "./Battlelog";
import MovesPanel from "./MovesPanel";
import { useBattle } from "../../../hooks/useBattle";
import { useUser } from "@clerk/clerk-react";
import "./BattleScreen.css";

const ALLY_IMAGE = "/images/heros/the_nobody.png";
 
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
        sessionWins,
    } = useBattle();
 
    // Get the last message for action description
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
 
    const maxEnemyHp = enemy?.maxHp ?? 1;
    const enemyHpPct = Math.max(0, Math.round((enemyHp / maxEnemyHp) * 100));
    const playerHpPct = Math.max(0, playerHp);
 
    return (
        <div className="battle-screen">

            {/*Border styling*/}
            <img src="/images/assets/borders/tl-border-32px.png" alt="" style={{position:'absolute', top: 0, left: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
            <img src="/images/assets/borders/tr-border-32px.png" alt="" style={{position:'absolute', top: 0, right: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
            <img src="/images/assets/borders/bl-border-32px.png" alt="" style={{position:'absolute', bottom: 0, left: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />
            <img src="/images/assets/borders/br-border-32px.png" alt="" style={{position:'absolute', bottom: 0, right: 0, width: 32, height: 32, imageRendering: 'pixelated'}} />

            <div style={{position:'absolute', top: 0, left: 32, right: 32, height: 32, backgroundImage: "url('/images/assets/borders/top-border-32px.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
            <div style={{position:'absolute', bottom: 0, left: 32, right: 32, height: 32, backgroundImage: "url('/images/assets/borders/bot-border-32px.png')", backgroundRepeat: 'repeat-x', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
            <div style={{position:'absolute', left: 0, top: 32, bottom: 32, width: 32, backgroundImage: "url('/images/assets/borders/left-border-32px.png')", backgroundRepeat: 'repeat-y', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
            <div style={{position:'absolute', right: 0, top: 32, bottom: 32, width: 32, backgroundImage: "url('/images/assets/borders/right-border-32px.png')", backgroundRepeat: 'repeat-y', backgroundSize: '32px 32px', imageRendering: 'pixelated'}} />
                                    

            {/* Floor counter + active buffs */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.25rem 0.75rem", background: "#1a1a1a", color: "#f5deb3", fontWeight: "bold", fontSize: "0.85rem" }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                    {activeBuffs.map((buff) => (
                        <span key={buff.name + buff.target} style={{ background: "#2a4a2a", border: "1px solid #4a8a4a", borderRadius: "4px", padding: "0.1rem 0.4rem", fontSize: "0.75rem", color: "#90ee90" }}>
                            {buff.name} ({buff.affectedStat.toUpperCase()} {buff.value >= 1 ? `+${Math.round((buff.value - 1) * 100)}%` : `-${Math.round((1 - buff.value) * 100)}%`}) {buff.turnsRemaining}T
                        </span>
                    ))}
                </div>
                <span>Floor {currentFight} &nbsp;|&nbsp; Items: {inventory.length} &nbsp;|&nbsp; Session Wins: {sessionWins}</span>
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