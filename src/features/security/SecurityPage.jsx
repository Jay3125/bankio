import React, { useState } from "react";

// Lets the user toggle local demo security preferences.
export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(true);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [biometrics, setBiometrics] = useState(false);

  const options = [
    ["Two-factor authentication", "Add an extra verification step at sign-in.", twoFactor, setTwoFactor],
    ["Login alerts", "Get notified when there is a new account sign-in.", loginAlerts, setLoginAlerts],
    ["Biometric sign-in", "Use your device biometrics to sign in.", biometrics, setBiometrics],
  ];

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Security</h1><p>Manage how you protect your Bankio account.</p></div><span className="security-status">● Secure account</span></div>
      <section className="card feature-panel settings-panel">
        <h2>Sign-in and alerts</h2><p>Changes here are stored for this page session only.</p>
        {options.map(([title, detail, enabled, setEnabled]) => (
          <button className="settings-row" key={title} onClick={() => setEnabled((value) => !value)} aria-pressed={enabled}>
            <span><strong>{title}</strong><small>{detail}</small></span><span className={`toggle${enabled ? " on" : ""}`} aria-hidden="true" />
          </button>
        ))}
      </section>
      <section className="card feature-panel session-panel"><span><strong>Current session</strong><small>This browser · Active now</small></span><span className="feature-badge">Protected</span></section>
    </section>
  );
}
