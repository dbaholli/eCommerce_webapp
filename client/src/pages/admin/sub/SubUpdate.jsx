import React from "react";
import SubUpdateForm from "../../../components/Forms/SubCategory/SubUpdateForm";
import AdminNav from "../../../components/sidebars/AdminNav";
import "../styles/SubCreate.scss";

const SubUpdate = () => {
  return (
    <div className="sub-category-page">
      <AdminNav />
      <SubUpdateForm />
    </div>
  );
};

export default SubUpdate;
