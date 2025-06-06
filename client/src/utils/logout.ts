// src/utils/logout.ts
import { signOut } from "firebase/auth";
import { auth } from "../lib/firebase";

export async function logoutUser() {
  try {
    await signOut(auth);
    console.log("Logout successful");
  } catch (error) {
    console.error("Logout failed:", error);
  }
}
