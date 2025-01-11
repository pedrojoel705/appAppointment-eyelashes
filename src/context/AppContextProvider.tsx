"use client";

import React, { useState, useEffect, use } from "react";
import { AppContext } from "./AppContext";
import { getCurrentUser } from "@/services/api/userFetch";
import { IUserData } from "@/interface/IUserData";

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();

        const { user } = userData as IUserData;

        if (!user) {
          setIsAuthenticated(false);
          return;
        }

        setUserId(user._id);
        setRole(user.role);
        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error getting current user", error);
        setIsAuthenticated(false);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    setUserId(null);
    setRole(null);
    setIsAuthenticated(false);
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  };

  return (
    <AppContext.Provider value={{ userId, role, isAuthenticated, logout }}>
      {children}
    </AppContext.Provider>
  );
};
