import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getProduct } from "../../functions/product";
import SingleProduct from "../cards/SingleProduct";
// import "./styles/product.scss";

const Product = ({ slug }) => {
  const [product, setProduct] = useState({});

  let match = useRouteMatch(slug);

  useEffect(() => {
    loadSingleProduct();
  }, [slug]);

  const loadSingleProduct = () =>
    getProduct(match.params.slug).then((res) => setProduct(res.data));

  return (
    <div className="product-main p-2 ">
      <br />
      <div className="view-product-container">
        <SingleProduct product={product} />
      </div>
      <div className="view-related-products text-center">
        <hr />
        <h1>Related Products</h1>
        <hr />
      </div>
    </div>
  );
};

export default Product;
