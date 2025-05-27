const functions = require("firebase-functions");

exports.cashfreeWebhook = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const event = req.body;

  console.log("Webhook event received:", event);

  // TODO: Verify event here, like signature check (Cashfree docs)
  // Then update your database or Firestore based on payment success/failure

  if (event.txStatus === "SUCCESS") {
    // payment successful - grant user access to course
    console.log(
        "Payment successful for orderId:", event.orderId,
    );
    // Add Firestore update code here
  } else {
    // payment failed or cancelled
    console.log(
        "Payment failed/cancelled for orderId:", event.orderId,
    );
  }

  res.status(200).send("Webhook received");
});
