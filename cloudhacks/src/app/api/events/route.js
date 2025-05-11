import { NextResponse } from "next/server";
import { createEvent } from "@/app/services/eventService";

export async function POST(req) {
  const body = await req.json();

  try {
    await createEvent(body);
    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    // Print the actual Error object (with stack) to your terminal
    console.error(error);
    // Return its message and stack so the browser can see it
    return NextResponse.json(
      { error: error.message, stack: error.stack },
      { status: 500 }
    );
  }
}