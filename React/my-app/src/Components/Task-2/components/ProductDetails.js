import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext"; 
import "./ProductDetails.css";

const ProductDetails = () => {
  const navigate = useNavigate();
  const { selectedProduct, addToCart } = useContext(CartContext);

  if (!selectedProduct) {
    return <p>No product selected.</p>;
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    alert(`${selectedProduct.title} added to cart!`);
  };

  return (
    <div className="product-details">
      <button onClick={() => navigate(-1)} className="back-button">Back</button>
      <h2>{selectedProduct.title}</h2>
      <img src={selectedProduct.image} alt={selectedProduct.title} className="product-image" />
      <p>{selectedProduct.description}</p>
      <p className="modal-price">Price: ${selectedProduct.price}</p>
      <p className="modal-category">Category: {selectedProduct.category}</p>
      <p className="modal-rating">
        Ratings: {selectedProduct.rating?.rate || "N/A"} (Based on {selectedProduct.rating?.count || 0} reviews)
      </p>

      <button className="add-to-cart" onClick={handleAddToCart}>🛒 Add to Cart</button>
      <button className="buy-now">Buy Now</button>
    </div>
  );
};

export default ProductDetails;
