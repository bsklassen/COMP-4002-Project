import BattleLog from "./Battlelog";
import { useBattleLog } from "../../../hooks/useBattleLog";
import "./BattleScreen.css";
 
function BattleScreen() {
    const {
        messages,
        error,
        handleAttack,
        handleSkill,
        handleMovement,
        handleGuard
    } = useBattleLog([]);
 
    // Get the last message for action description
    const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
 
    return (
        <div className="battle-screen">
 
            {/* ── TOP HALF: battle area ── */}
            <div className="battle-area">
 
                {/* Enemy side */}
                <div className="enemy-side">
                    <div className="combatant-container">
                        <div className="enemy-placeholder">E</div>
                        <div className="combatant-name">Enemy</div>
                        <div className="health-bar-container">
                            <div className="health-bar-fill" />
                        </div>
                    </div>
                </div>
 
                {/* Ally side */}
                <div className="ally-side">
                    <div className="combatant-container">
                        <div className="ally-sprite">A</div>
                        <div className="combatant-name">Ally</div>
                        <div className="health-bar-container">
                            <div className="health-bar-fill" />
                        </div>
                    </div>
                </div>
            </div>
 
            {/* ── BOTTOM HALF: UI panel ── */}
            <div className="battle-ui">
 
                {/* Left 50%: 2x2 button grid */}
                <div className="moves-panel">
                    <button className="move-button" onClick={handleAttack}>Attack</button>
                    <button className="move-button" onClick={handleSkill}>Skills</button>
                    <button className="move-button" onClick={handleMovement}>Movement</button>
                    <button className="move-button" onClick={handleGuard}>Guard</button>
                </div>
 
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
                    {error ? (
                        <div className="battle-log">
                            <span className="error">Something went wrong: ({error})</span>
                        </div>
                    ) : (
                        <BattleLog messages={messages} />
                    )}
 
                </div>
            </div>
        </div>
    );
}
 
export default BattleScreen;