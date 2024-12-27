"use client";
import { getCookie } from "cookies-next";
import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export interface UserContextType {
  userId: string | null;
  role: string | null;
  isAuthenticated: boolean;
  logout: () => void;
}

export const AppContext = createContext<UserContextType | undefined>(undefined);
