import React from "react";

const categories = [
  { name: "Housing", value: 2500, percent: 40, color: "#1f7068" },
  { name: "Transportation", value: 1800, percent: 35, color: "#0b4a40" },
  { name: "Food & Dining", value: 1300, percent: 25, color: "#a9c7c2" },
];

// Draws the category breakdown as an SVG donut and a matching legend.
export default function ExpenseDonut() {
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="card donut">
      <div className="dw">
        <svg viewBox="0 0 260 240" width="260" height="240" aria-hidden="true">
          <g transform="translate(130 120) rotate(-90)">
            {categories.map(({ name, percent, color }) => {
              const length = (circumference * percent) / 100 - 8;
              const circle = (
                <circle
                  key={name}
                  r={radius}
                  fill="none"
                  stroke={color}
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${length} ${circumference}`}
                  strokeDashoffset={(-offset * circumference) / 100}
                />
              );
              offset += percent;
              return circle;
            })}
          </g>
        </svg>
        <div className="ctr">
          Expenditure
          <br />
          Category
        </div>
        <span className="tag" style={{ left: 0, top: 42 }}>40%</span>
        <span className="tag" style={{ right: 0, top: 80 }}>25%</span>
        <span className="tag" style={{ left: 110, bottom: 0 }}>35%</span>
      </div>
      <div className="leg">
        {categories.map(({ name, value, percent, color }) => (
          <div key={name}>
            <i style={{ background: color }} />
            {name}
            <span className="v" style={{ marginLeft: "auto" }}>
              ${value.toLocaleString()}
            </span>
            <span className="p">{percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}
