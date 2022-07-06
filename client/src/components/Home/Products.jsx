import React from "react";
import BestSellers from "./BestSellers";
import NewArrivals from "./NewArrivals";
import "./styles/Products.scss";

const Products = () => {
  return (
    <div className="products">
      <NewArrivals />
      <BestSellers />
    </div>
  );
};

export default Products;
