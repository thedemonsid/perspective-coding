"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";
import { createOrder } from "@/actions/payment";
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface PaymentCardProps {
  paymentAmount: number;
}

const PaymentCard: React.FC<PaymentCardProps> = ({ paymentAmount }) => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const order = await createOrder(paymentAmount);
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
          handler: function (response: any) {
            toast.toast({
              title: "Payment Successful",
              description: "Payment successful. Thank you for your purchase.",
              className: "bg-green-400",
            });
          },
          prefill: {
            name: "John Doe",
            email: "siddhesh@gmail.com",
            contact: "9999999999",
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

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-gradient-to-r from-primary/30 to-primary/10 rounded-2xl blur-2xl" />
      <div className="relative bg-card border border-border rounded-2xl p-8 shadow-xl max-w-md mx-auto">
        <header className="text-center mb-8">
          <h2 className="text-2xl font-bold text-primary">Plans</h2>
          <p className="text-gray-600">
            Unlock exclusive features and benefits.
          </p>
        </header>

        <div className="text-center mb-8">
          <p className="text-5xl font-bold text-primary">₹{paymentAmount}</p>
          <p className="text-gray-600">per month</p>
        </div>

        <ul className="space-y-4 mb-8">
          {[
            "Access to all premium content",
            "24/7 customer support",
            "Ad-free experience",
            "Exclusive features",
          ].map((feature, index) => (
            <li key={index} className="flex items-center gap-3 text-gray-600">
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
              {feature}
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
          No credit card required • Cancel anytime
        </p>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PaymentCard;
