import React from "react";
import "./index.css";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom";
import CartProvider from "./components/context/CartContext.jsx";
import ReactDOM from "react-dom/client";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <HashRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </HashRouter>
  </React.StrictMode>
);
