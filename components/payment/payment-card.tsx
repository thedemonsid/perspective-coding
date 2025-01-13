"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";
import { createOrder, updateTheUserSub } from "@/actions/payment";
import { redirect, useRouter } from "next/navigation";
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Razorpay: any;
  }
}

interface PaymentCardProps {
  paymentAmount: number;
  isEarlyBird?: boolean;
}

interface Feature {
  name: string;
  available: boolean;
}

interface PricingTier {
  title: string;
  features: Feature[];
  tag?: string;
}

const BASE_FEATURES = [
  "Access to all basic courses",
  "Practice exercises and quizzes",
  "Community forum access",
  "Learn at your own pace",
  "Live group classes",
  "1-on-1 tutoring sessions",
];

const PRICING_TIERS: Record<number, PricingTier> = {
  199: {
    title: "Basic Plan (Early Bird)",
    features: [
      { name: BASE_FEATURES[0], available: true },
      { name: BASE_FEATURES[1], available: true },
      { name: BASE_FEATURES[2], available: true },
      { name: BASE_FEATURES[3], available: true },
      { name: BASE_FEATURES[4], available: false },
      { name: BASE_FEATURES[5], available: false },
    ],
    tag: "First 100 users only!",
  },
  499: {
    title: "Standard Plan",
    features: [
      { name: BASE_FEATURES[0], available: true },
      { name: BASE_FEATURES[1], available: true },
      { name: BASE_FEATURES[2], available: true },
      { name: BASE_FEATURES[3], available: true },
      { name: BASE_FEATURES[4], available: true },
      { name: BASE_FEATURES[5], available: false },
    ],
  },
  799: {
    title: "Premium Plan",
    features: [
      { name: BASE_FEATURES[0], available: true },
      { name: BASE_FEATURES[1], available: true },
      { name: BASE_FEATURES[2], available: true },
      { name: BASE_FEATURES[3], available: true },
      { name: BASE_FEATURES[4], available: true },
      { name: BASE_FEATURES[5], available: true },
    ],
  },
};

const PaymentCard: React.FC<PaymentCardProps> = ({
  paymentAmount,
  isEarlyBird,
}) => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const handlePayment = () => {
    startTransition(async () => {
      try {
        const order = await createOrder(paymentAmount);
        if (!order.success) {
          if (order.message === "User already subscribed") {
            toast.toast({
              title: "Error",
              description: "User already subscribed.",
              className: "bg-green-200",
            });
            return router.push("/courses");
          }
          if (order.message === "User not Logged in") {
            toast.toast({
              title: "Error",
              description: "User not Logged in.",
              variant: "destructive",
            });
            return router.push("/auth/login");
          }
          toast.toast({
            title: "Error",
            description: "Invalid subscription amount.",
            variant: "destructive",
          });
          return;
        }
        toast.toast({
          title: "Order created",
          description: "Order created successfully, please wait for payment.",
          className: "bg-green-400",
        });
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.order?.amount,
          currency: order.order?.currency,
          name: "Perspective",
          description: "Professional Plan",
          order_id: order.order?.id,
          handler: async function (response: {
            razorpay_payment_id: string;
            razorpay_order_id: string;
            razorpay_signature: string;
          }) {
            console.log(response);
            const res = await updateTheUserSub(response);
            if (!res.success) {
              toast.toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
              });
              return;
            }
            toast.toast({
              title: "Payment Successful",
              description: "Payment successful. Thank you for your purchase.",
              className: "bg-green-400",
            });
          },
          theme: {
            color: "#3399cc",
          },
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
      } catch (error) {
        console.error("Error creating order:", error);
        toast.toast({
          title: "Error",
          description: "Something went wrong. Please try again later.",
          variant: "destructive",
        });
      }
    });
  };

  const tierDetails = isEarlyBird
    ? PRICING_TIERS[199]
    : PRICING_TIERS[paymentAmount as keyof typeof PRICING_TIERS];

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-2xl" />
      <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl max-w-md mx-auto">
        {tierDetails.tag && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold">
            {tierDetails.tag}
          </div>
        )}

        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary">
            {tierDetails.title}
          </h2>
          <p className="text-muted-foreground">
            Unlock exclusive features and benefits
          </p>
        </header>

        <div className="text-center mb-8">
          <p className="text-5xl font-bold text-primary">₹{paymentAmount}</p>
          <p className="text-muted-foreground">
            /{" "}
            {paymentAmount === 199
              ? "month"
              : paymentAmount === 499
              ? "3 months"
              : "6 months"}
          </p>
        </div>

        <ul className="space-y-4 mb-8">
          {tierDetails.features.map((feature, index) => (
            <li
              key={index}
              className="flex items-center gap-3 text-muted-foreground"
            >
              {feature.available ? (
                <svg
                  className="w-5 h-5 text-primary flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-destructive flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
              <span
                className={!feature.available ? "text-muted-foreground/50" : ""}
              >
                {feature.name}
              </span>
            </li>
          ))}
        </ul>

        <Button
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-4 rounded-lg font-semibold shadow-lg shadow-primary/20 transition-all"
          onClick={handlePayment}
          disabled={isPending}
        >
          Get Started
        </Button>

        <p className="text-center text-sm text-muted-foreground mt-6">
          No credit card required
        </p>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PaymentCard;
