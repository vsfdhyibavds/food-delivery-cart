import React from "react";

export default function CartItem({ item, onIncrease, onDecrease }) {
  return (
    <div className="cart-item">
      <img className="cart-item-image" src={item.image} />
      <div className="cart-item-details">
        <h3 className="cart-item-name">{item.name}</h3>
        <p className="cart-item-description">{item.description}</p>
        <h4 className="cart-item-price">Ksh{item.price}</h4>
      </div>
      <div className="quantity-controls">
        <button onClick={onDecrease}>-</button>
        <span>{item.quantity}</span>
        <button onClick={onIncrease}>+</button>
      </div>
    </div>
  );
}
