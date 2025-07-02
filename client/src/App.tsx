import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import "./App.css";
import GoalMaker from "./components/GoalMaker";
import Preferences from "./components/Preferences";
import Home from "./components/Home";
import AuthModal from "./components/AuthModal";
import Calendar from "./components/Calendar";
import AuthCallback from "./components/AuthCallback";
import { getProfile } from "./services/auth";

function RequireAuth({
  user,
  children,
}: {
  user: any;
  children: React.ReactNode;
}) {
  const location = useLocation();
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function App() {
  const [authOpen, setAuthOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
      getProfile(storedToken)
        .then(setUser)
        .catch(() => {
          setUser(null);
          setToken(null);
          localStorage.removeItem("token");
        });
    }
  }, []);

  const handleAuthSuccess = (user: any, token: string) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("token", token);
    setAuthOpen(false);
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <Router>
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <Link to="/" className="logo-link">
              GP
            </Link>
          </div>
          <nav className="main-nav">
            <Link to="/goals" className="nav-link">
              Goal Maker
            </Link>
            <Link to="/preferences" className="nav-link">
              Set Preferences
            </Link>
            <Link to="/calendar" className="nav-link">
              Calendar
            </Link>
            <Link to="/goals" className="get-started-button">
              Get Started
            </Link>
            {user && (
              <button className="auth-header-btn" onClick={handleLogout}>
                Logout
              </button>
            )}
          </nav>
        </header>

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/goals"
              element={
                <RequireAuth user={user}>
                  <GoalMaker />
                </RequireAuth>
              }
            />
            <Route
              path="/preferences"
              element={
                <RequireAuth user={user}>
                  <Preferences />
                </RequireAuth>
              }
            />
            <Route
              path="/calendar"
              element={
                <RequireAuth user={user}>
                  <Calendar />
                </RequireAuth>
              }
            />
            <Route
              path="/auth/callback"
              element={<AuthCallback onAuthSuccess={handleAuthSuccess} />}
            />
          </Routes>
        </main>
        <AuthModal
          isOpen={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </Router>
  );
}

export default App;
