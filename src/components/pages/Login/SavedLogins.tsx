import { useState } from "react";
import "./SavedLogins.css";

// Type definition for saved users
export interface SavedUser {
  id: string;
  username: string;
  email: string;
  password: string;
}

interface SavedLoginsProps {
  savedUsers: SavedUser[];
  onSelectUser: (username: string, email: string, password: string) => void;
  onDeleteUser: (userId: string) => void;
}

function SavedLogins({ savedUsers, onSelectUser, onDeleteUser }: SavedLoginsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<SavedUser | null>(null);

  const handleSelectUser = (user: SavedUser) => {
    setSelectedUser(user);
    onSelectUser(user.username, user.email, user.password);
    setIsOpen(false);
  };

  const handleDeleteUser = (e: React.MouseEvent, userId: string) => {
    e.stopPropagation(); // Prevent selecting the user when clicking delete
    onDeleteUser(userId);
    // Reset selected user if it was deleted
    if (selectedUser?.id === userId) {
      setSelectedUser(null);
    }
  };

  if (savedUsers.length === 0) {
    return null;
  }

  return (
    <div className="saved-logins">
      <button
        type="button"
        className="saved-logins-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedUser ? selectedUser.username : "Select Saved Login"}
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="saved-logins-dropdown">
          {savedUsers.map((user) => (
            <button
              key={user.id}
              type="button"
              className="saved-login-item"
              onClick={() => handleSelectUser(user)}
            >
              <div className="user-avatar">{user.username ? user.username.charAt(0).toUpperCase() : "?"}</div>
              <div className="user-info">
                <div className="user-name">{user.username}</div>
                <div className="user-email">{user.email}</div>
              </div>
              <button
                type="button"
                className="delete-user-btn"
                onClick={(e) => handleDeleteUser(e, user.id)}
                aria-label="Delete user"
              >
                ✕
              </button>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedLogins;