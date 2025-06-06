import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import serviceAccount from "./serviceAccount.json" assert { type: "json" };

// Firebase admin initialize
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(bodyParser.json());

// Webhook endpoint
app.post("/payment-webhook", async (req, res) => {
  try {
    const event = req.body;

    if (event.event === "success payment") {
      const email = event.data.customer_email;

      await admin.firestore().collection("payments").doc(email).set({
        paymentStatus: "paid",
        paymentId: event.data.payment_id,
        orderId: event.data.order_id,
        timestamp: admin.firestore.FieldValue.serverTimestamp(),
      }, { merge: true });

      console.log(`Payment recorded for ${email}`);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error handling webhook:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
