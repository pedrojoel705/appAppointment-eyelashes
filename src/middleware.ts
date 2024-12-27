import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET no está definido");
    }

    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    );

    const response = NextResponse.next();

    response.headers.set("userId", payload.userId as string);
    response.headers.set("userRole", payload.role as string);

    return response;
  } catch (error: any) {
    console.error("Error en middleware:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api/user/getUser", "/api/user"],
};
