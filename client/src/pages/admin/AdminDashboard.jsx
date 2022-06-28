import React from "react";
import AdminNav from "../../components/sidebars/AdminNav";
import AllProducts from "./product/AllProducts";
import "./styles/AdminDashboard.scss";

const AdminDashboard = () => {

  return (
    <div className="admin-dashboard-page">
      <AdminNav />
      <h1>ADMIN DASHBOARD</h1>
      {/* <AllProducts /> */}
    </div>
  );
};

export default AdminDashboard;
