import React from "react";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/CategoryUpdate.scss";
import CategoryUpdateForm from "../../../components/Forms/Category/CategoryUpdateForm";

const CategoryUpdate = () => {
  return (
    <div className="category-update-page">
      <AdminNav />
      <br />
      <CategoryUpdateForm />
    </div>
  );
};

export default CategoryUpdate;
