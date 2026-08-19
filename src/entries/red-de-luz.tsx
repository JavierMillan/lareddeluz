import React from "react";
import ReactDOM from "react-dom/client";
import { RedDeLuzApp } from "@/red-de-luz/RedDeLuzApp";
import "@/index.css";
import "@/red-de-luz/red-de-luz.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RedDeLuzApp />
  </React.StrictMode>
);
