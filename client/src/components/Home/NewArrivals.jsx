import React, { useState, useEffect } from "react";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";
import "./styles/Products.scss";
import { Pagination } from "antd";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadAllProducts();
  }, [page]);

  useEffect(() => {
    getProductsCount().then((res) => setProductsCount(res.data));
  }, []);

  const loadAllProducts = () => {
    setLoading(true);
    // sort, order, limit
    getProducts("createdAt", "desc", page).then((res) => {
      setProducts(res.data);
      setLoading(false);
      console.log(products);
    });
  };

  return (
    <div className="products-section">
      <h1>New Arrivals </h1>
      <div className="products-container">
        {productsCount}
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
      <Pagination
        current={page}
        total={(productsCount / 3) * 10}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default NewArrivals;
