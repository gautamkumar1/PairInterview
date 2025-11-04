import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialMode?: "signup" | "signin";
}

export default function AuthModal({
  open,
  onOpenChange,
  initialMode = "signup",
}: AuthModalProps) {
  const [mode, setMode] = useState<"signup" | "signin">(initialMode);

  const toggleMode = () => setMode(mode === "signup" ? "signin" : "signup");

  const title = mode === "signup" ? "Create account" : "Welcome to PairInterview";
  const subtitle =
    mode === "signup"
      ? "Sign up to get started with PairInterview"
      : "Sign in to continue where you left off";
  const footerText =
    mode === "signup"
      ? "ALREADY HAVE AN ACCOUNT?"
      : "NEW TO PAIRINTERVIEW?";
  const switchText =
    mode === "signup" ? "Sign in to your account" : "Sign up to get started";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-black text-white border border-neutral-800 sm:max-w-md transition-all duration-300">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-semibold flex justify-center items-center">{title}</DialogTitle>
          <p className="text-neutral-400 text-sm mt-2 flex justify-center items-center">{subtitle}</p>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-900 flex items-center justify-center gap-2"
          >
            <FcGoogle size={20} />
            Continue with Google
          </Button>

          <Button
            variant="outline"
            className="w-full bg-transparent border border-neutral-700 text-white hover:bg-neutral-900 flex items-center justify-center gap-2"
          >
            <FaGithub size={20} />
            Continue with GitHub
          </Button>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-neutral-800" />
          <span className="px-3 text-xs text-neutral-400 tracking-widest">
            {footerText}
          </span>
          <div className="flex-grow h-px bg-neutral-800" />
        </div>

        <p
          className="text-center text-neutral-400 text-sm cursor-pointer hover:underline transition-colors"
          onClick={toggleMode}
        >
          {switchText}
        </p>
      </DialogContent>
    </Dialog>
  );
}
