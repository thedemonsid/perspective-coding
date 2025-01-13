import PaymentComponent from "@/components/payment/payment-card";
import React from "react";

const PaymentPage = () => {
  return (
    <div>
      <PaymentComponent paymentAmount={500}></PaymentComponent>
    </div>
  );
};

export default PaymentPage;
