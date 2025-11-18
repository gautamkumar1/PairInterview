import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  FileText,
  Trophy,
  User,
  X,
  PanelLeftClose,
  PanelLeftOpen,
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

interface ProfileSectionProps {
  isCollapsed: boolean;
}

function ProfileSection({ isCollapsed }: ProfileSectionProps) {
  const { data: session, isLoading, isError } = useQuery({
    queryKey: ["session"],
    queryFn: () => getUserSession(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center gap-3">
        <CustomAvatarSkeleton />
        {!isCollapsed && (
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-muted rounded w-20 mb-2"></div>
            <div className="h-3 bg-muted rounded w-32"></div>
          </div>
        )}
      </div>
    );
  }

  if (isError || !session) {
    return <div className="text-xs text-muted-foreground">Error loading profile</div>;
  }

  return (
    <div className="flex items-center gap-2 sm:gap-3 justify-center">
      <div className="shrink-0">
        <CustomAvatar data={session as SessionData} />
      </div>
      {!isCollapsed && (
        <div className="flex-1 min-w-0 hidden sm:block">
          <div className="font-semibold text-sm text-sidebar-foreground truncate">
            {session.user.name}
          </div>
          <div className="text-xs text-muted-foreground truncate">
            {session.user.email}
          </div>
        </div>
      )}
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
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Track mobile state
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

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
          ${isCollapsed ? "w-16 lg:w-16" : "w-64 sm:w-72 lg:w-64"}
          bg-sidebar
          text-sidebar-foreground
          border-r border-sidebar-border
          z-50 lg:z-auto
          transform transition-all duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          flex flex-col
          shadow-lg lg:shadow-none
          overflow-hidden
          ${!isOpen && isMobile ? "pointer-events-none lg:pointer-events-auto" : ""}
        `}
      >
        {/* Collapse/Expand Button - Desktop only */}
        <div className="hidden lg:flex items-center justify-center p-2 border-b border-sidebar-border shrink-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-10 h-10 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-5 h-5" />
            ) : (
              <PanelLeftClose className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Header with mobile menu button */}
        <div className={`flex items-center justify-between p-3 sm:p-4 border-b border-sidebar-border shrink-0 ${isCollapsed ? "lg:justify-center lg:px-2" : ""}`}>
          {!isCollapsed && (
            <NavLink to="/">
              <h2 className="text-base sm:text-lg font-semibold font-mono truncate">PairInterview</h2>
            </NavLink>
          )}
          {isCollapsed && (
            <NavLink to="/" className="flex items-center justify-center">
              <h2 className="text-base font-semibold font-mono">P</h2>
            </NavLink>
          )}
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
        <nav className={`flex-1 space-y-1 ${isCollapsed ? "p-2 lg:p-2" : "p-2 sm:p-4"} ${isOpen || !isMobile ? "overflow-y-auto" : "overflow-hidden"}`}>
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            const IconComponent = link.icon;
            return (
              <div key={link.to} className="relative group">
                <NavLink
                  to={link.to}
                  onClick={() => {
                    // Close sidebar on mobile/tablet when link is clicked
                    if (window.innerWidth < 1024) {
                      onToggle();
                    }
                  }}
                  className={`
                    flex items-center ${isCollapsed ? "justify-center lg:justify-center" : "gap-2 sm:gap-3"} 
                    ${isCollapsed ? "px-2 lg:px-2" : "px-3 sm:px-4"} 
                    py-2.5 sm:py-3 rounded-lg
                    transition-colors duration-150
                    text-sm sm:text-base
                    ${
                      isActive
                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                        : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sidebar-foreground"
                    }
                  `}
                >
                  {IconComponent && (
                    <IconComponent className={`${isCollapsed ? "w-5 h-5 lg:w-5 lg:h-5" : "w-4 h-4 sm:w-5 sm:h-5"} shrink-0`} />
                  )}
                  {!isCollapsed && (
                    <span className="font-medium truncate">{link.label}</span>
                  )}
                </NavLink>
                {/* Tooltip for collapsed state */}
                {isCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1.5 bg-popover text-popover-foreground text-xs font-medium rounded-md shadow-lg border border-border opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50 whitespace-nowrap hidden lg:block">
                    {link.label}
                    <div className="absolute right-full top-1/2 -translate-y-1/2 w-0 h-0 border-t-[4px] border-b-[4px] border-r-[4px] border-t-transparent border-b-transparent border-r-popover"></div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Profile Section - Bottom */}
        <div className={`border-t border-sidebar-border shrink-0 ${isCollapsed ? "p-2 lg:p-2" : "p-3 sm:p-4"}`}>
          <ProfileSection isCollapsed={isCollapsed} />
        </div>
      </aside>
    </>
  );
}

