import { NextResponse, type NextRequest } from "next/server";

/**
 * Expose the current pathname to Server Components via a request header,
 * so the root layout can set <html lang> based on the locale (/en vs root).
 */
export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Run on pages only — skip Next internals and static assets.
  matcher: ["/((?!_next|images|favicon.ico).*)"],
};
