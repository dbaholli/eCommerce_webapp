import React from "react";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/CategoryCreate.scss";
import CategoryCreateForm from "../../../components/Forms/Category/CategoryCreateForm";

const CategoryCreate = () => {
  return (
    <div className="category-create-page">
      <AdminNav />
      <br />
      <CategoryCreateForm />
    </div>
  );
};

export default CategoryCreate;
