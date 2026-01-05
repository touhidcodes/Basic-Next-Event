import { mongoConnect } from "@/lib/mongoConnect";
import { NextResponse } from "next/server";

// GET all events
export async function GET() {
  try {
    const { db, client } = await mongoConnect();
    const events = await db.collection("events").find().toArray();
    // client.close();
    return NextResponse.json(events);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
