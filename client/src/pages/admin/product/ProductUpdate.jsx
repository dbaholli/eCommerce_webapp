import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getProduct, updateProduct } from "../../../functions/product";
import { getCategories, getCategorySubs } from "../../../functions/category";
import FileUpload from "../../../components/Forms/FileUpload";
import ProductUpdateForm from "../../../components/Forms/Product/ProductUpdateForm";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/ProductCreate.scss";
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

const ProductUpdate = ({ slug }) => {
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const { user } = useSelector((state) => ({ ...state }));

  let match = useRouteMatch(slug);
  let history = useHistory();

  useEffect(() => {
    loadProduct();
    loadCategories();
  }, []);

  const loadProduct = () => {
    getProduct(match.params.slug).then((p) => {
      // console.log("single product", p);
      // 1 load single proudct
      setValues({ ...values, ...p.data });
      // 2 load single product category subs
      getCategorySubs(p.data.category._id).then((res) => {
        setSubOptions(res.data); // on first load, show default subs
      });
      // 3 prepare array of sub ids to show as default sub values in antd Select
      let arr = [];
      p.data.subs.map((s) => {
        arr.push(s._id);
      });
      console.log("ARR", arr);
      setArrayOfSubs((prev) => arr); // required for ant design select to work
    });
  };

  const loadCategories = () =>
    getCategories().then((c) => {
      console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
      setCategories(c.data);
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    values.subs = arrayOfSubs;
    values.category = selectedCategory ? selectedCategory : values.category;

    updateProduct(match.params.slug, values, user.token)
      .then((res) => {
        toast.success(`${res.data.title} is updated`);
        history.push("/admin/products");
      })
      .catch((err) => {
        console.log("Product update failed: ", err);
        toast.error(err.response.data.err);
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    console.log("Clicked Category: ", e.target.value);
    setValues({ ...values, subs: [] });

    setSelectedCategory(e.target.value);

    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATEGORY CLICK: ", res);
      setSubOptions(res.data);
    });

    console.log("EXISTING CATEGORY ", values.category);

    // kur user kthehet ne categorine default
    // e kthen edhe sub kategorine qe e ka pas ma heret
    if (values.category._id === e.target.value) {
      loadProduct();
    }
    setArrayOfSubs([]);
  };

  return (
    <div className="product-create-page">
      <AdminNav />

      <h1>Product Update</h1>

      {/* <FileUpload values={values} setValues={setValues} /> */}

      <ProductUpdateForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setValues={setValues}
        values={values}
        handleCategoryChange={handleCategoryChange}
        categories={categories}
        subOptions={subOptions}
        arrayOfSubs={arrayOfSubs}
        setArrayOfSubs={setArrayOfSubs}
        selectedCategory={selectedCategory}
      />
    </div>
  );
};

export default ProductUpdate;
