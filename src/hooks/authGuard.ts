// If using localStorage instead of cookies

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function useAuthGuard() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
    }
  }, [router]);
}
