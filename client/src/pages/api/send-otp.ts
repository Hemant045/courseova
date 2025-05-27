import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  success: boolean;
  message: string;
}

const otpStore: Record<string, string> = {};

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, message: "Method not allowed" });
  }

  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Missing email or otp" });
  }

  otpStore[email] = otp;

  // Yahan email bhejne ka logic dal sakte ho, ya abhi skip kar sakte ho for testing

  return res.status(200).json({ success: true, message: "OTP sent" });
}
