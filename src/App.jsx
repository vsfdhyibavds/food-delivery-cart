import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cart from "./components/cart/Cart";
import Checkout from "./pages/checkout";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  );
}
