"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Footer } from "@/components/layout/Footer";

export const ConditionalFooter = () => {
  const pathname = usePathname();

  if (pathname === "/admin") {
    return null;
  }

  return <Footer />;
};
