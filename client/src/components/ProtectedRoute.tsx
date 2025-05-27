// src/components/ProtectedRoute.tsx

import React from "react";
import { Navigate } from "react-router-dom";
// Relative import use karo agar alias nahi chal raha
import { auth } from "../lib/firebase"; 
import { useAuthState } from "react-firebase-hooks/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
