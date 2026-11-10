import React, { useCallback, useRef, useState } from "react";
import Icon from "../components/ui/Icon.jsx";
import useDismissableLayer from "../hooks/useDismissableLayer.js";

// Renders the dashboard welcome message and account action buttons.
export default function DashboardHeader({
  theme,
  setTheme,
  displayName,
  onSearch,
  onNavigate,
}) {
  const [openMenu, setOpenMenu] = useState("");
  const openMenuRef = useRef(null);
  const closeMenu = useCallback(() => setOpenMenu(""), []);
  useDismissableLayer(openMenuRef, Boolean(openMenu), closeMenu);
  const initials = displayName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  // Opens the requested header popover or closes it when selected again.
  const toggleMenu = (menu) => {
    setOpenMenu((current) => (current === menu ? "" : menu));
  };

  // Focuses the current page search or returns to the dashboard search.
  const focusPageSearch = () => {
    setOpenMenu("");
    const searchInput = document.querySelector(".bar .search input");
    if (searchInput) {
      searchInput.focus();
      return;
    }

    onSearch();
    window.setTimeout(() => {
      document.querySelector(".bar .search input")?.focus();
    }, 0);
  };

  return (
    <header className="top">
      <div className="top-copy">
        <h2 title={`Welcome, ${displayName}!`}>Welcome, {displayName}!</h2>
        <p>Effortlessly manage your finances with real-time insights</p>
      </div>
      <div className="top-actions">
        <div className="header-action">
          <button className="ic" aria-label="Focus page search" onClick={focusPageSearch}>
            <Icon name="search" />
          </button>
        </div>
        <div className="header-action">
          <div
            className="header-action-content"
            ref={openMenu === "messages" ? openMenuRef : null}
          >
            <button
              className="ic"
              aria-label="Messages"
              aria-expanded={openMenu === "messages"}
              aria-haspopup="dialog"
              onClick={() => toggleMenu("messages")}
            >
              <Icon name="mail" />
              <i />
            </button>
            {openMenu === "messages" && (
              <div className="header-popover" role="dialog" aria-label="Messages">
                <strong>Messages</strong>
                <p>You’re all caught up. New messages will appear here.</p>
              </div>
            )}
          </div>
        </div>
        <div className="header-action">
          <div
            className="header-action-content"
            ref={openMenu === "notifications" ? openMenuRef : null}
          >
            <button
              className="ic"
              aria-label="Notifications"
              aria-expanded={openMenu === "notifications"}
              aria-haspopup="dialog"
              onClick={() => toggleMenu("notifications")}
            >
              <Icon name="bell" />
            </button>
            {openMenu === "notifications" && (
              <div className="header-popover" role="dialog" aria-label="Notifications">
                <strong>Notifications</strong>
                <p>You’re all caught up. Account updates will appear here.</p>
              </div>
            )}
          </div>
        </div>
        <div className="header-action">
          <div
            className="header-action-content"
            ref={openMenu === "account" ? openMenuRef : null}
          >
            <button
              className="av"
              aria-label="Account menu"
              aria-expanded={openMenu === "account"}
              aria-haspopup="menu"
              onClick={() => toggleMenu("account")}
            >
              {initials}
            </button>
            {openMenu === "account" && (
              <div className="header-popover account-popover" role="menu">
                <strong>{displayName}</strong>
                <span className="account-email">Personal account</span>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                >
                  Switch to {theme === "dark" ? "light" : "dark"} theme
                </button>
                <span className="account-menu-label">Authentication</span>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpenMenu("");
                    onNavigate("login");
                  }}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setOpenMenu("");
                    onNavigate("register");
                  }}
                >
                  Create account
                </button>
                <button type="button" role="menuitem" onClick={() => setOpenMenu("")}>
                  Close menu
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
