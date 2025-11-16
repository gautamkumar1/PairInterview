import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Trophy,
  User,
  X,
} from "lucide-react";
import { getUserSession } from "@/components/api/api";
import { useQuery } from "@tanstack/react-query";
import CustomAvatar from "@/components/ui/customAvatar";
import CustomAvatarSkeleton from "@/skeletons/customAvatarSkeleton";
import { Button } from "@/components/ui/button";

interface SessionData {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
}

function ProfileSection() {
  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: () => getUserSession(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <CustomAvatarSkeleton />
        <div className="flex-1 min-w-0">
          <div className="h-4 bg-muted rounded w-20 mb-2"></div>
          <div className="h-3 bg-muted rounded w-32"></div>
        </div>
      </div>
    );
  }

  if (isError || !session) {
    return <div className="text-xs text-muted-foreground">Error loading profile</div>;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <div className="shrink-0">
        <CustomAvatar data={session as SessionData} />
      </div>
      <div className="flex-1 min-w-0 hidden sm:block">
        <div className="font-semibold text-sm text-sidebar-foreground truncate">
          {session.user.name}
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {session.user.email}
        </div>
      </div>
    </div>
  );
}

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const location = useLocation();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Prevent body scroll when sidebar is open on mobile/tablet
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Close sidebar when clicking outside on mobile/tablet
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        window.innerWidth < 1024 &&
        isOpen
      ) {
        onToggle();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onToggle]);

  // Handle window resize - close sidebar on mobile if window becomes larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        // Keep sidebar open on large screens, but ensure it's visible
        // No need to close it
      } else if (window.innerWidth < 1024 && isOpen && window.innerWidth >= 768) {
        // On tablet, sidebar can stay open but should be dismissible
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const navLinks = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: Home,
    },
    {
      to: "/dashboard/problems",
      label: "Problems",
      icon: FileText,
    },
    {
      to: "/dashboard/leaderboard",
      label: "Leaderboard",
      icon: Trophy,
    },
    {
      to: "/dashboard/profile",
      label: "Profile",
      icon: User,
    },
  ];

  return (
    <>
      {/* Mobile/Tablet overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`
          fixed lg:static
          top-0 left-0
          h-full
          w-64 sm:w-72 lg:w-64
          bg-sidebar
          text-sidebar-foreground
          border-r border-sidebar-border
          z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
          shadow-lg lg:shadow-none
        `}
      >
        {/* Header with mobile menu button */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-sidebar-border shrink-0">
          <NavLink to="/">
            <h2 className="text-base sm:text-lg font-semibold font-mono truncate">PairInterview</h2>
          </NavLink>
          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="lg:hidden shrink-0"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-2 sm:p-4 space-y-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => {
                  // Close sidebar on mobile/tablet when link is clicked
                  if (window.innerWidth < 1024) {
                    onToggle();
                  }
                }}
                className={`
                  flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg
                  transition-colors duration-150
                  text-sm sm:text-base
                  ${
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                  }
                `}
              >
                {link.icon && React.createElement(link.icon, { className: "w-4 h-4 sm:w-5 sm:h-5 shrink-0" })}
                <span className="font-medium truncate">{link.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* Profile Section - Bottom */}
        <div className="p-3 sm:p-4 border-t border-sidebar-border shrink-0">
          <ProfileSection />
        </div>
      </aside>
    </>
  );
}

