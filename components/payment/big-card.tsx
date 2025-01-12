import React, { useTransition } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import Script from "next/script";
import { createOrder } from "@/actions/payment";
import { CheckIcon } from "lucide-react";

declare global {
  interface Window {
    Razorpay: any;
  }
}

const PaymentComponent = () => {
  const toast = useToast();
  const [isPending, startTransition] = useTransition();

  const handlePayment = () => {
    startTransition(async () => {
      try {
        const order = await createOrder(199);
        toast.toast({
          title: "Order created",
          description: "Please complete the payment.",
          variant: "default",
        });
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.order?.amount,
          currency: order.order?.currency,
          name: "Perspective",
          description: "Subscription fo259/month",
          order_id: order.order?.id,
          handler: function (response: any) {
            toast.toast({
              title: "Payment Successful",
              description: "Thank you for your subscription.",
              variant: "default",
            });
          },
          prefill: {
            name: "John Doe",
            email: "Perspective@gmail.com",
            contact: "1234567890",
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

  const features = [
    "Access all subjects",
    "Interactive tutorials",
    "Progress tracking",
    "24/7 access",
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="w-full md:w-1/2 space-y-8">
          <div className="space-y-4 md:space-y-6">
            <motion.button
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePayment}
              disabled={isPending}
            >
              {isPending ? "Processing..." : "Subscribe fo259/month"}
            </motion.button>
            <motion.button
              className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 rounded-xl font-semibold transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Reach Us on whatsapp
            </motion.button>
          </div>
          <p className="text-muted-foreground text-sm text-center">
            ✨ No credit card required • Cancel anytime
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2"
        >
          <div className="bg-muted/50 backdrop-blur-sm rounded-xl p-8 border border-border/50">
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <CheckIcon className="w-6 h-6 text-primary flex-shrink-0" />
                  <span className="text-foreground">{feature}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center pt-8 border-t border-border">
              <div className="text-5xl font-bold text-foreground">₹259</div>
              <div className="text-muted-foreground mt-2">per month</div>
            </div>
          </div>
        </motion.div>
      </div>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </div>
  );
};

export default PaymentComponent;
