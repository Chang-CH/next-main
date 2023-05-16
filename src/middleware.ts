import { NextRequest, NextResponse, userAgent } from "next/server";

export function middleware(req: NextRequest) {
  // Parse user agent
  const { device } = userAgent(req);

  // Check the viewport
  const viewport = device.type === "mobile" ? "mobile" : "desktop";

  // Set the viewport as a search parameter
  // Allows us to check user agent on server components
  req.nextUrl.searchParams.set("viewport", viewport);
  return NextResponse.rewrite(req.nextUrl);
}
