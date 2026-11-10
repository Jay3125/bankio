import React from "react";

const paths = {
  dash: (
    <>
      <rect x="4" y="4" width="6" height="6" rx="1.5" />
      <rect x="14" y="4" width="6" height="6" rx="1.5" />
      <rect x="4" y="14" width="6" height="6" rx="1.5" />
      <rect x="14" y="14" width="6" height="6" rx="1.5" />
    </>
  ),
  chart: <path d="M5 20V10M12 20V4M19 20v-7" />,
  tx: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="3" />
      <path d="M8 10h8M8 14h5" />
    </>
  ),
  inv: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M10 16V8h3a2 2 0 010 4h-3" />
    </>
  ),
  xfer: <path d="M4 9h14l-3-3M20 15H6l3 3" />,
  card: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  rew: <path d="M4 8l4 4 4-6 4 6 4-4-2 10H6z" />,
  sec: (
    <>
      <circle cx="9" cy="14" r="4" />
      <path d="M12 11l6-6M16 7l2 2" />
    </>
  ),
  set: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M18.4 5.6l-2.1 2.1M7.7 16.3l-2.1 2.1" />
    </>
  ),
  sup: (
    <>
      <path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6z" />
      <circle cx="12" cy="11" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </>
  ),
  mail: (
    <>
      <rect x="4" y="6" width="16" height="12" rx="2" />
      <path d="M4 8l8 6 8-6" />
    </>
  ),
  bell: <path d="M6 17V11a6 6 0 0112 0v6l1 1H5zM10 21h4" />,
  filt: <path d="M4 5h16l-6 8v6l-4-2v-4z" />,
  dl: <path d="M12 4v11M7 11l5 5 5-5M5 20h14" />,
  sort: <path d="M8 20V5M4 9l4-4 4 4M16 4v15M12 15l4 4 4-4" />,
};

// Renders the inline SVG path associated with the requested icon name.
export default function Icon({ name, ...props }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}
