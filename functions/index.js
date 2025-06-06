const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.paymentWebhook = functions.https.onRequest(async (req, res) => {
  const event = req.body;

  // Dummy validation (production me secure secret validate karo)
  if (!event.order || !event.order.orderId) {
    return res.status(400).send("Invalid payload");
  }

  const userEmail = event.order.customer_details.customer_email;
  const orderId = event.order.orderId;

  try {
    // Save payment info to Firestore
    const db = admin.firestore();
    await db.collection("payments").doc(orderId).set({
      email: userEmail,
      orderId: orderId,
      status: "PAID",
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    return res.status(200).send("Payment recorded");
  } catch (error) {
    console.error("Error saving payment:", error);
    return res.status(500).send("Error");
  }
});
