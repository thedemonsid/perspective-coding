"use server"
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationUrl = `http://localhost:3000/auth/verify-email?token=${token}&email=${encodeURIComponent(email)}`;
  const subject = "Please verify your email";
  const text = `Please click the following link to verify your email: ${confirmationUrl}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
      <h2 style="color: #333;">Welcome to Our Service!</h2>
      <p style="color: #555;">Thank you for signing up. Please verify your email address by clicking the button below:</p>
      <a href="${confirmationUrl}" style="display: inline-block; padding: 10px 20px; margin: 20px 0; font-size: 16px; color: #fff; background-color: #007bff; border-radius: 5px; text-decoration: none;">Verify Email</a>
      <p style="color: #555;">If you did not sign up for this account, you can ignore this email.</p>
      <p style="color: #555;">Thank you,<br>The Team</p>
    </div>
  `;
  return resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject,
    text,
    html,
  });
};