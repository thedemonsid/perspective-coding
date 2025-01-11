import React from "react";
import PaymentCard from "@/components/payment/payment-card";

const PaymentComponent = () => {
  return (
    <div className=" mx-auto max-w-9xl my-32">
      <div className="flex flex-wrap gap-20 items-center justify-center h-screen bg-gray-100 space-y-8">
        <PaymentCard
          paymentAmount={1000}
          discountedPercentage={10}
          discountedAmount={900}
          specialCardBenefits="Get exclusive benefits with our 1-month plan."
          discountDetails="Enjoy up to 10% off on selected items."
          professionalPlanDetails="Upgrade to our professional plan for more features."
        />
        <PaymentCard
          paymentAmount={2500}
          discountedPercentage={15}
          discountedAmount={2125}
          specialCardBenefits="Get exclusive benefits with our 3-month plan."
          discountDetails="Enjoy up to 15% off on selected items."
          professionalPlanDetails="Upgrade to our professional plan for more features."
        />
        <PaymentCard
          paymentAmount={4500}
          discountedPercentage={20}
          discountedAmount={3600}
          specialCardBenefits="Get exclusive benefits with our 6-month plan."
          discountDetails="Enjoy up to 20% off on selected items."
          professionalPlanDetails="Upgrade to our professional plan for more features."
        />
      </div>
    </div>
  );
};

export default PaymentComponent;
