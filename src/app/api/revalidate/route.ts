import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the request is from Sanity (optional but recommended)
    const secret = request.nextUrl.searchParams.get("secret");
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // Log the webhook for debugging
    console.log("📝 Sanity webhook received:", body._type);

    // Revalidate based on document type
    if (body._type === "note") {
      // Revalidate all notes-related pages
      revalidatePath("/notes", "page");
      revalidatePath("/notes/[slug]", "page");
      revalidateTag("notes");

      console.log("✅ Revalidated notes pages");
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: body._type,
    });
  } catch (error) {
    console.error("❌ Error revalidating:", error);
    return NextResponse.json(
      { message: "Error revalidating", error: String(error) },
      { status: 500 },
    );
  }
}

// Allow GET requests for testing
export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  // Revalidate all notes
  revalidatePath("/notes", "page");
  revalidateTag("notes");

  return NextResponse.json({
    message: "Revalidation triggered manually",
    timestamp: Date.now(),
  });
}
