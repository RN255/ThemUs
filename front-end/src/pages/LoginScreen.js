import React from "react";

export default function LoginScreen() {
  // direct to google OAuth
  const handleLogin = () => {
    window.location.href = "https://themus.onrender.com/auth/google";
  };

  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>Welcome to ThemUs</h1>
      <p>Please sign in to continue.</p>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}
