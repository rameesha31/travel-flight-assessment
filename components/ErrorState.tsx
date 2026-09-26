"use client";

import { useRouter } from "next/navigation";

export default function ErrorState() {
  const router = useRouter();

  const handleRetry = () => {
    router.refresh();
  };

  return (
    <section aria-labelledby="error-heading">
      <h2 id="error-heading">Something went wrong</h2>

      <p>
        We couldn&apos;t load the flights right now. Please try again.
      </p>

      <button type="button" onClick={handleRetry}>
        Retry
      </button>
    </section>
  );
}