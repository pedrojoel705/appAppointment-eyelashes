"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProfileChecker({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      const needsProfile = (session.user as any).needsProfile;
      
      // Si necesita completar el perfil y no está ya en esa página
      if (needsProfile && pathname !== "/complete-profile") {
        router.push("/complete-profile");
      }
    }
  }, [session, status, pathname, router]);

  return <>{children}</>;
}
