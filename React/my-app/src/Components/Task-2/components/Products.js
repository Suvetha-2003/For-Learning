import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./Products.css";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { cart, setSelectedProduct } = useContext(CartContext);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    navigate("/product-details");
  };

  return (
    <div className="products-container">
      <button className="view-cart" onClick={() => navigate("/cart")}>
        🛒 View Cart ({cart.length})
      </button>

      <h2 className="title">E-Commerce Products</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-price">${product.price}</p>
            <button className="view-details" onClick={() => handleViewDetails(product)}>
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
