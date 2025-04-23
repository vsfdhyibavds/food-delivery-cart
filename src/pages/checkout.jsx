import React, { useState, useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function Checkout() {
  const { cartItems } = useContext(CartContext);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Order placed successfully for ${name}!`);
    // Here you can add logic to send order data to backend
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div>
        <h2>Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id}>
            <span>{item.name} x {item.quantity}</span>
            <span> - Ksh{item.price * item.quantity}</span>
          </div>
        ))}
        <h3>Total: Ksh{totalPrice}</h3>
      </div>
      <form onSubmit={handleSubmit}>
        <h2>Customer Details</h2>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Address:
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Phone:
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
