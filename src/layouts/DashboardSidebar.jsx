import React, { useCallback, useRef, useState } from "react";
import Icon from "../components/ui/Icon.jsx";
import bankioMark from "../assets/bankio-mark.svg";
import useDismissableLayer from "../hooks/useDismissableLayer.js";

const mainItems = [
  ["Dashboard", "dash", "dashboard"],
  ["Analytics", "chart", "analytics"],
  ["Transactions", "tx", "tx"],
  ["Investments", "inv", "investments"],
  ["Transfers", "xfer", "transfers"],
  ["Card", "card", "card"],
  ["Rewards", "rew", "rewards"],
];

const otherItems = [
  ["Security", "sec", "security"],
  ["Settings", "set", "settings"],
  ["Support", "sup", "support"],
];

// Displays dashboard navigation and switches between the available pages.
export default function DashboardSidebar({ view, setView }) {
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const workspaceRef = useRef(null);
  const closeWorkspace = useCallback(() => setWorkspaceOpen(false), []);
  useDismissableLayer(workspaceRef, workspaceOpen, closeWorkspace);

  return (
    <aside className="side">
      <div className="workspace-picker" ref={workspaceRef}>
        <button
          className="logo"
          type="button"
          aria-expanded={workspaceOpen}
          aria-haspopup="menu"
          onClick={() => setWorkspaceOpen((open) => !open)}
        >
          <img src={bankioMark} alt="" />
          Bankio
        </button>
        {workspaceOpen && (
          <div className="workspace-menu" role="menu">
            <span className="workspace-label">CURRENT WORKSPACE</span>
            <span className="workspace-name">Bankio Financial</span>
            <button
              type="button"
              role="menuitem"
              onClick={() => setWorkspaceOpen(false)}
            >
              Close menu
            </button>
          </div>
        )}
      </div>
      <p className="grp">Main menu</p>
      <nav className="nav m" aria-label="Main menu">
        {mainItems.map(([label, icon, target]) => (
          <button
            key={label}
            className={view === target ? "on" : ""}
            onClick={() => setView(target)}
            aria-current={view === target ? "page" : undefined}
          >
            <Icon name={icon} />
            {label}
          </button>
        ))}
      </nav>
      <p className="grp o">Others</p>
      <nav className="nav o" aria-label="Other">
        {otherItems.map(([label, icon, target]) => (
          <button
            key={label}
            type="button"
            className={view === target ? "on" : ""}
            onClick={() => setView(target)}
            aria-current={view === target ? "page" : undefined}
          >
            <Icon name={icon} />
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
