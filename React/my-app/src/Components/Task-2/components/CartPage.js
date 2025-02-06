import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./CartPage.css"; 

const CartPage = () => {
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  return (
    <div className="cart-page">
      <button onClick={() => navigate(-1)} className="back-button">🔙 Back</button>
      <h2>🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty!</p>
      ) : (
        <div className="cart-items">
          {cart.map((item, index) => (
            <div key={index} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <div className="cart-details">
                <h3>{item.title}</h3>
                <p>Price: ${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
