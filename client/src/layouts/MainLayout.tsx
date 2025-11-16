import MinimalSocialsFooter from "@/components/ui/footer";
import NavbarComponent from "@/components/ui/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useAuthSync } from "@/hooks/useAuthSync";

export default function MainLayout() {
  // Sync auth state with better-auth session on mount and when session changes
  useAuthSync();
  
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");
  const isProblemPage = location.pathname.startsWith("/problem")

  return (
    <div className="flex flex-col min-h-screen w-full">
      {!isDashboard && !isProblemPage && (
        <header>
          <NavbarComponent />
        </header>
      )}

      {/* This makes the main content take up available space and push the footer down */}
      <main className="flex-grow">
        <Outlet />
      </main>
      {
        !isProblemPage && !isDashboard && (
          <footer>
          <MinimalSocialsFooter />
        </footer>
        )
      }
     
    </div>
  );
}
  
