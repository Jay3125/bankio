import React, { useState } from "react";

// Renders the local demo login or registration form without storing credentials.
export default function AuthPage({ mode, onNavigate, onComplete }) {
  const [name, setName] = useState("");

  // Completes the demo form flow and sends a registration name to the app.
  const handleSubmit = (event) => {
    event.preventDefault();
    onComplete(mode === "register" ? name.trim() : "");
  };

  const isRegistration = mode === "register";

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <button className="auth-brand" type="button" onClick={() => onNavigate("dashboard")}>
          <span className="auth-brand-mark" aria-hidden="true">B</span>
          Bankio
        </button>
        <h1>{isRegistration ? "Create your account" : "Welcome back"}</h1>
        <p className="auth-description">
          {isRegistration
            ? "Set up a profile to explore the Bankio demo."
            : "Sign in to continue to your Bankio demo."}
        </p>
        <p className="auth-demo-note">
          Demo only. No account is created and credentials are not sent or saved.
        </p>
        <form className="auth-form" onSubmit={handleSubmit}>
          {isRegistration && (
            <label>
              Full name
              <input
                className="form-input"
                type="text"
                autoComplete="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>
          )}
          <label>
            Email address
            <input
              className="form-input"
              type="email"
              autoComplete="email"
              required
            />
          </label>
          <label>
            Password
            <input
              className="form-input"
              type="password"
              autoComplete={isRegistration ? "new-password" : "current-password"}
              minLength={8}
              required
            />
          </label>
          <button className="overview-primary auth-submit" type="submit">
            {isRegistration ? "Create account" : "Sign in"}
          </button>
        </form>
        <p className="auth-switch">
          {isRegistration ? "Already have an account?" : "New to Bankio?"}{" "}
          <button
            className="auth-link"
            type="button"
            onClick={() => onNavigate(isRegistration ? "login" : "register")}
          >
            {isRegistration ? "Sign in" : "Create an account"}
          </button>
        </p>
        <button
          className="auth-back"
          type="button"
          onClick={() => onNavigate("dashboard")}
        >
          Continue to dashboard
        </button>
      </section>
    </main>
  );
}
