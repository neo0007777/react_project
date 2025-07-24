import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../AuthContext";

const cardStyle = {
  width: 380,
  padding: 32,
  borderRadius: 10,
  boxShadow: "0 2px 8px rgba(0,0,0,0.07)",
  background: "#fff",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #e0e0e0"
};

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  margin: "10px 0 20px 0",
  borderRadius: 6,
  border: "1.5px solid #61dafb",
  fontSize: 16,
  outline: "none",
  background: "#f8f9fa",
  transition: "border 0.3s"
};

const buttonStyle = {
  width: "100%",
  padding: 12,
  borderRadius: 6,
  border: "none",
  background: "#61dafb",
  color: "#1a1a1a",
  fontWeight: "bold",
  fontSize: 18,
  cursor: "pointer",
  marginTop: 10,
  transition: "background 0.3s, transform 0.2s"
};

const toggleStyle = {
  marginTop: 18,
  color: "#1a1a1a",
  cursor: "pointer",
  fontWeight: "bold",
  textDecoration: "underline",
  background: "none",
  border: "none",
  fontSize: 16
};

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        setSuccess("Logged in successfully!");
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
        setSuccess("Account created successfully!");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8f9fa" }}>
      <style>{`
        .auth-header { font-size: 2rem; font-weight: bold; margin-bottom: 0.5rem; color: #1a1a1a; letter-spacing: 1px; font-family: inherit; }
        .auth-subtitle { color: #4fa8c7; margin-bottom: 1.5rem; font-size: 1.1rem; }
        .auth-toggle-btn:hover { color: #61dafb; }
        .auth-btn:hover { background: #4fa8c7; transform: translateY(-2px) scale(1.03); }
        .auth-error { color: #e74c3c; margin-bottom: 10px; font-weight: bold; }
        .auth-success { color: #27ae60; margin-bottom: 10px; font-weight: bold; }
      `}</style>
      <div style={cardStyle}>
        <div className="auth-header">{isLogin ? "Login" : "Sign Up"}</div>
        <div className="auth-subtitle">
          {isLogin ? "Login to access Stock Insight Hub" : "Sign up to join Stock Insight Hub"}
        </div>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            placeholder="Email"
            style={inputStyle}
            autoComplete="username"
          />
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            placeholder="Password"
            style={inputStyle}
            autoComplete={isLogin ? "current-password" : "new-password"}
          />
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}
          <button type="submit" className="auth-btn" style={buttonStyle} disabled={loading}>
            {loading ? (isLogin ? "Logging in..." : "Signing up...") : (isLogin ? "Login" : "Sign Up")}
          </button>
        </form>
        <button
          className="auth-toggle-btn"
          style={toggleStyle}
          onClick={() => setIsLogin((prev) => !prev)}
        >
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default Auth; 