import BattleLog from "./Battlelog";
import MovesPanel from "./MovesPanel";
import { useBattle } from "../../../hooks/useBattle";
import "./BattleScreen.css";
 
function BattleScreen() {
    const {
        enemy,
        playerHp,
        enemyHp,
        isLoading,
        isActing,
        isComplete,
        messages,
        submitAction,
    } = useBattle();
 
    // Get the last message for action description
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;

    const maxEnemyHp = enemy?.maxHp ?? 1;
    const enemyHpPct = Math.max(0, Math.round((enemyHp / maxEnemyHp) * 100));
    const playerHpPct = Math.max(0, playerHp);
 
    return (
        <div className="battle-screen">
 
            {/* ── TOP HALF: battle area ── */}
            <div className="battle-area">
 
                {/* Ally side */}
                <div className="ally-side">
                    <div className="combatant-container">
                        <div className="ally-sprite">A</div>
                        <div className="combatant-name">Ally</div>
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
                <MovesPanel onAction={submitAction} disabled={isLoading || isActing || isComplete} />
 
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