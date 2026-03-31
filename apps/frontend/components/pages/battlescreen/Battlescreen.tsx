import AllyIcon from "./AllyIcon";
import BattleLog from "./Battlelog";
import MovesPanel from "./MovesPanel";
import { useBattleLog } from "../../../hooks/useBattleLog";
import "./BattleScreen.css";

function BattleScreen() {
    // Use the custom hook to get battle log state and actions
    // Pass empty dependencies array - messages refresh on every action
    const {
        messages,
        error,
        handleAttack,
        handleSkill,
        handleMovement,
        handleGuard
    } = useBattleLog([]);

    return (
        <div className="battle-screen">
            {/* Battle Area */}
            <div className="battle-area">
                {/* Enemy Section */}
                <div className="enemy-container">
                    <div className="enemy-placeholder">E</div>
                </div>

                {/* Allies Section */}
                <div className="allies-container">
                    <div className="ally-sprite">A1</div>
                    <div className="ally-sprite">A2</div>
                    <div className="ally-sprite">A3</div>
                    <div className="ally-sprite">A4</div>
                </div>
            </div>

            {/* Bottom UI Panel */}
            <div className="battle-ui">
                {/* Move Buttons - Pass handlers from the hook */}
                <MovesPanel 
                    onAttack={handleAttack}
                    onSkills={handleSkill}
                    onMovement={handleMovement}
                    onGuard={handleGuard}
                />

                {/* Battle Log - Pass messages from the hook, show error if present */}
                {error ? (
                    <div className="battle-log">
                        <span className="error">Something went wrong: ({error})</span>
                    </div>
                ) : (
                    <BattleLog messages={messages} />
                )}

                {/* Ally Icons */}
                <div className="ally-icons-panel">
                    <AllyIcon />
                    <AllyIcon />
                    <AllyIcon />
                    <AllyIcon />
                </div>
            </div>
        </div>
    );
}

export default BattleScreen;