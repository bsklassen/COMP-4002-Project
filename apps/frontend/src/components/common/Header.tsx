import { NavLink } from "react-router-dom";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";
 
function Header() {
  return (
    <header style={{ padding: "1rem", background: "#282c34", color: "white", display: "flex", alignItems: "center" }}>
      <nav style={{ display: "flex", gap: "1rem" }}>
        <NavLink to="/" style={{ color: "white" }}>Home</NavLink>
        <NavLink to="/battle" style={{ color: "white" }}>BattleScreen</NavLink>
        <NavLink to="/victory" style={{ color: "white" }}>Victory</NavLink>
      </nav>
 
      {/* Clerk auth components */}
      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "1rem" }}>
        {/* Show sign in button when signed out */}
        <SignedOut>
          <SignInButton mode="modal">
            <button style={{
              background: "#4a7ba7",
              color: "white",
              border: "none",
              padding: "0.5rem 1rem",
              borderRadius: "4px",
              cursor: "pointer"
            }}>
              Sign In
            </button>
          </SignInButton>
        </SignedOut>
        {/* Show user avatar/menu when signed in */}
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
}
 
export default Header;
 