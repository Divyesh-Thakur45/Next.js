import { jwtVerify } from "jose";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname;

  const publicPath =
    currentPath === "/users/login" || currentPath === "/users/signup";

  const token = request.cookies.get("token")?.value;

  if (!token && !publicPath) {
    return NextResponse.redirect(new URL("/users/login", request.url));
  }

  if (token && publicPath) {
    return NextResponse.redirect(new URL("/products", request.url));
  }

  if (token) {
    try {
      const SECRET_KEY = new TextEncoder().encode("zxcvbnm");
      const { payload } = await jwtVerify(token as string, SECRET_KEY);
      const response = NextResponse.next();
      response.cookies.set("x-user", JSON.stringify(payload.userData));
      return response;
      // response.headers.set("x-user", JSON.stringify(payload.userData));
    } catch (error) {
      console.log("JWT Verify Error:", error);
      return NextResponse.redirect(new URL("/users/login", request.url));
    }
  }
}

export const config = {
  matcher: ["/users/login", "/users/signup", "/products", "/products/create"],
};
