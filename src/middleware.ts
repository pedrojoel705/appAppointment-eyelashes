import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";


const ROLES={
  ADMIN:"admin",
  CLIENT:"client"
}

export async function middleware(request: NextRequest) {
  try {
    const token = await getToken({ 
      req: request, 
      secret: process.env.NEXTAUTH_SECRET 
    });

    // Si no hay token, redirigir a login
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Proteger rutas de admin - solo para role "admin"
    if (request.nextUrl.pathname.startsWith("/admin")) {
      if (token.role !== ROLES.ADMIN) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    // Complete-profile: solo para usuarios SIN teléfono
    if (request.nextUrl.pathname === "/complete-profile") {
      const phone = token.phone as string;
      if (phone && phone !== "") {
        // Si ya tiene teléfono, redirigir a home
        return NextResponse.redirect(new URL("/", request.url));
      }
    }

    const response = NextResponse.next();

    // Agregar headers con info del usuario
    response.headers.set("userId", token.id as string);
    response.headers.set("userRole", token.role as string);

    return response;
  } catch (error: any) {
    console.error("Error en middleware:", error.message);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    "/admin/:path*",        // Solo admins    
    "/complete-profile",    // O rutas específicas
    "/appointments/:path*", // Usuarios autenticados
    "/api/user/:path*",     // APIs protegidas
  ],
};
