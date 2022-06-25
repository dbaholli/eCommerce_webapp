import React from "react";
import SubCreateForm from "../../../components/Forms/SubCategory/SubCreateForm";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/SubCreate.scss";

const SubCreate = () => {
  return (
    <div className="sub-category-page">
      <AdminNav />
      <SubCreateForm />
    </div>
  );
};

export default SubCreate;
