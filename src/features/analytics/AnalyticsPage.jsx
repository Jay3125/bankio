import React, { useState } from "react";
import PageTitleBar from "../../components/ui/PageTitleBar.jsx";
import StatCard from "../../components/ui/StatCard.jsx";
import TransactionSearchResults from "../../components/ui/TransactionSearchResults.jsx";
import ExpenseDonut from "./components/ExpenseDonut.jsx";
import MonthlyChart from "./components/MonthlyChart.jsx";

// Composes the analytics dashboard cards, category chart, and monthly chart.
export default function AnalyticsPage() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  return (
    <>
      <PageTitleBar
        title="Financial Analytics"
        placeholder="Search for a specific transaction or data"
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
          <div className="g1">
            <div className="left">
              <StatCard
                label={<>Total<br />Income</>}
                value="$5,200.00"
                change="+8.5%"
              />
              <StatCard
                label={<>Total<br />Expenses</>}
                value="$3,750.90"
                change="-4.2%"
                isNegative
              />
            </div>
            <div className="card rev">
              <div className="a">
                <div className="rh">
                  <div>
                    <h3>Revenue</h3>
                    <small>This Month</small>
                  </div>
                  <span className="big">$6,742.40</span>
                </div>
                <div className="sv">
                  <small>Total Revenue Savings</small>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-end",
                      justifyContent: "space-between",
                    }}
                  >
                    <span className="n">$3,800</span>
                    <svg
                      width="90"
                      height="44"
                      viewBox="0 0 90 44"
                      fill="none"
                      stroke="#1f7068"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="M0 40L30 34 48 6 58 28 72 40 90 36" />
                    </svg>
                  </div>
                  <div className="y">You’re saving more!</div>
                </div>
              </div>
              <div className="dark">
                <small>Available Savings</small>
                <div className="n">$15,600</div>
                <small>
                  Savings percentage is <b>30.4%</b> of total revenue
                </small>
              </div>
            </div>
          </div>
          <div className="g2">
            <ExpenseDonut />
            <MonthlyChart />
          </div>
        </>
      )}
    </>
  );
}
