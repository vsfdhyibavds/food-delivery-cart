import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./Cart.css";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

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
    navigate("/checkout");
  };

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => handleIncrease(item.id)}
          onDecrease={() => handleDecrease(item.id)}
        />
      ))}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
