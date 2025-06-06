import express from "express";
import bodyParser from "body-parser";
import admin from "firebase-admin";
import dotenv from "dotenv";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT)),
});

const app = express();
app.use(bodyParser.json());

app.post("/payment-webhook", async (req, res) => {
  const event = req.body;

  if (event.event === "success payment") {
    const email = event.data.customer_email;
    await admin.firestore().collection("payments").doc(email).set({
      paymentStatus: "paid",
      paymentId: event.data.payment_id,
      orderId: event.data.order_id,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    }, { merge: true });
  }
  res.status(200).send("OK");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Webhook server running on port ${PORT}`);
});
