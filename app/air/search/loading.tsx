export default function Loading() {
  return (
    <main aria-busy="true" aria-label="Loading flight results">
      <h1>Flight Search</h1>

      <p>Loading your flight results...</p>

      <ul aria-hidden="true">
        {Array.from({ length: 5 }).map((_, index) => (
          <li key={index}>
            <div
              style={{
                height: "20px",
                width: "200px",
                background: "#e5e7eb",
                marginBottom: "10px",
              }}
            />

            <div
              style={{
                height: "16px",
                width: "300px",
                background: "#e5e7eb",
                marginBottom: "10px",
              }}
            />

            <div
              style={{
                height: "16px",
                width: "150px",
                background: "#e5e7eb",
                marginBottom: "25px",
              }}
            />
          </li>
        ))}
      </ul>
    </main>
  );
}