import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Components/Task-2/context/CartContext";
import Products from "./Components/Task-2/components/Products";
import ProductDetails from "./Components/Task-2/components/ProductDetails";
import CartPage from "./Components/Task-2/components/CartPage"; 

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/product-details" element={<ProductDetails />} />
          <Route path="/cart" element={<CartPage />} />
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
