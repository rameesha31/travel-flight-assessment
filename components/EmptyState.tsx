"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function EmptyState() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.delete("stops");
    params.delete("airlines");
    params.delete("price");
    params.delete("sort");
    params.delete("simulate");

    router.push(`/air/search?${params.toString()}`);
  };

  return (
    <section aria-labelledby="empty-results-heading">
      <h2 id="empty-results-heading">No flights found</h2>

      <p>No flights match your current filters.</p>

      <button type="button" onClick={handleClearFilters}>
        Clear filters
      </button>
    </section>
  );
}