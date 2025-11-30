"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";

export default function AuthCallbackPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("=== AUTH-CALLBACK ===");
    console.log("Status:", status);
    console.log("Session:", session);
    
    if (status === "loading") return;

    if (session?.user) {
      const phone = (session.user as any).phone;
      console.log("Phone value:", phone);
      console.log("Phone is empty?:", !phone || phone === "");
      
      // Redirigir según tenga o no teléfono
      if (!phone || phone === "") {
        console.log("Redirecting to /complete-profile");
        router.push("/complete-profile");
      } else {
        console.log("Redirecting to /");
        router.push("/");
      }
    } else {
      console.log("No session, redirecting to /login");
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <Box display="flex" alignItems="center" justifyContent="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
}
