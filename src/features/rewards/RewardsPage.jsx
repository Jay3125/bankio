import React, { useState } from "react";

const rewardOptions = [
  { name: "Coffee shop gift card", detail: "$10 gift card", points: 1200, icon: "☕" },
  { name: "Travel credit", detail: "$25 travel credit", points: 2500, icon: "✈" },
  { name: "Cashback boost", detail: "Extra 1% cashback", points: 4000, icon: "↗" },
];

// Shows available points and lets the user redeem sample reward options.
export default function RewardsPage() {
  const [points, setPoints] = useState(4850);
  const [notice, setNotice] = useState("");

  // Redeems a reward when the local sample points balance is sufficient.
  const redeemReward = (reward) => {
    if (points < reward.points) {
      setNotice(`You need ${(reward.points - points).toLocaleString()} more points for ${reward.name}.`);
      return;
    }
    setPoints((balance) => balance - reward.points);
    setNotice(`${reward.name} redeemed. This demo balance has been updated.`);
  };

  return (
    <section className="feature-page">
      <div className="feature-heading"><div><h1>Rewards</h1><p>Turn your everyday banking into something extra.</p></div></div>
      <section className="rewards-hero"><span>YOUR REWARDS BALANCE</span><strong>{points.toLocaleString()} <small>points</small></strong><p>Explore rewards available in the Bankio demo.</p></section>
      <div className="overview-panel-heading rewards-heading"><div><h2>Available rewards</h2><p>Choose a reward to use your points.</p></div></div>
      <div className="reward-grid">
        {rewardOptions.map((reward) => (
          <article className="card reward-card" key={reward.name}>
            <span className="reward-icon" aria-hidden="true">{reward.icon}</span>
            <h3>{reward.name}</h3><p>{reward.detail}</p>
            <div className="reward-cost">{reward.points.toLocaleString()} points</div>
            <button className="overview-primary" onClick={() => redeemReward(reward)}>Redeem</button>
          </article>
        ))}
      </div>
      <p className="form-notice" role="status">{notice}</p>
    </section>
  );
}
