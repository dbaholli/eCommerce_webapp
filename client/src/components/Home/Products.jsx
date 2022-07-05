import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import "./styles/Products.scss";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadAllProducts();
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(3).then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  };

  return (
    <div className="products-section">
      <h1>Products: </h1>
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

export default Products;
