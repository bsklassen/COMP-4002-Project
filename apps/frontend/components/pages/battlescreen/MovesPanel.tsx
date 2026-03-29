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