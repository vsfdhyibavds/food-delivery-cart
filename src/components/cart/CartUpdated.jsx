import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import CartItem from "./CartItem";
import "./Cart.css";

export default function CartUpdated() {
  const [cartItems, setCartItems] = useState([]);
  const [isCheckout, setIsCheckout] = useState(false);

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
    setIsCheckout(true);
  };

  const handleConfirmPurchase = () => {
    alert("Purchase confirmed! Thank you for your order.");
    setIsCheckout(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      {!isCheckout ? (
        <>
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
        </>
      ) : (
        <div className="checkout-section">
          <h2>Checkout</h2>
          <p>Total Price: ${totalPrice.toFixed(2)}</p>
          <button
            className="confirm-button"
            onClick={handleConfirmPurchase}
          >
            Confirm Purchase
          </button>
        </div>
      )}
    </div>
  );
}
