// src/pages/Logout.tsx
import React, { useEffect } from "react";
import { logoutUser } from "../utils/logout";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    logoutUser().then(() => {
      navigate("/");
    });
  }, []);

  return <div>Logging out...</div>;
};

export default Logout;
