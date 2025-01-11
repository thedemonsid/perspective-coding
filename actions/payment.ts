"use server";

import Razorpay from "razorpay";
import { v4 as uuidv4 } from "uuid";

if (!process.env.RAZORPAY_KEY_SECRET) {
  throw new Error("RAZORPAY_KEY_SECRET environment variable is not defined");
}
if (!process.env.RAZORPAY_KEY_ID) {
  throw new Error("RAZORPAY_KEY_ID environment variable is not defined");
}
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (amount: number) => {
  const receipt = uuidv4().slice(0, 20);
  const options = {
    amount: amount * 100, //* amount in the smallest currency sub-unit paise
    currency: "INR",
    receipt: `receipt#1${receipt}`, //* unique receipt number
  };
  try {
    const order = await razorpay.orders.create(options);
    return {
      message: "Order created successfully",
      order,
      success: true,
    };
  } catch (error) {
    console.error(
      `Error creating order with amount ${amount} and receipt ${receipt}:`,
      error
    );
    return {
      message: "Something went wrong",
      success: false,
    };
  }
};
