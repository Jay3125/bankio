# Bankio Financial Dashboard

A responsive financial dashboard built with React and Vite. It includes an analytics overview, transaction activity, reusable interface components, responsive styling, and light/dark theme support.

## Requirements

- Node.js 18 or newer
- npm

## Getting started

Install dependencies and start the development server:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run build` | Create the production build in `dist/` |
| `npm run preview` | Preview the production build locally |

## Project structure

```text
src/
├── app/                 # App state and page selection
├── assets/              # Static assets, including the Bankio mark
├── components/ui/       # Reusable UI controls and metric cards
├── features/
│   ├── auth/            # Demo login and registration screens
│   ├── analytics/       # Financial analytics and charts
│   ├── card/            # Card controls
│   ├── dashboard/       # Account overview
│   ├── investments/     # Portfolio and holdings
│   ├── rewards/         # Points and reward redemption
│   ├── security/        # Sign-in and security settings
│   ├── settings/        # Profile and appearance preferences
│   ├── support/         # FAQs and support request form
│   └── transactions/    # Transaction search, filters, and exports
├── hooks/               # Shared React hooks
├── layouts/             # Dashboard shell, header, and sidebar
├── pages/               # Shared pages, including the 404 view
└── styles/              # Global and dashboard stylesheets
```

## Dashboard features

- Dashboard overview with recent activity and shortcuts
- Analytics summary, category breakdown, and monthly chart
- Dedicated Investments, Transfers, Card, Rewards, Security, Settings, and Support pages
- Transaction search, month selection, status/category filtering, and sorting
- CSV and PDF transaction exports
- Responsive sidebar navigation and workspace menu
- Account, messages, and notification menus
- Light and dark themes, with the selected theme saved in browser storage
- Demo login and registration routes, plus a page-not-found view
- Login and registration are available from the account avatar menu
- Dashboard and analytics searches show local results without changing pages
- The profile display name is shared between Settings and the card preview

Login and registration are front-end demo flows only; no account or credential data is sent or saved. Interactive account actions use local demo data and browser state; no backend or real-money transfer integration is configured.

## Data

Transaction rows and monthly chart values are sample data stored in the `src/features/transactions/data/` and `src/features/analytics/components/` directories.
