import React, { useState, useEffect } from "react";
import { getProductsByCount, removeProduct } from "../../../functions/product";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import "../styles/AllProducts.scss";
import AdminNav from "../../../components/sidebars/AdminNav";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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

  const handleRemove = (slug) => {
    let answer = window.confirm("Delete?");
    if (answer) {
      // console.log("delete: ", slug);
      removeProduct(slug, user.token)
        .then((res) => {
          loadAllProducts();
          toast.error(`${res.data.title} is deleted`);
        })
        .catch((err) => {
          if (err.response.status === 400) toast.error(err.response.data);
          console.log(err);
        });
    }
  };

  return (
    <div className="admin-all-products">
      <AdminNav />
      <div className="products-container">
        {loading ? (
          <h4 style={{ color: "red" }}>Loading products...</h4>
        ) : (
          <h1>All Products</h1>
        )}
        {products.map((product) => {
          return (
            <div key={product._id} className="card-container">
              <AdminProductCard product={product} handleRemove={handleRemove} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AllProducts;
