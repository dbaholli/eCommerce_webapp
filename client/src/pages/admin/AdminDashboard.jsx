import React from "react";
import AdminNav from "../../components/sidebars/AdminNav";
import "./styles/AdminDashboard.scss";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-page">
      <h1>Admin Dashboard</h1>
      <AdminNav />
    </div>
  );
};

export default AdminDashboard;
