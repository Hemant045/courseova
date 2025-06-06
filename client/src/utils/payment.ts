// src/utils/payment.ts

import { doc, setDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function savePayment(
  uid: string,
  email: string,
  orderId: string,
  amount: string,
  course: string
) {
  return setDoc(doc(db, "payments", uid), {
    uid,
    email,
    orderId,
    amount,
    course,
    hasPaid: true,
    paymentDate: new Date(),
  });
}
