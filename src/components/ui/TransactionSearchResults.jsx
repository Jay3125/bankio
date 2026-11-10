import React from "react";
import searchTransactions from "../../features/transactions/searchTransactions.js";

// Displays matching sample transactions without navigating away from the page.
export default function TransactionSearchResults({ query, onClear }) {
  const results = searchTransactions(query);

  return (
    <section className="card overview-panel search-results" aria-live="polite">
      <div className="overview-panel-heading">
        <div>
          <h2>Search results</h2>
          <p>
            {results.length} {results.length === 1 ? "match" : "matches"} for “{query}”
          </p>
        </div>
        <button className="text-action" type="button" onClick={onClear}>
          Clear search
        </button>
      </div>
      {results.length ? (
        <div className="overview-activity">
          {results.map((transaction) => (
            <div
              className="overview-activity-row"
              key={`${transaction.date}-${transaction.description}`}
            >
              <span className="dot" style={{ background: transaction.color }}>
                {transaction.initials}
              </span>
              <span className="overview-activity-name">
                <strong>{transaction.description}</strong>
                <small>
                  {transaction.category} · {transaction.date} · {transaction.status}
                </small>
              </span>
              <strong className={transaction.status === "Failed" ? "fail" : ""}>
                ${transaction.amount.toFixed(2)}
              </strong>
            </div>
          ))}
        </div>
      ) : (
        <p className="search-empty">No transactions matched your search.</p>
      )}
    </section>
  );
}
