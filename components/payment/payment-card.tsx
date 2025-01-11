"use client";
import React, { useTransition } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CreditCard, Tag, Star } from "lucide-react";

interface PaymentCardProps {
  paymentAmount: number;
  discountedPercentage: number;
  discountedAmount: number;
  specialCardBenefits: string;
  discountDetails: string;
  professionalPlanDetails: string;
}
import Script from "next/script";
import { createOrder } from "@/actions/payment";
import { useToast } from "@/hooks/use-toast";
declare global {
  interface Window {
    Razorpay: any;
  }
}
const PaymentCard: React.FC<PaymentCardProps> = ({
  paymentAmount,
  discountedPercentage,
  discountedAmount,
  specialCardBenefits,
  discountDetails,
  professionalPlanDetails,
}) => {
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
    <div className="flex justify-center items-center h-fit bg-gray-100 min-w-xl">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" /> {/* */}
      <Card className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
        <CardHeader className="bg-blue-500 text-white p-4">
          <CardTitle className="flex items-center">
            <CreditCard className="mr-2" />
            Payment Card
          </CardTitle>
          <CardDescription>Special offers and discounts</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Star className="mr-2 text-yellow-500" />
              Special Card
            </h3>
            <p className="text-gray-600">{specialCardBenefits}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Tag className="mr-2 text-green-500" />
              Discounts
            </h3>
            <p className="text-gray-600">{discountDetails}</p>
            <p className="text-gray-600">
              Discounted Percentage: {discountedPercentage}%
            </p>
            <p className="text-gray-600">
              Discounted Amount: ₹{discountedAmount}
            </p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <Star className="mr-2 text-blue-500" />
              Professional Plan
            </h3>
            <p className="text-gray-600">{professionalPlanDetails}</p>
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 flex items-center">
              <CreditCard className="mr-2 text-red-500" />
              Payment Amount
            </h3>
            <p className="text-gray-600">₹{paymentAmount}</p>
          </div>
          <Button
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            onClick={handlePayment}
            disabled={isPending}
          >
            Apply Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentCard;
