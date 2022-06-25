import React from "react";
import ProductCreateForm from "../../../components/Forms/Product/ProductCreateForm";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/ProductCreate.scss";

const ProductCreate = () => {
  return (
    <div className="product-create-page">
      <AdminNav />
      <ProductCreateForm />
    </div>
  );
};

export default ProductCreate;
