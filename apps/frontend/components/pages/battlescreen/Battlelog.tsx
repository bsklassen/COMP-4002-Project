import type { BattleLogMessage } from "../../../types/BattleLogMessage";
import "./BattleScreen.css"


/**
 * BattleLog Component
 * 
 * This component uses the hook-service-repository architecture:
 * - Receives messages from the useBattleLog hook (presentation logic)
 * - Displays messages using the BattleLogMessage type
 * - Pure presentation component with no business logic
 * 
 * The hook provides the data, this component only renders it.
 */

interface BattleLogProps {
    messages: BattleLogMessage[];
}

function BattleLog({ messages }: BattleLogProps) {
    return (
        <div className="battle-log">
            {messages.map((message) => (
                <div 
                    key={message.id} 
                    className={`log-message log-${message.type}`}
                >
                    {message.text}
                </div>
            ))}
        </div>
    );
}

export default BattleLog;