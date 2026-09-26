import EmptyState from "@/components/EmptyState";
import ErrorState from "@/components/ErrorState";
import FilterBar from "@/components/FilterBar";
  
const pkrFormatter = new Intl.NumberFormat("en-PK", {
  style: "currency",
  currency: "PKR",
  maximumFractionDigits: 0,
});

function formatFlightTime(dateTime: string) {
  const date = new Date(dateTime);

  const time = new Intl.DateTimeFormat("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);

  const offsetMatch = dateTime.match(/([+-]\d{2}:\d{2})$/);
  const offset = offsetMatch ? offsetMatch[1] : "";

  return `${time} (${offset})`;
}

type Offer = {
  id: string;
  airline: string;
  flightNumber: string;
  from: string;
  to: string;
  departure: string;
  arrival: string;
  price: number;
  stops: number;
};

type SearchPageProps = {
  searchParams: Promise<{
    route?: string;
    date?: string;
    pax?: string;
    cabin?: string;
    stops?: string;
    airlines?: string;
    price?: string;
    sort?: string;
    simulate?: string;
  }>;
};

export default async function SearchPage({
  searchParams,
}: SearchPageProps) {
  const params = await searchParams;

  const simulate = params.simulate || "ok";

  const response = await fetch(
    `http://localhost:3000/api/offers?simulate=${simulate}`,
    {
      cache: "no-store",
    }
  );

  if (!response.ok) {
    return (
      <main>
        <h1>Flight Search</h1>

        <p>
          {params.route || "Route not selected"} |{" "}
          {params.date || "Date not selected"} |{" "}
          {params.pax || "1"} passenger |{" "}
          {params.cabin || "Economy"}
        </p>

        <ErrorState />
      </main>
    );
  }

  const data = await response.json();

  const offers: Offer[] = Array.isArray(data)
    ? data
    : data.offers || [];

  const failedAirlines: string[] = Array.isArray(data)
    ? []
    : data.failedAirlines || [];

  // -----------------------------
  // Apply URL filters
  // -----------------------------

  let filteredOffers = [...offers];

  // Stops
  if (params.stops === "0") {
    filteredOffers = filteredOffers.filter(
      (offer) => offer.stops === 0
    );
  }

  if (params.stops === "1") {
    filteredOffers = filteredOffers.filter(
      (offer) => offer.stops === 1
    );
  }

  if (params.stops === "2") {
    filteredOffers = filteredOffers.filter(
      (offer) => offer.stops >= 2
    );
  }

  // Airline
  if (params.airlines) {
    filteredOffers = filteredOffers.filter(
      (offer) => offer.airline === params.airlines
    );
  }

  // Maximum price
  if (params.price) {
    const maxPrice = Number(params.price);

    if (!Number.isNaN(maxPrice)) {
      filteredOffers = filteredOffers.filter(
        (offer) => offer.price <= maxPrice
      );
    }
  }

  // -----------------------------
  // Sorting
  // -----------------------------

  if (params.sort === "price") {
    filteredOffers.sort((a, b) => a.price - b.price);
  }

  if (params.sort === "price-desc") {
    filteredOffers.sort((a, b) => b.price - a.price);
  }

  if (params.sort === "departure") {
    filteredOffers.sort(
      (a, b) =>
        new Date(a.departure).getTime() -
        new Date(b.departure).getTime()
    );
  }

  const airlineNames = [
    ...new Set(offers.map((offer) => offer.airline)),
  ].sort();

  return (
    <main>
      <h1>Flight Search</h1>

      <p>
        {params.route || "Route not selected"} |{" "}
        {params.date || "Date not selected"} |{" "}
        {params.pax || "1"} passenger |{" "}
        {params.cabin || "Economy"}
      </p>

      <FilterBar airlines={airlineNames} />

      <h2>Available Flights</h2>

      <p role="status" aria-live="polite">
        {filteredOffers.length}{" "}
        {filteredOffers.length === 1 ? "flight" : "flights"} found
      </p>

      {failedAirlines.length > 0 && (
        <p role="status">
          Some airlines could not return results:{" "}
          {failedAirlines.join(", ")}.
        </p>
      )}

      {filteredOffers.length === 0 ? (
        <EmptyState />
      ) : (
        <ul aria-label="Flight search results">
          {filteredOffers.map((offer) => (
            <li key={offer.id}>
              <article>
                <h3>
                  {offer.airline} — {offer.flightNumber}
                </h3>

                <p>
                  {offer.from} → {offer.to}
                </p>

                <p>
                  {formatFlightTime(offer.departure)} →{" "}
                  {formatFlightTime(offer.arrival)}
                </p>

                <p>
                  {offer.stops === 0
                    ? "Non-stop"
                    : `${offer.stops} stop(s)`}
                </p>

                <p>
                  {pkrFormatter.format(offer.price)}
                </p>
              </article>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}