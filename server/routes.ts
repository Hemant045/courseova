import "dotenv/config";
import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertWaitlistSchema, insertOrderSchema } from "@shared/schema";
import { ZodError } from "zod";
import { sendWaitlistEmail } from "./emails/sendWaitlistEmail";
import { sendPurchaseConfirmationEmail } from "./emails/sendPurchaseConfirmationEmail"; // ✅ new helper

export async function registerRoutes(app: Express) {
  // Waitlist route
  app.post("/api/waitlist", async (req, res) => {
    try {
      const data = insertWaitlistSchema.parse(req.body);

      const existing = await storage.getWaitlistEntryByEmail(data.email);
      if (existing) {
        return res.status(400).json({ 
          message: "This email is already on the waitlist" 
        });
      }

      const entry = await storage.createWaitlistEntry(data);
      await sendWaitlistEmail(data.email); // ✅ sending waitlist email

      res.status(201).json(entry);
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Waitlist error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Course routes
  app.get("/api/courses", async (_req, res) => {
    const courses = await storage.getAllCourses();
    res.json(courses);
  });

  app.get("/api/courses/:id", async (req, res) => {
    const courseId = Number(req.params.id);
    const course = await storage.getCourse(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    res.json(course);
  });

  // Order route
  app.post("/api/orders", async (req, res) => {
    try {
      const data = insertOrderSchema.parse(req.body);
      const course = await storage.getCourse(Number(data.courseId));

      if (!course) {
        return res.status(404).json({ message: "Course not found" });
      }

      const order = await storage.createOrder({
        ...data,
        status: "pending"
      });

      res.json({ 
        orderId: order.id,
        amount: Number(course.price),
        upiId: process.env.BUSINESS_UPI_ID || "your-upi@bank",
        course: {
          title: course.title,
          description: course.description
        }
      });
    } catch (error) {
      if (error instanceof ZodError) {
        return res.status(400).json({ message: error.errors[0].message });
      }
      console.error("Order creation error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  // Payment verification
  app.post("/api/orders/:id/verify", async (req, res) => {
    try {
      const { upiTransactionId } = req.body;
      const orderId = Number(req.params.id);

      if (!upiTransactionId) {
        return res.status(400).json({ message: "UPI transaction ID is required" });
      }

      const order = await storage.getOrder(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found" });
      }

      await storage.updateOrder(orderId, {
        upiTransactionId,
        status: "verification_pending"
      });

      const course = await storage.getCourse(order.courseId);
      if (course) {
        await sendPurchaseConfirmationEmail(order.email, course.title); // ✅ new email
      }

      res.json({ success: true });
    } catch (error) {
      console.error("Payment verification error:", error);
      res.status(500).json({ message: "Server error" });
    }
  });

  return createServer(app);
}
