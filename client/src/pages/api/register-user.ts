// pages/api/register-user.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { otpStore, users } from "../../lib/store";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { name, email, password, otp } = req.body;

  if (!name || !email || !password || !otp) {
    return res.status(400).json({ success: false, message: "Missing fields" });
  }

  // Check OTP correctness
  if (otpStore[email] !== otp) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  // Register user (please hash password in real app)
  users[email] = { name, password };

  // Delete OTP after use
  delete otpStore[email];

  console.log(`User registered: ${email}`);

  return res.status(200).json({ success: true, message: "User registered successfully" });
}
