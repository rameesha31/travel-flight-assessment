# Travel.pk Flight Results Page

Frontend assessment project built with Next.js App Router and TypeScript.

The application demonstrates a URL-driven flight results page using local synthetic flight data. It includes filtering, sorting, simulated supplier states, loading/error recovery, accessibility considerations, and different caching strategies for live and static content.

## Setup

Requirements:

- Node.js
- npm

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

The project can be set up and run locally in under 10 minutes.

To verify a production build:

```bash
npm run build
npm start
```

## Quick Review URLs

These URLs allow each supplier state to be tested directly.

### Normal results

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&simulate=ok
```

### Slow / Loading state

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&simulate=slow
```

The supplier response is intentionally delayed so the loading UI can be observed.

### Empty state

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&simulate=empty
```

Returns no offers and displays the empty-results UI.

### Error state

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&simulate=error
```

Returns HTTP 503 and displays the recoverable error state with Retry.

### Partial supplier state

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&simulate=partial
```

Returns available offers while also reporting suppliers that failed.

## URL as State

Search state is stored in URL query parameters rather than separate application state.

Supported parameters include:

- `route`
- `date`
- `pax`
- `cabin`
- `stops`
- `airlines`
- `price`
- `sort`
- `simulate`

This means a search URL can be copied, refreshed, bookmarked, or opened directly while preserving the selected state.

Filters and sorting also update the URL.

Example:

```text
http://localhost:3000/air/search?route=karachi-dubai&date=2026-09-30&pax=2&cabin=economy&stops=0&airlines=Emirates&price=100000&sort=price&simulate=ok
```

## Server and Client Boundary

The flight results page uses server-side data fetching because flight offers are data needed before rendering the results.

Live offer requests use:

```ts
cache: "no-store"
```

Client components are used only where browser interaction is required, such as:

- changing filters
- updating URL parameters
- retrying a failed request
- opening and controlling the mobile filter dialog

This keeps interactive JavaScript limited to the parts of the page that need it.

## Supplier Simulation

The local `/api/offers` Route Handler serves synthetic flight data from:

```text
data/offers.json
```

The `simulate` query parameter makes supplier behavior directly reproducible.

Supported values:

```text
ok
slow
error
empty
partial
```

The normal API response includes an intentional delay to represent real supplier latency.

`partial` represents a realistic case where some suppliers fail while other flight results are still available. The available results remain visible and a non-blocking warning identifies the failed suppliers.

## Filtering and Sorting

The results page supports URL-driven filtering by:

- stops
- airline
- maximum price

Sorting includes:

- price: low to high
- price: high to low
- departure time

Clearing filters removes filter/sort parameters while preserving the original search information.

## Currency and Flight Times

Prices are formatted as Pakistani Rupees using `Intl.NumberFormat`.

Flight timestamps include explicit timezone offsets in the synthetic data so departure and arrival information does not depend on ambiguous timezone values.

## Accessibility

The implementation includes:

- keyboard-accessible form controls
- visible keyboard focus
- labelled flight results list
- accessible buttons and form labels
- mobile filter dialog with keyboard focus trapping
- `Tab` and `Shift + Tab` navigation
- `Escape` support for closing the mobile filter dialog
- responsive layout designed to remain usable at increased browser zoom

A keyboard-only pass should be performed without using the mouse by tabbing through the search form, submitting the search with the keyboard, navigating the result filters, and testing the mobile filter dialog.

## Caching

Live flight results are intentionally not cached because fares and supplier availability can change.

```text
/air/search
```

uses live fetching with `cache: "no-store"`.

The informational route:

```text
/air/flights/karachi-to-dubai
```

uses:

```ts
export const revalidate = 3600;
```

because this content changes much less frequently.

The reasoning and trade-offs are documented in `CACHING.md`.

## Public Page Audit

A Lighthouse audit was performed on the public Travel.pk Karachi-to-Dubai page.

The findings, evidence, affected users, severity, and suggested fixes are documented in:

```text
AUDIT.md
```

## Assessment Files

Important files included in the submission:

```text
README.md
CACHING.md
AUDIT.md
data/offers.json
```


## Known Gaps

- Flight data is synthetic and stored locally rather than coming from real airline suppliers.
- The project does not include real booking or payment functionality.
- The implementation focuses on the flight-results experience.

## Next Steps


- connect the results page to real flight supplier APIs
- add automated accessibility and interaction tests
- add broader test coverage for URL parameter combinations
- improve supplier retry and recovery handling
- add more route and fare data

## Verification

The production build can be checked with:

```bash
npm run build
```

A successful build should complete TypeScript checking, linting, page generation, and production optimization without errors.

