import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface AuthStore {
  isAuthenticated: boolean;
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) => set({ isAuthenticated }),
    }),
    {
      name: "auth-storage", 
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
