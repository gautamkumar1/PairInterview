import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import useAuthStore from "@/zustand/store";

/**
 * Hook that syncs Zustand auth store with better-auth's session state.
 * This provides fast UI updates while ensuring security through server-side session validation.
 * 
 * Usage: Call this hook once at the app root level (e.g., in App.tsx or MainLayout)
 */
export function useAuthSync() {
  const { verifySession, setSession } = useAuthStore();
  const { data: session, isPending } = authClient.useSession();

  // Sync store with better-auth session whenever it changes
  useEffect(() => {
    if (!isPending) {
      setSession(session || null);
    }
  }, [session, isPending, setSession]);

  // Verify session on mount to ensure state is synced
  useEffect(() => {
    verifySession();
  }, [verifySession]);

  return { session, isPending };
}

