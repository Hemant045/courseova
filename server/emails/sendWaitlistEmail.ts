import { Resend } from 'resend';
import dotenv from 'dotenv';
dotenv.config(); // ✅ Load environment variables

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWaitlistEmail(email: string) {
  try {
    const data = await resend.emails.send({
      from: 'Waitlist Wizard <onboarding@resend.dev>',
      to: email,
      subject: '🎉 You’re on the Waitlist!',
      html: `
        <h1>Welcome to Waitlist Wizard!</h1>
        <p>Thank you for joining our waitlist. We're excited to have you!</p>
        <p>We'll notify you when we launch 🚀</p>
      `,
    });

    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
