// If using localStorage instead of cookies

"use client";

import { getToken, removeToken } from "@/lib/token";
import { useCallback, useEffect, useState } from "react";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check token on mount
  useEffect(() => {
    setIsAuthenticated(!!getToken());
  }, []);

  const logout = useCallback(() => {
    removeToken();
    setIsAuthenticated(false);
  }, []);

  return {
    isAuthenticated,
    logout,
  };
}
