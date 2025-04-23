import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/dishes")
      .then((res) => res.json())
      .then((data) => {
        const updatedData = data.map((item) => ({
          ...item,
          quantity: 1,
        }));
        setCartItems(updatedData);
      });
  }, []);

  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  const handleCheckout = () => {
    const totalPrice = cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    alert(`Total price: $${totalPrice.toFixed(2)}. Proceeding to checkout...`);
  };

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncraese={() => handleIncrease(item.id)}
          onDecrease={() => handleDecrease(item.id)}
        />
      ))}
      <button className="checkout-button" onClick={handleCheckout}>
        Checkout
      </button>
    </div>
  );
}
