import React, { useState } from "react";

const faqs = [
  ["How do I find a transaction?", "Open Transactions and search by recipient, account, category, or status."],
  ["How do I freeze my card?", "Open Card and switch on Freeze card. In this demo, the change is local to the page."],
  ["Where can I see my spending trends?", "Open Analytics to explore the category breakdown and monthly chart."],
];

// Presents common help topics and a local demo support request form.
export default function SupportPage() {
  const [email, setEmail] = useState("");
  const [question, setQuestion] = useState("");
  const [notice, setNotice] = useState("");

  // Validates and acknowledges the support request without sending account data.
  const handleSubmit = (event) => {
    event.preventDefault();
    setNotice(`Thanks. Your demo support request is ready for ${email}.`);
    setQuestion("");
  };

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Support</h1><p>Find answers or tell us how we can help.</p></div></div>
      <div className="support-layout">
        <section className="card feature-panel faq-panel">
          <h2>Frequently asked questions</h2>
          {faqs.map(([questionTitle, answer]) => (
            <details className="faq-item" key={questionTitle}><summary>{questionTitle}</summary><p>{answer}</p></details>
          ))}
        </section>
        <form className="card feature-panel settings-form" onSubmit={handleSubmit}>
          <h2>Contact support</h2><p>Send a sample request from this demo.</p>
          <label>Email address<input className="form-input" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" required /></label>
          <label>How can we help?<textarea className="form-input support-message" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Describe your question" required /></label>
          <button className="overview-primary" type="submit">Submit request</button>
          <span className="form-notice" role="status">{notice}</span>
        </form>
      </div>
    </section>
  );
}
