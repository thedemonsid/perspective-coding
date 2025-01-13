"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
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
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      message : "User not Logged in",
      success : false
    }
  }
  const isValidSubcription = await prisma.subscription.findFirst({
    where: {
      price: amount,
      active: true,
    },
  });
  if (!isValidSubcription) {
    return {
      message: "Invalid subscription amount",
      success: false,
    };
  }
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

export async function updateTheUserSub({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}: {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}) {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return {
      message: "User ID is undefined",
      success: false,
    };
  }

  const user = prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  if (!user) {
    return {
      message: "User not found",
      success: false,
    };
  }

  const order = await razorpay.orders.fetch(razorpay_order_id);
  if (!order) {
    return {
      message: "Order not found",
      success: false,
    };
  }
  const subscription = await prisma.subscription.findFirst({
    where: {
      price: Number(order.amount) / 100,
      active: true,
    },
  });
  if (!subscription) {
    return {
      message: "Subscription not found",
      success: false,
    };
  }
  //  Calculate expiration date
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + subscription.interval);

  // Save subscription details in UserToSub model
  await prisma.userToSub.create({
    data: {
      userId: userId,
      subscriptionId: subscription.id,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      expiresAt: expiresAt,
      status: "ACTIVE",
    },
  });

  return {
    message: "Subscription saved successfully",
    success: true,
  };
}
