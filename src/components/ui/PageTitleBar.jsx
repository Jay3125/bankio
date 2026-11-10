import React, { useCallback, useRef, useState } from "react";
import Icon from "./Icon.jsx";
import useDismissableLayer from "../../hooks/useDismissableLayer.js";

// Shows a page title, controlled search field, and filter action.
export default function PageTitleBar({
  title,
  placeholder,
  query,
  setQuery,
  filterStatus,
  setFilterStatus,
  filterCategory,
  setFilterCategory,
  onSubmit,
}) {
  const [filterOpen, setFilterOpen] = useState(false);
  const filterRef = useRef(null);
  const searchInputRef = useRef(null);
  const closeFilter = useCallback(() => setFilterOpen(false), []);
  useDismissableLayer(filterRef, filterOpen, closeFilter);
  const canFilter = Boolean(setFilterStatus && setFilterCategory);

  return (
    <div className="bar">
      <h1>{title}</h1>
      <label className="search">
        <input
          ref={searchInputRef}
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onSubmit?.(query);
          }}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        <button
          className="search-submit"
          type="button"
          aria-label="Search"
          onClick={() => {
            if (onSubmit) {
              onSubmit(query);
            } else {
              searchInputRef.current?.focus();
            }
          }}
        >
          <Icon name="search" />
        </button>
      </label>
      {canFilter && (
        <div className="filter-control" ref={filterRef}>
          <button
            className={`fl${filterOpen ? " active" : ""}`}
            aria-label="Filter transactions"
            aria-expanded={filterOpen}
            aria-haspopup="dialog"
            onClick={() => setFilterOpen((open) => !open)}
          >
            <Icon name="filt" />
          </button>
          {filterOpen && (
            <div className="filter-menu" role="dialog" aria-label="Transaction filters">
              <strong>Filter transactions</strong>
              <label>
                Status
                <select
                  className="sel"
                  value={filterStatus}
                  onChange={(event) => setFilterStatus(event.target.value)}
                >
                  <option value="all">All statuses</option>
                  <option value="Completed">Completed</option>
                  <option value="Failed">Failed</option>
                </select>
              </label>
              <label>
                Category
                <select
                  className="sel"
                  value={filterCategory}
                  onChange={(event) => setFilterCategory(event.target.value)}
                >
                  <option value="all">All categories</option>
                  <option value="Family & Friends">Family &amp; Friends</option>
                  <option value="Subscriptions">Subscriptions</option>
                </select>
              </label>
              <button
                className="filter-clear"
                type="button"
                onClick={() => {
                  setFilterStatus("all");
                  setFilterCategory("all");
                }}
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
