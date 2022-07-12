import React from "react";
import Product from "../components/Product/Product";
import Navbar from "../components/shared/Navbar/Navbar";
import "./styles/productpage.scss";

const ProductPage = () => {
  return (
    <div className="product-page">
      <Navbar />
      <Product />
    </div>
  );
};

export default ProductPage;
