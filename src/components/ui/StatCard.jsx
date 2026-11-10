import React from "react";

// Displays a financial metric, its month-over-month change, and direction.
export default function StatCard({ label, value, change, isNegative = false }) {
  return (
    <div className="card stat">
      <span className="lb">{label}</span>
      <span className="num">{value}</span>
      <span className={`pill${isNegative ? " bad" : ""}`}>{change}</span>
      <span className={`arr${isNegative ? " dn" : ""}`}>
        {isNegative ? "↓" : "↑"}
      </span>
      <span className="lm">
        Last
        <br />
        Month
      </span>
    </div>
  );
}
