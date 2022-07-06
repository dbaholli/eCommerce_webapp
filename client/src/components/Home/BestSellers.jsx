import React, { useState, useEffect } from "react";
import { getProducts } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import "./styles/Products.scss";

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("sold", "desc", 3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="products-section">
      <h1>Best Sellers </h1>
      <div className="products-container">
        {loading ? (
          <LoadingCard count={3} />
        ) : (
          <>
            {products.map((product) => (
              <div key={product._id} className="product-column">
                <ProductCard product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default BestSellers;
