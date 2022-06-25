import React, { useState, useEffect } from "react";
import "./productcreateform.scss";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";

const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
  color: "",
  brand: "",
};

const ProductCreateForm = () => {
  const [values, setValues] = useState(initialState);

  const {
    title,
    description,
    price,
    categories,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors: brands,
    color,
    brand,
  } = values;

  const handleChange = (e) => {
    e.preventDefault();
    // 
  };

  const handleSubmit = (e) => {
    // 
  };

  return (
    <div className="product-create-form">
      <h1>Create Product</h1>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={title} onChange={handleChange} />
      </form>
    </div>
  );
};

export default ProductCreateForm;
