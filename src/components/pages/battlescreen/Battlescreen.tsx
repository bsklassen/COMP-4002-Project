import { useState } from "react";
import AllyIcon from "./AllyIcon";
import BattleLog from "./Battlelog";
import MovesPanel from "./MovesPanel";
import "./BattleScreen.css";

export interface LogMessage {
    id: number;
    type: 'system' | 'ally' | 'enemy';
    text: string;
}

function BattleScreen() {
    const [battleLog, setBattleLog] = useState<LogMessage[]>([
        { id: 1, type: 'system', text: 'Battle has begun!' }
    ]);
    const [messageId, setMessageId] = useState(2);

    const addLogMessage = (type: 'system' | 'ally' | 'enemy', text: string) => {
        const newMessage: LogMessage = {
            id: messageId,
            type,
            text
        };
        setBattleLog(prev => [...prev, newMessage]);
        setMessageId(prev => prev + 1);
    };

    const handleAttack = () => {
        addLogMessage('ally', 'You strike the enemy with your sword!');
        
        // Simulate enemy response after a short delay
        setTimeout(() => {
            addLogMessage('enemy', 'The enemy takes 15 damage!');
        }, 800);
    };

    const handleSkills = () => {
        addLogMessage('ally', 'You cast Fireball on the enemy!');
        
        // Simulate enemy response after a short delay
        setTimeout(() => {
            addLogMessage('enemy', 'The enemy is engulfed in flames! 25 damage!');
        }, 800);
    };

    const handleMovement = () => {
        // Placeholder for movement functionality
        addLogMessage('system', 'Movement option selected.');
    };

    const handleGuard = () => {
        // Placeholder for guard functionality
        addLogMessage('system', 'You raise your shield in defense.');
    };

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
                {/* Move Buttons */}
                <MovesPanel 
                    onAttack={handleAttack}
                    onSkills={handleSkills}
                    onMovement={handleMovement}
                    onGuard={handleGuard}
                />

                {/* Battle Log */}
                <BattleLog messages={battleLog} />

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