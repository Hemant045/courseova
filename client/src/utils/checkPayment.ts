// src/utils/checkPayment.ts

import { doc, getDoc } from "firebase/firestore";
import { db } from "../lib/firebase";

export async function hasUserPaid(uid: string): Promise<boolean> {
  const docRef = doc(db, "payments", uid);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return false;

  const data = docSnap.data();
  return data.hasPaid === true;
}
