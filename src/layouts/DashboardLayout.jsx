import React from "react";
import DashboardHeader from "./DashboardHeader.jsx";
import DashboardSidebar from "./DashboardSidebar.jsx";

// Provides the shared dashboard shell around every active page.
export default function DashboardLayout({
  view,
  setView,
  theme,
  setTheme,
  displayName,
  onSearch,
  children,
}) {
  return (
    <div className="app">
      <DashboardSidebar view={view} setView={setView} />
      <main className="main">
        <DashboardHeader
          theme={theme}
          setTheme={setTheme}
          displayName={displayName}
          onSearch={onSearch}
          onNavigate={setView}
        />
        {children}
      </main>
    </div>
  );
}
