import React, { useState, useEffect } from "react";
import "./productcreateform.scss";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getProduct, updateProduct } from "../../../functions/product";
import FileUpload from "../FileUpload";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { Select } from "antd";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: "",
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

const { Option } = Select;

const ProductUpdateForm = ({
  handleSubmit,
  handleChange,
  setValues,
  values,
  handleCategoryChange,
  categories,
  subOptions,
  arrayOfSubs,
  setArrayOfSubs,
  selectedCategory,
}) => {
  const {
    title,
    description,
    price,
    category,
    subs,
    shipping,
    quantity,
    images,
    colors,
    brands,
    color,
    brand,
  } = values;

  return (
    <div className="product-create-form">
      <h1>Update Product</h1>
      {JSON.stringify(values)}
      <form onSubmit={handleSubmit}>
        <div className="createcategory-input">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div className="createcategory-input">
          <label>Description</label>
          <input
            type="text"
            name="description"
            value={description}
            onChange={handleChange}
          />
        </div>
        <div className="createcategory-input">
          <label>Price</label>
          <input
            type="number"
            name="price"
            value={price}
            onChange={handleChange}
          />
        </div>

        <div className="createcategory-input">
          <label>Shipping</label>

          <select
            name="shipping"
            onChange={handleChange}
            value={shipping === "Yes" ? "Yes" : "No"}
          >
            <option>Please select</option>

            <option value="No">No</option>
            <option value="Yes">Yes</option>
          </select>
        </div>

        <div className="createcategory-input">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={handleChange}
          />
        </div>

        <div className="createcategory-input">
          <label>Colors</label>
          <select name="color" onChange={handleChange} value={color}>
            <option>Please select</option>
            {colors.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        <div className="createcategory-input">
          <label>Brand</label>
          <select name="brand" onChange={handleChange} value={brand}>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div className="createcategory-input">
          <label>Category</label>
          <br />
          <select
            name="category"
            onChange={handleCategoryChange}
            value={selectedCategory ? selectedCategory : category._id}
          >
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label>Sub Categories</label>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            placeholder="Please select"
            value={arrayOfSubs}
            onChange={(value) => setArrayOfSubs(value)}
          >
            {subOptions.length &&
              subOptions.map((s) => (
                <Option key={s._id} value={s._id}>
                  {s.name}
                </Option>
              ))}
          </Select>
        </div>

        <FileUpload values={values} setValues={setValues} />

        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ProductUpdateForm;
