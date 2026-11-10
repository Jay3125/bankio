import React, { useState } from "react";

// Manages the saved theme preference and local profile display fields.
export default function SettingsPage({ theme, setTheme, displayName, setDisplayName }) {
  const [name, setName] = useState(displayName);
  const [saved, setSaved] = useState("");

  // Saves the profile name locally and reports the result.
  const handleSubmit = (event) => {
    event.preventDefault();
    const updatedName = name.trim();
    setDisplayName(updatedName);
    setSaved(`Preferences saved for ${updatedName}.`);
  };

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Settings</h1><p>Customize your account and dashboard preferences.</p></div></div>
      <div className="settings-grid">
        <form className="card feature-panel settings-form" onSubmit={handleSubmit}>
          <h2>Profile</h2><p>Your display name in the dashboard.</p>
          <label>Display name<input className="form-input" value={name} onChange={(event) => setName(event.target.value)} required /></label>
          <button className="overview-primary" type="submit">Save profile</button>
          <span className="form-notice" role="status">{saved}</span>
        </form>
        <section className="card feature-panel settings-form">
          <h2>Appearance</h2><p>Choose how Bankio looks on this device.</p>
          <label>Color theme
            <select className="sel" value={theme} onChange={(event) => setTheme(event.target.value)} aria-label="Color theme">
              <option value="system">Use device setting</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </label>
          <span className="form-notice">Your theme preference is saved in this browser.</span>
        </section>
      </div>
    </section>
  );
}
