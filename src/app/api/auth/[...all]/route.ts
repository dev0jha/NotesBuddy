import { auth } from "@/lib/auth/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest, NextResponse } from "next/server";

const handlers = toNextJsHandler(auth);

export const POST = async (req: NextRequest) => {
  try {
    console.log("[Auth Route] POST request to:", req.url);
    return await handlers.POST(req);
  } catch (error) {
    console.error("[Auth Route] POST Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    console.log("[Auth Route] GET request to:", req.url);
    return await handlers.GET(req);
  } catch (error) {
    console.error("[Auth Route] GET Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
};
