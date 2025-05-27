import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY || "");

export async function sendPurchaseConfirmationEmail(email: string, courseTitle: string) {
  await resend.emails.send({
    from: "Waitlist Wizard <no-reply@waitlistwizard.com>",
    to: [email],
    subject: "✅ Course Purchase Confirmed",
    html: `
      <h2>Thank you for your purchase!</h2>
      <p>You've successfully purchased the course: <strong>${courseTitle}</strong>.</p>
      <p>We'll send you access details soon. Stay tuned!</p>
      <p>- The Waitlist Wizard Team</p>
    `
  });
}
