import "./BattleScreen.css";

/**
 * MovesPanel Component
 * 
 * This component uses the hook-service-repository architecture:
 * - Receives action handlers from the useBattleLog hook
 * - The handlers trigger business logic in the BattleLogService
 * - The service interacts with the BattleLogRepository for data persistence
 * 
 * This separation allows the component to focus only on UI,
 * while business logic (damage calculation, message formatting) lives in the service,
 * and data access (CRUD operations) lives in the repository.
 */

interface MovesPanelProps {
    onAction: (action: "attack" | "skill" | "skill2" | "guard") => void;
    disabled: boolean;
}

function MovesPanel({ onAction, disabled }: MovesPanelProps) {
    return (
        <div className="moves-panel">
            <button className="move-button" onClick={() => onAction("attack")} disabled={disabled}>Attack</button>
            <button className="move-button" onClick={() => onAction("skill")} disabled={disabled}>Skills</button>
            <button className="move-button" onClick={() => onAction("skill2")} disabled={disabled}>Movement</button>
            <button className="move-button" onClick={() => onAction("guard")} disabled={disabled}>Guard</button>
        </div>
    );
}

export default MovesPanel;