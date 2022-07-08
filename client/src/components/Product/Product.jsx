import React, { useEffect, useState } from "react";
import { useRouteMatch } from "react-router-dom";
import { getProduct, productStar } from "../../functions/product";
import SingleProduct from "../cards/SingleProduct";
import { useSelector } from "react-redux";
// import "./styles/product.scss";

const Product = ({ slug }) => {
  const [product, setProduct] = useState({});
  const [star, setStar] = useState(0);
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  let match = useRouteMatch(slug);

  useEffect(() => {
    loadSingleProduct();
  }, [match.params.slug]);

  useEffect(() => {
    if (product.ratings && user) {
      let existingRatingObject = product.ratings.find(
        (ele) => ele.postedBy.toString() === user._id.toString()
      );
      existingRatingObject && setStar(existingRatingObject.star); // current user's star
    }
  }, []);

  const loadSingleProduct = () =>
    getProduct(match.params.slug).then((res) => setProduct(res.data));

  const onStarClick = (newRating, name) => {
    setStar(newRating);
    console.table(newRating, name);
    productStar(name, newRating, user.token).then((res) => {
      console.log("rating clicked", res.data);
      loadSingleProduct();
    });
  };

  return (
    <div className="product-main p-2 ">
      <br />
      <div className="view-product-container">
        <SingleProduct
          product={product}
          onStarClick={onStarClick}
          star={star}
        />
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
