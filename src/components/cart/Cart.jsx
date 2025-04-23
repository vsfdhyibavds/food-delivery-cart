import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";
import "./Cart.css";
import { CartContext } from "../../context/CartContext";

export default function Cart() {
  const { cartItems, initializeCart, increaseQuantity, decreaseQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (cartItems.length === 0) {
      fetch("http://localhost:3000/dishes")
        .then((res) => res.json())
        .then((data) => {
          initializeCart(data);
        });
    }
  }, [cartItems, initializeCart]);

  const handleCheckout = () => {
    navigate("/checkout");
  };

  return (
    <div>
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          onIncrease={() => increaseQuantity(item.id)}
          onDecrease={() => decreaseQuantity(item.id)}
        />
      ))}
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
}
