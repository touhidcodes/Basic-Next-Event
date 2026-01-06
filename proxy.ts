import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("token");
  console.log(token);
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// Apply to all paths
export const config = {
  matcher: ["/dashboard/:path*"],
};
