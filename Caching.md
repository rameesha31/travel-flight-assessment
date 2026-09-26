# Caching Strategy

## Live flight search

The `/air/search` page fetches live flight offers from `/api/offers`.

Live fares are not cached because flight prices and availability can change frequently.

The search request uses:

```ts
fetch("http://localhost:3000/api/offers", {
  cache: "no-store",
});