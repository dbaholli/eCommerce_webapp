import React, { useState, useEffect } from "react";
import { getProductsByCount } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import "../styles/AllProducts.scss";
import AdminNav from "../../../components/sidebars/AdminNav";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadAllProducts = () => {
    setLoading(true);
    getProductsByCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <div className="admin-all-products">
      <AdminNav />
      <div className="products-container">
        {loading ? (
          <h4 style={{ color: "red" }}>Loading products...</h4>
        ) : (
          <h4>All Products</h4>
        )}
        {products.map((product) => {
          return (
            <div key={product._id} className="card-container">
              <AdminProductCard product={product} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
