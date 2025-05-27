// src/main.tsx ✅ FINAL FIXED VERSION
import React from "react";
import { createRoot } from "react-dom/client";
import WrappedApp from "./App"; // ✅ Import the wrapped version
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WrappedApp /> {/* ✅ Already wrapped with BrowserRouter and ThemeProvider inside App.tsx */}
  </React.StrictMode>
);
