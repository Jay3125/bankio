import React, { useEffect, useState } from "react";
import DashboardPage from "../features/dashboard/DashboardPage.jsx";
import AnalyticsPage from "../features/analytics/AnalyticsPage.jsx";
import InvestmentsPage from "../features/investments/InvestmentsPage.jsx";
import TransfersPage from "../features/transfers/TransfersPage.jsx";
import CardPage from "../features/card/CardPage.jsx";
import RewardsPage from "../features/rewards/RewardsPage.jsx";
import SecurityPage from "../features/security/SecurityPage.jsx";
import SettingsPage from "../features/settings/SettingsPage.jsx";
import SupportPage from "../features/support/SupportPage.jsx";
import TransactionsPage from "../features/transactions/TransactionsPage.jsx";
import AuthPage from "../features/auth/AuthPage.jsx";
import NotFoundPage from "../pages/NotFoundPage.jsx";
import DashboardLayout from "../layouts/DashboardLayout.jsx";

const routes = {
  "/": "dashboard",
  "/dashboard": "dashboard",
  "/analytics": "analytics",
  "/transactions": "tx",
  "/investments": "investments",
  "/transfers": "transfers",
  "/card": "card",
  "/rewards": "rewards",
  "/security": "security",
  "/settings": "settings",
  "/support": "support",
  "/login": "login",
  "/register": "register",
};

const paths = {
  dashboard: "/",
  analytics: "/analytics",
  tx: "/transactions",
  investments: "/investments",
  transfers: "/transfers",
  card: "/card",
  rewards: "/rewards",
  security: "/security",
  settings: "/settings",
  support: "/support",
  login: "/login",
  register: "/register",
};

// Resolves the current browser path to a page or the not-found state.
function resolveRoute(pathname) {
  const normalizedPath = pathname.replace(/\/+$/, "") || "/";
  return routes[normalizedPath] || "not-found";
}

// Tracks the selected dashboard view and displays the matching page.
export default function App() {
  const [view, setView] = useState(() => resolveRoute(window.location.pathname));
  const [displayName, setDisplayName] = useState("Aubrey Sabina");
  const [theme, setTheme] = useState(
    () => window.localStorage.getItem("bankio-theme") || "system",
  );

  // Navigates to a page and keeps the address bar in sync with app state.
  const navigate = (nextView) => {
    const nextPath = paths[nextView];
    if (!nextPath) {
      setView("not-found");
      return;
    }

    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setView(nextView);
  };

  useEffect(() => {
    if (theme === "system") {
      delete document.documentElement.dataset.theme;
      window.localStorage.removeItem("bankio-theme");
      return;
    }

    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("bankio-theme", theme);
  }, [theme]);

  useEffect(() => {
    const handlePopState = () => setView(resolveRoute(window.location.pathname));
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  if (view === "login" || view === "register") {
    return (
      <AuthPage
        mode={view}
        onNavigate={navigate}
        onComplete={(name) => {
          if (name) setDisplayName(name);
          navigate("dashboard");
        }}
      />
    );
  }

  if (view === "not-found") {
    return <NotFoundPage onNavigate={navigate} />;
  }

  let page;
  switch (view) {
    case "tx":
      page = <TransactionsPage />;
      break;
    case "dashboard":
      page = <DashboardPage onNavigate={navigate} />;
      break;
    case "analytics":
      page = <AnalyticsPage />;
      break;
    case "investments":
      page = <InvestmentsPage />;
      break;
    case "transfers":
      page = <TransfersPage />;
      break;
    case "card":
      page = <CardPage displayName={displayName} />;
      break;
    case "rewards":
      page = <RewardsPage />;
      break;
    case "security":
      page = <SecurityPage />;
      break;
    case "settings":
      page = (
        <SettingsPage
          theme={theme}
          setTheme={setTheme}
          displayName={displayName}
          setDisplayName={setDisplayName}
        />
      );
      break;
    case "support":
      page = <SupportPage />;
      break;
    default:
      page = <NotFoundPage onNavigate={navigate} />;
  }

  return (
    <DashboardLayout
      view={view}
      setView={navigate}
      theme={theme}
      setTheme={setTheme}
      displayName={displayName}
      onSearch={() => navigate("dashboard")}
    >
      {page}
    </DashboardLayout>
  );
}
