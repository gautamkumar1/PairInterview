import { create } from "zustand";
import { authClient } from "@/lib/auth-client";

// Infer session type from better-auth's getSession return type
type SessionData = Awaited<ReturnType<typeof authClient.getSession>>["data"];

interface AuthStore {
  // Optimistic UI state - synced with better-auth session
  isAuthenticated: boolean;
  // Session data from better-auth
  session: SessionData | null;
  // Loading state during session verification
  isVerifying: boolean;
  // Actions
  setSession: (session: SessionData | null) => void;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  // Sync with better-auth session (call on mount and after auth operations)
  verifySession: () => Promise<void>;
}

const useAuthStore = create<AuthStore>((set) => ({
  // Initial state - will be synced on mount
  isAuthenticated: false,
  session: null,
  isVerifying: false,

  setSession: (session) => {
    set({ 
      session,
      // Derive isAuthenticated from session state
      isAuthenticated: !!session?.user 
    });
  },

  setIsAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  verifySession: async () => {
    set({ isVerifying: true });
    try {
      const { data: session, error } = await authClient.getSession();
      if (error || !session) {
        set({ 
          session: null, 
          isAuthenticated: false 
        });
      } else {
        set({ 
          session, 
          isAuthenticated: !!session.user 
        });
      }
    } catch (error) {
      console.error("Session verification failed:", error);
      set({ 
        session: null, 
        isAuthenticated: false 
      });
    } finally {
      set({ isVerifying: false });
    }
  },
}));

export default useAuthStore;
