# Caching Strategy

This project uses different caching strategies for live flight results and static route content.

## Live Flight Results — Not Cached

Route:

```text
/air/search
```

Flight offers are fetched with:

```ts
cache: "no-store"
```

The results are intentionally not cached because flight fares and supplier availability are treated as live data.

The search page also needs to respond correctly to URL parameters such as filters, sorting, and supplier simulation states.

Examples include:

```text
simulate=ok
simulate=slow
simulate=error
simulate=empty
simulate=partial
```

Using `no-store` ensures a new request is made when the page needs fresh offer data.

## Static Route Content — Cached

Route:

```text
/air/flights/karachi-to-dubai
```

This page uses:

```ts
export const revalidate = 3600;
```

This allows the page to be cached and regenerated after a one-hour revalidation window.

The page contains informational route content rather than live fares, so it does not need to be regenerated on every request.

## Why They Are Different

The two pages contain different types of information.

| Page | Strategy | Reason |
| --- | --- | --- |
| `/air/search` | `no-store` | Flight offers and supplier responses are treated as live data |
| `/air/flights/karachi-to-dubai` | `revalidate = 3600` | Informational route content changes less frequently |

## What Would Break If Reversed?

### If flight results were cached

Caching `/air/search` could cause users to receive stale fares or outdated supplier results.

It could also make simulated supplier states less representative of a fresh supplier request.

For example, a previous successful response should not be reused when testing an error, empty, slow, or partial supplier response.

### If static route content were not cached

Using `no-store` for `/air/flights/karachi-to-dubai` would force the server to regenerate content on every request even though the information changes infrequently.

That would add unnecessary server work without providing a meaningful freshness benefit.

## Summary

Live flight results prioritize freshness:

```text
/air/search → no-store
```

Static informational content prioritizes reuse:

```text
/air/flights/karachi-to-dubai → revalidate every 3600 seconds
```

This keeps live supplier data fresh while allowing stable route content to benefit from caching.