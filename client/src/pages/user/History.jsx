import React from "react";
import UserNav from "../../components/sidebars/UserNav";
import './styles/history.scss';

const History = () => {
  return (
    <div className="user-history-page">
      <UserNav />
      <h1>User History</h1>
    </div>
  );
};

export default History;
