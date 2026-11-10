import React, { useState } from "react";

const monthlyValues = {
  January: [96, 58, 80, 58, 76, 34, 78],
  February: [70, 62, 55, 80, 50, 66, 72],
  March: [88, 40, 64, 72, 90, 48, 60],
};

const yLabels = [
  "$30.000 - $50.000",
  "$15.000 - $25.000",
  "$7.000 - $10.000",
  "$3.000 - $8.000",
  "$1.000 - $2.500",
  "$1.000 - $2.500",
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

// Renders the monthly chart and updates its bars when the month changes.
export default function MonthlyChart() {
  const [month, setMonth] = useState("January");

  return (
    <div className="chart">
      <div style={{ display: "flex", alignItems: "center" }}>
        <h3 style={{ flex: 1 }}>Monthly Financial</h3>
        <select
          className="sel"
          value={month}
          onChange={(event) => setMonth(event.target.value)}
          aria-label="Month"
        >
          {Object.keys(monthlyValues).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </div>
      <div className="plot">
        <div className="ylab">
          {yLabels.map((label, index) => (
            <span key={`${label}-${index}`}>{label}</span>
          ))}
        </div>
        <div className="area">
          {[0, 20, 40, 60, 80].map((top) => (
            <div key={top} className="gl" style={{ top: `${top}%` }} />
          ))}
          <div className="cols">
            {monthlyValues[month].map((height, index) => (
              <div
                key={`${month}-${index}`}
                className="col"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </div>
        <div className="xl">
          {days.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
