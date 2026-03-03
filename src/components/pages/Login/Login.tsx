import { useState } from "react";
import SavedLogins from "./SavedLogins";
import { useUser } from "../../common/usercontext/UserContext";
import useAuth from "../../../hooks/useAuth";
import "./Login.css";


function Login() {
  const { setUsername: setGlobalUsername } = useUser();
  const { savedUsers, login: authLogin, signup: authSignup, remove: authRemove } = useAuth();
  const [signup, setSignup] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // savedUsers is provided by useAuth, which obtains data from the repository

  const handleSavedUserSelect = (selectedUsername: string, selectedEmail: string, selectedPassword: string) => {
    setUsername(selectedUsername);
    setEmail(selectedEmail);
    setPassword(selectedPassword);
  };

  const handleDeleteUser = (userId: string) => {
    void (async () => {
      const deleted = await authRemove(userId);
      if (deleted) {
        setSuccessMessage("User removed from saved logins");
        setTimeout(() => setSuccessMessage(""), 2000);
      }
    })();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (signup) {
      void (async () => {
        try {
          await authSignup({ username, email, password });
          setSuccessMessage("Account created successfully! Switch to Login to use it.");
          setTimeout(() => setSuccessMessage(""), 2000);
          setUsername("");
          setEmail("");
          setPassword("");
        } catch (err) {
          setSuccessMessage("Error creating account");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      })();
    } else {
      void (async () => {
        const user = await authLogin(username, email, password);
        if (user) {
          setGlobalUsername(username);
          setSuccessMessage("Login successful!");
          setTimeout(() => setSuccessMessage(""), 2000);
        } else {
          setSuccessMessage("Invalid credentials!");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      })();
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