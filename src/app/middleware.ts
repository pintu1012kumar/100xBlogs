// Middleware to check authentication for API routes

import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/auth";

export function middleware(req: NextRequest) {
  const token = req.headers.get("authorization")?.replace("Bearer ", "");

  if (!token || !verifyToken(token)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
}

// Optional: Apply to specific routes only
export const config = {
  matcher: ["/api/protected-route"],
};
