"use client";

import { useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type MobileFilterProps = {
  airlines: string[];
  onClose: () => void;
};

export default function MobileFilter({
  airlines,
  onClose,
}: MobileFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const dialogRef = useRef<HTMLDivElement>(null);

  const currentStops = searchParams.get("stops") || "all";
  const currentAirline = searchParams.get("airlines") || "all";
  const currentPrice = searchParams.get("price") || "all";
  const currentSort = searchParams.get("sort") || "price";

  useEffect(() => {
    const dialog = dialogRef.current;

    if (!dialog) return;

    const focusableElements = dialog.querySelectorAll<HTMLElement>(
      'button, select, input, [tabindex]:not([tabindex="-1"])'
    );

    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const elements = dialog.querySelectorAll<HTMLElement>(
        'button, select, input, [tabindex]:not([tabindex="-1"])'
      );

      if (elements.length === 0) return;

      const firstElement = elements[0];
      const lastElement = elements[elements.length - 1];

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

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
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-filters-heading"
      className="mobile-filter-overlay"
    >
      <div ref={dialogRef} className="mobile-filter-dialog">
        <div className="mobile-filter-header">
          <h2 id="mobile-filters-heading">Filters</h2>

          <button type="button" onClick={onClose} aria-label="Close filters">
            ×
          </button>
        </div>

        <div className="mobile-filter-content">
          <div>
            <label htmlFor="mobile-stops">Stops</label>

            <select
              id="mobile-stops"
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
            <label htmlFor="mobile-airlines">Airline</label>

            <select
              id="mobile-airlines"
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
            <label htmlFor="mobile-price">Maximum price</label>

            <select
              id="mobile-price"
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
            <label htmlFor="mobile-sort">Sort by</label>

            <select
              id="mobile-sort"
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
        </div>
      </div>
    </div>
  );
}