import { getCookies } from "next-client-cookies/server";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const cookies = getCookies();
  const role = cookies.get("role");
  const url = new URL(req.nextUrl);
  if (url.pathname.startsWith("/admin")) {
    if (role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  if (url.pathname.startsWith("/vendor")) {
    if (role === "vendor" || role === "admin") {
      return NextResponse.next();
    } else {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|assets|favicon.ico|logo.png|sw.js).*)",
  ],
};
