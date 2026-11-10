import React, { useState } from "react";
import PageTitleBar from "../../components/ui/PageTitleBar.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import TransactionSearchResults from "../../components/ui/TransactionSearchResults.jsx";
import transactions from "../transactions/data/transactions.js";

const recentTransactions = [...transactions].slice(0, 4);

// Shows a concise financial snapshot and shortcuts to detailed dashboard pages.
export default function DashboardPage({ onNavigate }) {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  return (
    <>
      <PageTitleBar
        title="Your Financial Overview"
        placeholder="Search transactions"
        query={query}
        setQuery={setQuery}
        onSubmit={setSubmittedQuery}
      />
      {submittedQuery.trim() ? (
        <TransactionSearchResults
          query={submittedQuery}
          onClear={() => {
            setSubmittedQuery("");
            setQuery("");
          }}
        />
      ) : (
        <>
          <section className="overview-welcome">
            <div>
              <span className="overview-eyebrow">PERSONAL ACCOUNT</span>
              <h2>Your money, all in one place.</h2>
              <p>Here’s a quick look at your finances for February.</p>
            </div>
            <button className="overview-primary" onClick={() => onNavigate("tx")}>
              View transactions
            </button>
          </section>
          <div className="g3 overview-stats">
            <StatCard label={<>Total<br />Balance</>} value="$19,400.00" change="+6.2%" />
            <StatCard label={<>Monthly<br />Income</>} value="$5,200.00" change="+8.5%" />
            <StatCard label={<>Monthly<br />Spending</>} value="$3,750.90" change="-4.2%" isNegative />
          </div>
        </>
      )}
      {!submittedQuery.trim() && (
        <div className="overview-grid">
          <section className="card overview-panel">
            <div className="overview-panel-heading">
              <div>
                <h2>Recent activity</h2>
                <p>Your latest account transactions</p>
              </div>
              <button className="text-action" onClick={() => onNavigate("tx")}>
                View all
              </button>
            </div>
            <div className="overview-activity">
              {recentTransactions.map((transaction) => (
                <div className="overview-activity-row" key={`${transaction.date}-${transaction.description}`}>
                  <span className="dot" style={{ background: transaction.color }}>
                    {transaction.initials}
                  </span>
                  <span className="overview-activity-name">
                    <strong>{transaction.description}</strong>
                    <small>{transaction.category} · {transaction.date}</small>
                  </span>
                  <strong className={transaction.status === "Failed" ? "fail" : ""}>
                    ${transaction.amount.toFixed(2)}
                  </strong>
                </div>
              ))}
            </div>
          </section>
          <section className="card overview-shortcuts">
            <h2>Explore your finances</h2>
            <p>Go to a section to see more account details.</p>
            {[
              ["Analytics", "analytics", "Income, spending, and trends"],
              ["Investments", "investments", "Portfolio and holdings"],
              ["Transfers", "transfers", "Send and review transfers"],
              ["Rewards", "rewards", "Points and available benefits"],
            ].map(([label, target, detail]) => (
              <button key={target} onClick={() => onNavigate(target)}>
                <span><strong>{label}</strong><small>{detail}</small></span>
                <span aria-hidden="true">→</span>
              </button>
            ))}
          </section>
        </div>
      )}
    </>
  );
}
