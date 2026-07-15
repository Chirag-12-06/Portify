import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";

import QueryProvider from "./providers/QueryProvider";

import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryProvider>
  <App />
  <Toaster
    position="top-right"
    richColors
    closeButton
  />
</QueryProvider>
  </React.StrictMode>
);