import React, { useState } from "react";
import { register, login } from "../services/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: any, token: string) => void;
}

const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (tab === "login") {
        const { user, token } = await login(email, password);
        onSuccess(user, token);
      } else {
        const { user, token } = await register(email, password, name);
        onSuccess(user, token);
      }
      setEmail("");
      setPassword("");
      setName("");
    } catch (err: any) {
      setError(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-backdrop">
      <div className="auth-modal">
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        <div className="auth-tabs">
          <button
            className={tab === "login" ? "active" : ""}
            onClick={() => setTab("login")}
          >
            Login
          </button>
          <button
            className={tab === "register" ? "active" : ""}
            onClick={() => setTab("register")}
          >
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
          {tab === "register" && (
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
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
          {error && <div className="auth-error">{error}</div>}
          <button
            type="submit"
            disabled={loading}
            className="get-started-button"
          >
            {loading
              ? "Please wait..."
              : tab === "login"
              ? "Login"
              : "Register"}
          </button>
        </form>
      </div>
      <style>{`
        .auth-modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; z-index: 1000;
        }
        .auth-modal {
          background: #fff; padding: 2rem; border-radius: 8px; min-width: 320px; position: relative;
        }
        .close-button {
          position: absolute; top: 8px; right: 12px; background: none; border: none; font-size: 1.5rem; cursor: pointer;
        }
        .auth-tabs { display: flex; margin-bottom: 1rem; }
        .auth-tabs button {
          flex: 1; padding: 0.5rem; border: none; background: #eee; cursor: pointer;
        }
        .auth-tabs .active {
          background: #2d2d2d; color: #fff;
        }
        .auth-form { display: flex; flex-direction: column; gap: 0.75rem; }
        .auth-form input { padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px; }
        .auth-submit { background: #2d2d2d; color: #fff; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; }
        .auth-error { color: #c00; font-size: 0.9rem; }
      `}</style>
    </div>
  );
};

export default AuthModal;
