"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  const [from, setFrom] = useState("Karachi");
  const [to, setTo] = useState("Dubai");
  const [date, setDate] = useState("2026-09-30");
  const [pax, setPax] = useState("2");
  const [cabin, setCabin] = useState("economy");

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const route = `${from.toLowerCase()}-${to.toLowerCase()}`;

    const params = new URLSearchParams({
      route,
      date,
      pax,
      cabin,
      simulate: "ok",
    });

    router.push(`/air/search?${params.toString()}`);
  };

  return (
    <main>
      <h1>Travel.pk Flight Search</h1>

      <p>Search for flights and compare available fares.</p>

      <form onSubmit={handleSearch}>
        <div>
          <label htmlFor="from">From</label>
          <select
            id="from"
            value={from}
            onChange={(event) => setFrom(event.target.value)}
          >
            <option value="Karachi">Karachi</option>
            <option value="Lahore">Lahore</option>
            <option value="Islamabad">Islamabad</option>
          </select>
        </div>

        <div>
          <label htmlFor="to">To</label>
          <select
            id="to"
            value={to}
            onChange={(event) => setTo(event.target.value)}
          >
            <option value="Dubai">Dubai</option>
            <option value="Doha">Doha</option>
            <option value="London">London</option>
          </select>
        </div>

        <div>
          <label htmlFor="date">Date</label>
          <input
            id="date"
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="pax">Passengers</label>
          <input
            id="pax"
            type="number"
            min="1"
            max="9"
            value={pax}
            onChange={(event) => setPax(event.target.value)}
          />
        </div>

        <div>
          <label htmlFor="cabin">Cabin</label>
          <select
            id="cabin"
            value={cabin}
            onChange={(event) => setCabin(event.target.value)}
          >
            <option value="economy">Economy</option>
            <option value="premium-economy">
              Premium Economy
            </option>
            <option value="business">Business</option>
          </select>
        </div>

        <button type="submit">Search Flights</button>
      </form>
    </main>
  );
}