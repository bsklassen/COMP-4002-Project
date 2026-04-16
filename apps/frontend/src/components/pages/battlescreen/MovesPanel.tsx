import { useState } from "react";
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

const POTION_MENU = [
  { label: "Small Potion",       itemName: "Minor Health Potion" },
  { label: "Big Health Potion",  itemName: "Big Health Potion"   },
  { label: "Full Health Potion", itemName: "Full Health Potion"  },
] as const;

interface MovesPanelProps {
    onAction: (action: "attack" | "skill" | "heal" | "guard") => void;
    onUsePotion: (potionLabel: string, itemName: string) => void;
    inventory: string[];
    disabled: boolean;
}

function MovesPanel({ onAction, onUsePotion, inventory, disabled }: MovesPanelProps) {
    const [showHealMenu, setShowHealMenu] = useState(false);

    if (showHealMenu) {
        return (
            <div className="moves-panel">
                {POTION_MENU.map(({ label, itemName }) => {
                    const owned = inventory.includes(itemName);
                    return (
                        <button
                            key={label}
                            className="move-button"
                            disabled={disabled}
                            style={{ color: owned ? "#90ee90" : "#ff6b6b" }}
                            onClick={() => { setShowHealMenu(false); onUsePotion(label, itemName); }}
                        >
                            {label}
                        </button>
                    );
                })}
                <button className="move-button" disabled={disabled} onClick={() => setShowHealMenu(false)}>
                    Back
                </button>
            </div>
        );
    }

    return (
        <div className="moves-panel">
            <button className="move-button" onClick={() => onAction("attack")} disabled={disabled}>Attack</button>
            <button className="move-button" onClick={() => onAction("skill")} disabled={disabled}>Skill</button>
            <button className="move-button" onClick={() => setShowHealMenu(true)} disabled={disabled}>Heal</button>
            <button className="move-button" onClick={() => onAction("guard")} disabled={disabled}>Guard</button>
        </div>
    );
}

export default MovesPanel;