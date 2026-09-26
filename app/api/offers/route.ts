import { NextResponse } from "next/server";
import offers from "@/data/offers.json";

function randomDelay() {
  return Math.floor(Math.random() * 1301) + 1200;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const simulate = searchParams.get("simulate") || "ok";

  // Normal response
  if (simulate === "ok") {
    await new Promise((resolve) =>
      setTimeout(resolve, randomDelay())
    );

    return NextResponse.json(offers);
  }

  // Slow response
  if (simulate === "slow") {
    await new Promise((resolve) =>
      setTimeout(resolve, 2500)
    );

    return NextResponse.json(offers);
  }

  // Error response
  if (simulate === "error") {
    await new Promise((resolve) =>
      setTimeout(resolve, randomDelay())
    );

    return NextResponse.json(
      {
        message:
          "Flight suppliers are temporarily unavailable.",
      },
      { status: 503 }
    );
  }

  // Empty response
  if (simulate === "empty") {
    await new Promise((resolve) =>
      setTimeout(resolve, randomDelay())
    );

    return NextResponse.json([]);
  }

  // Partial response
  if (simulate === "partial") {
    await new Promise((resolve) =>
      setTimeout(resolve, randomDelay())
    );

    return NextResponse.json({
      offers: offers.slice(0, 16),
      failedAirlines: ["PIA", "Airblue"],
    });
  }

  return NextResponse.json(
    {
      message: "Unknown simulation state.",
    },
    { status: 400 }
  );
}