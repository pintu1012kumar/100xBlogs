// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "@/app/lib/auth"; // Apna token verify karne ka function

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  const { pathname } = req.nextUrl;

  const user = verifyToken(token || "");

  // Agar user login nahi hai aur dashboard ja raha hai
  if (pathname.startsWith("/dashboard") && !user) {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  // Agar user login hai aur signin/signup ja raha hai
  if ((pathname === "/signin" || pathname === "/signup") && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/signin", "/signup"],
};
