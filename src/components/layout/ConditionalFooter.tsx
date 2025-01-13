"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export const ConditionalFooter = () => {
  const pathname = usePathname();

  if (pathname === "/admin" || pathname === "/appointments") {
    return null;
  }

  return <Footer />;
};
