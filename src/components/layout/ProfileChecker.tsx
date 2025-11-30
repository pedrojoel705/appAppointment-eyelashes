"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProfileChecker({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Solo verificar en rutas protegidas que requieren perfil completo
    const protectedRoutes = ["/appointments", "/admin"];
    const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
    
    if (!isProtectedRoute || status !== "authenticated") {
      return;
    }

    // Verificar si tiene teléfono
    const phone = (session?.user as any)?.phone;
    if (!phone || phone === "") {
      router.push("/complete-profile");
    }
  }, [session, status, pathname, router]);

  return <>{children}</>;
}
