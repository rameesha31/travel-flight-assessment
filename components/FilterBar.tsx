"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import MobileFilter from "./MobileFilter";

export default function FilterBar({
  airlines,
}: {
  airlines: string[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentStops = searchParams.get("stops") || "all";
  const currentAirline = searchParams.get("airlines") || "all";
  const currentPrice = searchParams.get("price") || "all";
  const currentSort = searchParams.get("sort") || "price";

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === "all") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`/air/search?${params.toString()}`);
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("stops");
    params.delete("airlines");
    params.delete("price");
    params.delete("sort");

    router.push(`/air/search?${params.toString()}`);
  };

  return (
    <>
      {/* Mobile button */}
      <button
        type="button"
        className="mobile-filter-button"
        onClick={() => setMobileOpen(true)}
      >
        Filters
      </button>

      {/* Desktop filters */}
      <section
        className="desktop-filters"
        aria-labelledby="filters-heading"
      >
        <h2 id="filters-heading">Filters</h2>

        <div>
          <label htmlFor="stops">Stops</label>

          <select
            id="stops"
            value={currentStops}
            onChange={(event) =>
              updateFilter("stops", event.target.value)
            }
          >
            <option value="all">Any stops</option>
            <option value="0">Non-stop</option>
            <option value="1">1 stop</option>
            <option value="2">2+ stops</option>
          </select>
        </div>

        <div>
          <label htmlFor="airlines">Airline</label>

          <select
            id="airlines"
            value={currentAirline}
            onChange={(event) =>
              updateFilter("airlines", event.target.value)
            }
          >
            <option value="all">All airlines</option>

            {airlines.map((airline) => (
              <option key={airline} value={airline}>
                {airline}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Maximum price</label>

          <select
            id="price"
            value={currentPrice}
            onChange={(event) =>
              updateFilter("price", event.target.value)
            }
          >
            <option value="all">Any price</option>
            <option value="50000">PKR 50,000</option>
            <option value="75000">PKR 75,000</option>
            <option value="100000">PKR 100,000</option>
            <option value="150000">PKR 150,000</option>
          </select>
        </div>

        <div>
          <label htmlFor="sort">Sort by</label>

          <select
            id="sort"
            value={currentSort}
            onChange={(event) =>
              updateFilter("sort", event.target.value)
            }
          >
            <option value="price">Lowest price</option>
            <option value="price-desc">Highest price</option>
            <option value="departure">Departure time</option>
          </select>
        </div>

        <button type="button" onClick={clearFilters}>
          Clear filters
        </button>
      </section>

      {/* Mobile dialog */}
      {mobileOpen && (
        <MobileFilter
          airlines={airlines}
          onClose={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}