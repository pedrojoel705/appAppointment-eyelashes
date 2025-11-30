import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    const response = NextResponse.next();

    response.headers.set("userId", token.id as string);
    response.headers.set("userRole", token.role as string);

    return response;
  } catch (error: any) {
    console.error("Error en middleware:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/api/user/getUser", "/api/user", "/admin/:path*", "/appointments/:path*"],
};
