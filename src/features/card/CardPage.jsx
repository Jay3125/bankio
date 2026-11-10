import React, { useState } from "react";

// Provides local demo controls for freezing the card and revealing its number.
export default function CardPage({ displayName }) {
  const [frozen, setFrozen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Cards</h1><p>Manage your Bankio debit card.</p></div></div>
      <div className="card-layout">
        <article className={`bank-card${frozen ? " frozen" : ""}`}>
          <div className="bank-card-top"><span>BANKIO</span><span>DEBIT</span></div>
          <div className="bank-card-chip" aria-hidden="true"><span /></div>
          <div className="bank-card-number">{revealed ? "4829 1064 3318 7290" : "••••  ••••  ••••  7290"}</div>
          <div className="bank-card-bottom">
            <span className="bank-card-holder">
              {displayName}
              <small>CARDHOLDER</small>
            </span>
            <span>08/28<small>EXPIRES</small></span>
            <span className="bank-card-mark">VISA</span>
          </div>
          {frozen && <span className="frozen-label">CARD FROZEN</span>}
        </article>
        <section className="card feature-panel card-controls">
          <h2>Card controls</h2><p>Card ending in 7290</p>
          <button className="settings-row" onClick={() => setFrozen((value) => !value)}><span><strong>{frozen ? "Unfreeze card" : "Freeze card"}</strong><small>{frozen ? "Resume card payments" : "Temporarily stop new card payments"}</small></span><span className={`toggle${frozen ? " on" : ""}`} aria-hidden="true" /></button>
          <button className="settings-row" onClick={() => setRevealed((value) => !value)}><span><strong>{revealed ? "Hide card number" : "Show card number"}</strong><small>Card details are demo data</small></span><span aria-hidden="true">→</span></button>
          <p className="form-notice" role="status">{frozen ? "This demo card is frozen." : "Your demo card is active."}</p>
        </section>
      </div>
      <section className="card feature-panel card-spending"><h2>Spending this month</h2><strong>$1,284.35</strong><p>Card purchase activity is sample data.</p><div className="spending-track"><span /></div><small>$1,284.35 of $3,000 monthly limit</small></section>
    </section>
  );
}
