import React from "react";

// Provides a clear recovery route when the current URL is not recognized.
export default function NotFoundPage({ onNavigate }) {
  return (
    <main className="not-found-page">
      <section className="not-found-panel">
        <span className="not-found-code">404</span>
        <h1>Page not found</h1>
        <p>The page you’re looking for doesn’t exist or may have moved.</p>
        <button
          className="overview-primary"
          type="button"
          onClick={() => onNavigate("dashboard")}
        >
          Back to dashboard
        </button>
      </section>
    </main>
  );
}
