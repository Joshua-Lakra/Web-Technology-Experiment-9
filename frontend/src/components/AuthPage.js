import React, { useState } from "react";
import "./AuthPage.css";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password || (!isLogin && (!fullName || !email || !confirmPassword))) {
      setMessage("⚠️ Please fill all required fields");
      setColor("red");
      return;
    }
    if (!isLogin && password !== confirmPassword) {
      setMessage("❌ Passwords do not match");
      setColor("red");
      return;
    }

    try {
      const endpoint = isLogin ? "login" : "register";
      const payload = isLogin
        ? { username, password }
        : { full_name: fullName, email, username, password };

      const res = await fetch(`http://localhost:5000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(isLogin ? "✅ Logged in successfully!" : "🎉 Registered successfully!");
        setColor("green");
        if (isLogin) window.location.href = "/users";
      } else {
        setMessage(`❌ ${data.error}`);
        setColor("red");
      }
    } catch (err) {
      setMessage("❌ Server error. Try again!");
      setColor("red");
    }
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    setMessage("");
  };

  return (
    <div className="auth-container">
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <>
            <input type="text" placeholder="Full Name" value={fullName} onChange={(e) => setFullName(e.target.value)} />
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </>
        )}
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {!isLogin && <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />}
        <button type="submit">{isLogin ? "Login" : "Register"}</button>
      </form>
      <button className="toggle-btn" onClick={toggleForm}>
        {isLogin ? "New user? Register" : "Already registered? Login"}
      </button>
      {message && <p style={{ color }}>{message}</p>}
    </div>
  );
}
