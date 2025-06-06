// src/components/ProtectedRoute.tsx

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../lib/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { hasUserPaid } from "../utils/checkPayment";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, loadingUser] = useAuthState(auth);
  const [loadingPayment, setLoadingPayment] = useState(true);
  const [hasAccess, setHasAccess] = useState(false);

  useEffect(() => {
    async function checkAccess() {
      if (!user) {
        setLoadingPayment(false);
        setHasAccess(false);
        return;
      }

      const paid = await hasUserPaid(user.uid);
      setHasAccess(paid);
      setLoadingPayment(false);
    }

    if (!loadingUser) {
      checkAccess();
    }
  }, [user, loadingUser]);

  if (loadingUser || loadingPayment) return <div>Loading...</div>;

  if (!user) {
    // 🔐 User not logged in → go to login page
    return <Navigate to="/login" replace />;
  }

  if (!hasAccess) {
    // ❌ User not paid → go to cashfree
    window.location.href = "https://payments.cashfree.com/forms?code=courseova-upi";
    return null;
  }

  return <>{children}</>;
}
