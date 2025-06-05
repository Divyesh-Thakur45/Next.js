import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //   console.log("hello");
  const currentPath = request.nextUrl.pathname;
  const publicPath =
    currentPath == "/users/login" || currentPath == "/users/signup";
  const token = request.cookies.get("token")?.value;
  if (!token && !publicPath) {
    return NextResponse.redirect(new URL("/users/login", request.url));
  }
  if (token && publicPath) {
    return NextResponse.redirect(new URL("/products", request.url));
  }
}

export const config = {
  matcher: ["/", "/users/login", "/users/signup", "/products"],
};
