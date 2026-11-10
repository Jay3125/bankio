import React, { useState } from "react";

const holdings = [
  { symbol: "AAPL", name: "Apple Inc.", shares: "12 shares", value: 2310.24, change: "+4.8%", up: true },
  { symbol: "MSFT", name: "Microsoft Corp.", shares: "8 shares", value: 3344.80, change: "+2.3%", up: true },
  { symbol: "VTI", name: "Vanguard Total Market", shares: "15 shares", value: 3912.15, change: "+1.6%", up: true },
  { symbol: "BND", name: "Vanguard Bond ETF", shares: "20 shares", value: 1450.60, change: "-0.4%", up: false },
];

const performance = { "1M": "+2.4%", "6M": "+7.8%", "1Y": "+12.6%" };

// Displays a portfolio snapshot and changes the visible performance period.
export default function InvestmentsPage() {
  const [period, setPeriod] = useState("1Y");

  return (
    <section className="feature-page">
      <div className="feature-heading">
        <div><h1>Investments</h1><p>Track your portfolio and explore your holdings.</p></div>
        <label className="field-inline">Performance
          <select className="sel" value={period} onChange={(event) => setPeriod(event.target.value)} aria-label="Performance period">
            {Object.keys(performance).map((range) => <option key={range}>{range}</option>)}
          </select>
        </label>
      </div>
      <div className="investment-hero">
        <div><span>PORTFOLIO VALUE</span><strong>$11,017.79</strong><small>Across 4 investments</small></div>
        <div className="investment-return"><span>{period} return</span><strong>{performance[period]}</strong><small>Compared with previous period</small></div>
      </div>
      <section className="card feature-panel">
        <div className="overview-panel-heading"><div><h2>Your holdings</h2><p>Sample portfolio values</p></div><span className="feature-badge">Updated just now</span></div>
        <div className="feature-table investment-table">
          <div className="feature-table-head"><span>Investment</span><span>Shares</span><span>Market value</span><span>Change</span></div>
          {holdings.map((holding) => (
            <div className="feature-table-row" key={holding.symbol}>
              <span className="holding-name"><strong>{holding.symbol}</strong><small>{holding.name}</small></span>
              <span>{holding.shares}</span><strong>${holding.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}</strong>
              <strong className={holding.up ? "ok" : "fail"}>{holding.change}</strong>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
}
