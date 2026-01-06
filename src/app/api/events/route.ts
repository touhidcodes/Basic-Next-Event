import { mongoConnect } from "@/lib/mongoConnect";
import { TEvent } from "@/types/event";
import { NextRequest, NextResponse } from "next/server";

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

// POST new event
export async function POST(req: NextRequest) {
  try {
    const { db, client } = await mongoConnect();
    const data: TEvent = await req.json();

    // Basic validation
    if (!data.title || !data.date || !data.location) {
      client.close();
      return NextResponse.json(
        { error: "Title, date, and location required" },
        { status: 400 }
      );
    }

    const result = await db.collection("events").insertOne({
      ...data,
      createdAt: new Date(),
    });

    // client.close();
    return NextResponse.json(
      { message: "Event created", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create event" },
      { status: 500 }
    );
  }
}
