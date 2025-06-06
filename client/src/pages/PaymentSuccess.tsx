// src/pages/PaymentSuccess.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db, auth } from "../lib/firebase"; // tera firebase config aur auth

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function savePayment() {
      // 1. User check karo
      const user = auth.currentUser;
      if (!user) {
        // Login nahi hai to login page bhej do
        navigate("/login");
        return;
      }

      // 2. Payment details fetch karo (example ke liye query params)
      // Example: ?orderId=123&status=SUCCESS&amount=499&course=webdevelopment
      const params = new URLSearchParams(window.location.search);
      const status = params.get("status");
      const orderId = params.get("orderId");
      const amount = params.get("amount");
      const course = params.get("course") || "unknown";

      if (status !== "SUCCESS") {
        alert("Payment failed. Try again.");
        navigate("/payments");
        return;
      }

      // 3. Firestore me payment details save karo
      try {
        await setDoc(doc(db, "payments", user.uid), {
          uid: user.uid,
          email: user.email,
          orderId: orderId,
          amount: amount,
          hasPaid: true,
          course: course,
          paymentDate: new Date(),
        });
        alert("Payment successful! Access granted.");
        navigate("/premium-access");
      } catch (error) {
        console.error("Error saving payment info:", error);
        alert("Payment saved failed. Contact support.");
      } finally {
        setLoading(false);
      }
    }

    savePayment();
  }, []);

  if (loading) return <div>Saving payment info, please wait...</div>;

  return <div>Processing payment...</div>;
};

export default PaymentSuccess;
