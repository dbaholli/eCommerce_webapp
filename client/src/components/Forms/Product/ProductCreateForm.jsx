import React, { useState, useEffect } from "react";
import "./productcreateform.scss";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { createProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import { Select } from "antd";

const { Option } = Select;

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
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

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
    colors,
    brands,
    color,
    brand,
  } = values;

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () =>
    getCategories().then((c) => setValues({ ...values, categories: c.data }));

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        console.log(res);
        if (res.status === 200)
          // toast.success(`Sucessfully created product:  ${res.data.title}`);
          window.alert(`Sucessfully created product:  ${res.data.title}`);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, ' ---- ', e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category: ", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK: ", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div className="product-create-form">
      <h1>Create Product</h1>

      {/* {JSON.stringify(values.categories)} */}

      <form
        onSubmit={handleSubmit}
        handleCategoryChange={handleCategoryChange}
        values={values}
        subOptions={subOptions}
        showSub={showSub}
      >
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
          <select name="shipping" onChange={handleChange}>
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
          <select name="color" onChange={handleChange}>
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
          <select name="brand" onChange={handleChange}>
            <option>Please select</option>
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
          <select name="category" onChange={handleCategoryChange}>
            <option>Please select</option>
            {categories.length > 0 &&
              categories.map((c) => (
                <option key={c._id} value={c._id}>
                  {c.name}
                </option>
              ))}
          </select>

          {/* {JSON.stringify(category)} */}
        </div>

        {showSub && (
          <div>
            <label>Sub Categories</label>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Please select"
              value={subs}
              onChange={(value) => setValues({ ...values, subs: value })}
            >
              {subOptions.length &&
                subOptions.map((s) => (
                  <Option key={s._id} value={s._id}>
                    {s.name}
                  </Option>
                ))}
            </Select>
          </div>
        )}
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default ProductCreateForm;
