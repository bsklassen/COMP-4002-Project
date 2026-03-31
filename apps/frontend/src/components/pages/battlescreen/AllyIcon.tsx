import reactLogo from "../../../assets/react.svg";

function AllyIcon() {
    return (
        <div className="ally-icon">
            {/* Character Placeholder */}
            <img src={reactLogo} alt="temp" width="500" height="600" />

            {/* Name */}
            <div className="ally-name">allies</div>

            {/* Health Bar */}
            <div className="health-bar">100</div>
        </div>
    );
}

export default AllyIcon;