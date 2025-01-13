"use client";
import React, { useCallback, useEffect, useState } from "react";
import { CardWrapper } from "./card-wrapper";
import { useSearchParams } from "next/navigation";
import { verifyEmail } from "@/actions/email-verification";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { FormError } from "./form-error";

const EmailVerificationPage = () => {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");
  const [error, setError] = useState("");
  console.log("Token", token);
  console.log("Email", email);

  const onSubmit = useCallback(async () => {
    if (token && email) {
      const response = await verifyEmail({ token, email });
      console.log("Verification response", response);
      if (response.success) {
        toast({
          title: "Email Verified",
          description: "Your email has been successfully verified.",
          className: "bg-green-100 text-foreground",
        });
        router.push("/auth/login");
      } else {
        setError(response.message);
      }
    }
    setError("Invalid token or email");
  }, [token, email, router, toast]);
  useEffect(() => {
    onSubmit();
  }, [onSubmit]);
  return (
    <CardWrapper
      headerLabel="Email Verification"
      backButtonLabel="Back to Login"
      backButtonHref="/auth/login"
    >
      <div className="flex flex-col items-center gap-6">
        {error.length > 0 ? (
          <FormError message={error}></FormError>
        ) : (
          <div className="text-center">
            <p>We are verifying your email address. Please wait a moment.</p>
            <SpinLoader />
          </div>
        )}
      </div>
    </CardWrapper>
  );
};

export default EmailVerificationPage;
export function SpinLoader() {
  return (
    <div className="flex justify-center items-center text-red-500">
      <div className="flex space-x-1">
        {["L", "O", "A", "D", "I", "N", "G"].map((letter, index) => (
          <span
            key={index}
            className="animate-bounce"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

// Add this to your CSS file or inside a <style> tag
// .animate-spin-slow {
//   animation: spin 3s linear infinite;
// }
// @keyframes spin {
//   0% {
//     transform: rotate(0deg);
//   }
//   100% {
//     transform: rotate(360deg);
//   }
// }
