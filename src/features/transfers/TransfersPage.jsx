import React, { useState } from "react";
import transactions from "../transactions/data/transactions.js";

const initialTransfers = transactions
  .filter((transaction) => transaction.type === "Transfer to")
  .map((transaction, index) => ({
    id: `${transaction.date}-${index}`,
    name: transaction.description,
    account: transaction.account,
    date: transaction.date,
    amount: transaction.amount,
    status: transaction.status,
  }));

// Allows a demo transfer to be added and shows recent transfer activity.
export default function TransfersPage() {
  const [transfers, setTransfers] = useState(initialTransfers);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [notice, setNotice] = useState("");

  // Validates the form and adds a local sample transfer to the activity list.
  const handleSubmit = (event) => {
    event.preventDefault();
    const numericAmount = Number(amount);
    if (!recipient.trim() || !Number.isFinite(numericAmount) || numericAmount <= 0) {
      setNotice("Enter a recipient and an amount greater than zero.");
      return;
    }

    setTransfers((items) => [{
      id: `${Date.now()}`,
      name: recipient.trim(),
      account: "New transfer",
      date: new Date().toISOString().slice(0, 10),
      amount: numericAmount,
      status: "Pending",
    }, ...items]);
    setRecipient("");
    setAmount("");
    setNotice("Transfer added to your demo activity.");
  };

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Transfers</h1><p>Send money and review your recent transfers.</p></div></div>
      <div className="transfer-layout">
        <form className="card transfer-form" onSubmit={handleSubmit}>
          <h2>New transfer</h2><p>Enter the recipient and amount to add a sample transfer.</p>
          <label>Recipient name<input className="form-input" value={recipient} onChange={(event) => setRecipient(event.target.value)} placeholder="e.g. Jamie Lee" required /></label>
          <label>Amount<input className="form-input" type="number" min="0.01" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="$0.00" required /></label>
          <button className="overview-primary" type="submit">Add demo transfer</button>
          <span className="form-notice" role="status">{notice}</span>
        </form>
        <section className="card feature-panel transfer-history">
          <div className="overview-panel-heading"><div><h2>Recent transfers</h2><p>Transfer history from your sample account</p></div></div>
          {transfers.map((transfer) => (
            <div className="transfer-row" key={transfer.id}>
              <span className="transfer-avatar">{transfer.name.slice(0, 1).toUpperCase()}</span>
              <span className="overview-activity-name"><strong>{transfer.name}</strong><small>{transfer.account} · {transfer.date}</small></span>
              <span><strong>${transfer.amount.toFixed(2)}</strong><small className={transfer.status === "Failed" ? "fail" : "ok"}>{transfer.status}</small></span>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
