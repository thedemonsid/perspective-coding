"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
  className?: string;
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  mode = "redirect",
  className,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleLogin = async (provider: "google" | "github") => {
    try {
      setLoading(true);
      console.log(provider);

      // Implement your auth logic here
      router.push("/auth/login");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  if (mode === "modal") {
    return (
      <>
        <span
          onClick={() => setShowModal(true)}
          className={cn("cursor-pointer", className)}
        >
          {children}
        </span>

        <Dialog open={showModal} onOpenChange={setShowModal}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center">
                Welcome Back
              </DialogTitle>
              <DialogDescription className="text-center">
                Choose your preferred login method
              </DialogDescription>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              <Button
                variant="outline"
                className="w-full p-6 relative group hover:border-primary/50"
                onClick={() => handleLogin("google")}
                disabled={loading}
              >
                <span>Continue with Google</span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Button>

              <Button
                variant="outline"
                className="w-full p-6 relative group hover:border-primary/50"
                onClick={() => handleLogin("github")}
                disabled={loading}
              >
                <Github className="w-5 h-5 mr-4" />
                <span>Continue with GitHub</span>
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
              </Button>
            </div>

            <div className="mt-4 text-center text-sm text-muted-foreground">
              By continuing, you agree to our{" "}
              <a href="/terms" className="underline hover:text-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="/privacy" className="underline hover:text-primary">
                Privacy Policy
              </a>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }

  return (
    <span
      onClick={() => handleLogin("google")}
      className={cn(
        "cursor-pointer transition-opacity hover:opacity-80",
        className
      )}
    >
      {children}
    </span>
  );
};
