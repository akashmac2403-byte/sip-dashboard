# SIP Atelier

A mobile-first personal SIP dashboard built with Next.js App Router, TypeScript, Tailwind, Recharts and Framer Motion. NAV history is fetched server-side through `/api/nav/[code]` and revalidated every 6 hours. Portfolio entries and settings are local to the browser.

## Setup

```bash
npm install
npm run dev
```

Run `npm test` for scoring tests and `npm run build` for a production build.

## Fund configuration

Edit `lib/funds.ts` to change names, roles, target weights, category and MFAPI scheme codes. Codes are intended to point to Direct Plan – Growth options. Verify a code with `https://api.mfapi.in/mf/search?q=<name>` and inspect its scheme name before using it.

## Scoring

`lib/scoring.ts` contains pure functions for drawdown, DMA guard, quality comparison and tactical allocation. The UI displays the resulting signal and reasons. Portfolio data is held in localStorage and supports JSON export/import.

## Data and limitations

The free MFAPI endpoint is cached for six hours. In case of request failures the route returns a stale/unavailable marker and the UI shows a stale data state; there is no persistent server database in this personal version. Logged contributions are stored as amount/date pairs. Holdings estimate units from the nearest available transaction-date NAV and calculate current value and XIRR from the recorded cash flows. Historical NAV availability can limit the result.

Projection outputs are illustrative. Educational tool, not investment advice. Past performance does not guarantee future returns.
