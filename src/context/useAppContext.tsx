"use client";

import React, { useContext, useState, useEffect } from "react";

import { AppContext, UserContextType } from "./AppContext";

export const useAppContext = (): UserContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useUser debe ser usado dentro de un UserProvider");
  }
  return context;
};
