import "./BattleScreen.css";

interface MovesPanelProps {
    onAttack: () => void;
    onSkills: () => void;
    onMovement: () => void;
    onGuard: () => void;
}

function MovesPanel({ onAttack, onSkills, onMovement, onGuard }: MovesPanelProps) {
    return (
        <div className="moves-panel">
            <button className="move-button" onClick={onAttack}>Attack</button>
            <button className="move-button" onClick={onSkills}>Skills</button>
            <button className="move-button" onClick={onMovement}>Movement</button>
            <button className="move-button" onClick={onGuard}>Guard</button>
        </div>
    );
}

export default MovesPanel;