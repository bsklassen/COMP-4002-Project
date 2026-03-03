import { useState, useEffect } from "react";
import SavedLogins, { type SavedUser } from "./SavedLogins";
import { useUser } from "../../common/usercontext/UserContext";
import "./Login.css";

// Initial hardcoded saved users (used only if no cached users exist)
const INITIAL_SAVED_USERS: SavedUser[] = [
  { id: "1", username: "SpookyWarrior", email: "warrior@haunted.com", password: "warrior123" },
  { id: "2", username: "ShadowMage", email: "mage@darkness.com", password: "shadow123" },
  { id: "3", username: "PhantomRogue", email: "rogue@phantom.com", password: "phantom123" },
  { id: "4", username: "GhostKnight", email: "knight@spectral.com", password: "ghost123" },
];

function Login() {
  const { setUsername: setGlobalUsername } = useUser();
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [savedUsers, setSavedUsers] = useState<SavedUser[]>([]);
  const [successMessage, setSuccessMessage] = useState("");

  // Load saved users from localStorage on mount
  useEffect(() => {
    const storedUsers = localStorage.getItem("savedUsers");
    if (storedUsers) {
      try {
        setSavedUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Error loading saved users:", error);
        setSavedUsers(INITIAL_SAVED_USERS);
      }
    } else {
      // Use initial users if nothing in localStorage
      setSavedUsers(INITIAL_SAVED_USERS);
    }
  }, []);

  // Save to localStorage whenever savedUsers changes
  useEffect(() => {
    if (savedUsers.length > 0) {
      localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    }
  }, [savedUsers]);

  const handleSavedUserSelect = (selectedUsername: string, selectedEmail: string, selectedPassword: string) => {
    setUsername(selectedUsername);
    setEmail(selectedEmail);
    setPassword(selectedPassword);
  };

  const handleDeleteUser = (userId: string) => {
    setSavedUsers(prev => prev.filter(user => user.id !== userId));
    setSuccessMessage("User removed from saved logins");
    setTimeout(() => setSuccessMessage(""), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signup) {
      // Check if user already exists
      const userExists = savedUsers.some(
        user => user.username.toLowerCase() === username.toLowerCase() || 
                user.email.toLowerCase() === email.toLowerCase()
      );

      if (userExists) {
        setSuccessMessage("User with this username or email already exists!");
        setTimeout(() => setSuccessMessage(""), 3000);
        return;
      }

      // Add new user to saved logins
      const newUser: SavedUser = {
        id: crypto.randomUUID(), // More reliable than Date.now()
        username,
        email,
        password,
      };

      setSavedUsers(prev => [...prev, newUser]);
      
      // Show success message
      setSuccessMessage("Account created successfully! Switch to Login to use it.");
      
      // Clear form and reset after 2 seconds
      setTimeout(() => {
        setUsername("");
        setEmail("");
        setPassword("");
        setSuccessMessage("");
      }, 2000);
      
    } else {
      // Login logic
      const userExists = savedUsers.find(
        user => user.username.toLowerCase() === username.toLowerCase() && 
                user.email.toLowerCase() === email.toLowerCase() &&
                user.password === password
      );

      if (userExists) {
        // Set username in global state
        setGlobalUsername(username);
        setSuccessMessage("Login successful!");
        setTimeout(() => setSuccessMessage(""), 2000);
      } else {
        setSuccessMessage("Invalid credentials!");
        setTimeout(() => setSuccessMessage(""), 3000);
      }
    }
  };

  const handleToggleMode = () => {
    setSignup(!signup);
    setSuccessMessage("");
    setUsername("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-header">
        <h2>{signup ? "Sign Up" : "Login"}</h2>
      </div>

      {successMessage && (
        <div className={`success-message ${successMessage.includes('Invalid') || successMessage.includes('User with this username or email already exists!') ? 'error' : ''}`}>
          {successMessage}
        </div>
      )}

      {!signup && (
        <SavedLogins 
          savedUsers={savedUsers} 
          onSelectUser={handleSavedUserSelect}
          onDeleteUser={handleDeleteUser}
        />
      )}

      <form className="login-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">{signup ? "Sign Up" : "Login"}</button>
      </form>

      <p className="toggle-text">
        {signup ? "Already have an account?" : "Need an account?"}{" "}
        <button type="button" onClick={handleToggleMode}>
          {signup ? "Login" : "Sign Up"}
        </button>
      </p>
    </div>
  );
}

export default Login;