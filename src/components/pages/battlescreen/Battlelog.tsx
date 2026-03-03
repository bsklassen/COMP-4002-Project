import "./BattleScreen.css";

interface LogMessage {
    id: number;
    type: 'system' | 'ally' | 'enemy';
    text: string;
}

interface BattleLogProps {
    messages: LogMessage[];
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