import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/ui/sidebar";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar on large screens by default, open on mobile/tablet when toggled
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        // On large screens, sidebar is always visible (handled by CSS)
        // No need to manage state
      } else {
        // On mobile/tablet, start with sidebar closed
        if (window.innerWidth < 1024 && sidebarOpen === undefined) {
          // Only set initial state, don't force close if user opened it
        }
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex h-screen w-full overflow-hidden">
      <Sidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        {/* Mobile/Tablet header with menu button */}
        <header className="lg:hidden flex items-center justify-between p-3 sm:p-4 border-b border-border bg-card shrink-0 sticky top-0 z-30">
          <h1 className="text-base sm:text-lg font-semibold font-mono truncate">PairInterview</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="shrink-0"
          >
            <Menu className="w-5 h-5" />
          </Button>
        </header>

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
