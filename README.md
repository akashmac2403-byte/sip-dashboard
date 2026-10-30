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

Default retirement SIP targets are UTI Nifty 50 30%, Parag Parikh Flexi Cap 25%, Invesco India Mid Cap 20%, Nippon India Small Cap 15%, and SBI Gold 10%. The default ₹15,000 monthly SIP steps up by 10% every six months; this interval is reflected in the projection page too.

## Scoring

`lib/scoring.ts` contains pure functions for drawdown, DMA guard, quality comparison and tactical allocation. The UI displays the resulting signal and reasons. Portfolio data is held in localStorage and supports JSON export/import.

## Data and limitations

The free MFAPI endpoint is cached for six hours. In case of request failures the route returns a stale/unavailable marker and the UI shows a stale data state; there is no persistent server database in this personal version. Logged contributions are stored as amount/date pairs. Holdings estimate units from the nearest available transaction-date NAV and calculate current value and XIRR from the recorded cash flows. Historical NAV availability can limit the result.

Projection outputs are illustrative. Educational tool, not investment advice. Past performance does not guarantee future returns.


## Fund availability update (October 2026)

- **HDFC Small Cap Fund – Direct Growth** (MFAPI scheme code `130503`) replaces Nippon India Small Cap Fund for new one-time monthly purchases. HDFC's official fund page offers a lump-sum route. Nippon's restriction applies to fresh lump sums; its SIP/STP limits are separate.
- **UTI Gold ETF Fund of Fund – Direct Growth** (MFAPI scheme code `150714`) is tracked as your existing gold mutual-fund holding. UTI has temporarily paused fresh lump-sum purchases and new SIP/STP registrations from October 16, 2026. The dashboard holds the configured gold share aside rather than recommending an unavailable purchase. Existing units and pre-registered SIPs can still be tracked.
- Availability can change. Check UTI's latest notice and order acceptance in Groww before investing. These are category substitutes, not a prediction of better performance.
