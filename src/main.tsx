import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { HomePage } from "./home/home-page";

const root = document.getElementById("root")!;
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HomePage />
  </React.StrictMode>,
);
