import { authClient } from "@/lib/auth-client";
import useAuthStore from "@/zustand/store";
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
interface CustomAvatarProps {
  data: {
    user: {
      name: string;
      email: string;
      image?: string | null;
    };
  };
}

// Helper function to get user initials
const getInitials = (name: string): string => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }
  return name[0].toUpperCase();
};

const CustomAvatar: React.FC<CustomAvatarProps> = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { verifySession } = useAuthStore();
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset image error when image changes
  useEffect(() => {
    setImageError(false);
  }, [data?.user.image]);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      // Verify session to sync state with server after sign out
      await verifySession();
      navigate("/");
    } catch (error) {
      console.error("Sign out failed:", error);
      // Verify session even on error to ensure state is synced
      await verifySession();
      toast.error("Sign out failed. Please try again.");
    }
  };

  const hasValidImage = data?.user.image && !imageError;
  const initials = getInitials(data?.user.name || "");

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Avatar button */}
      <button
        id="avatarButton"
        onClick={() => setOpen((prev) => !prev)}
        className="w-10 h-10 rounded-full overflow-hidden border border-border focus:outline-none focus:ring-2 focus:ring-ring bg-muted flex items-center justify-center"
      >
        {hasValidImage ? (
          <img
            src={data.user.image!}
            alt="User dropdown"
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="text-sm font-semibold text-foreground">
            {initials}
          </span>
        )}
      </button>

      {/* Dropdown menu */}
      {open && (
        <div
          id="userDropdown"
          className="absolute left-0 bottom-full mb-2 w-44 z-10 bg-card text-card-foreground border border-border rounded-lg shadow-md divide-y divide-border animate-fade-in"
        >
          {/* User info */}
          <div className="px-4 py-3 text-sm">
            <div className="font-semibold">{data?.user.name}</div>
            <div className="truncate text-muted-foreground text-xs">
              {data?.user.email}
            </div>
          </div>
          {/* Sign out */}
          <div className="py-1">
            <button
              type="button"
              className="block px-4 py-2 text-sm hover:bg-destructive hover:text-destructive-foreground transition-colors duration-150"
              onClick={handleSignOut}
            >
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomAvatar;
