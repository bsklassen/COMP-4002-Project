import UserAvatar from "./usercontext/Useravatar";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header style={{ padding: "1rem", background: "#282c34", color: "white", display: "flex", alignItems: "center" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/" style={{ color: "white" }}>Home</NavLink>
        <NavLink to="/login" style={{ color: "white" }}>Login</NavLink>
        <NavLink to="/battle" style={{ color: "white" }}>BattleScreen</NavLink>
        <NavLink to="/victory" style={{ color: "white" }}>Victory</NavLink>
      </nav>
      <div style={{ marginLeft: "auto" }}>
        <UserAvatar />
      </div>
    </header>
  );
}

export default Header;
