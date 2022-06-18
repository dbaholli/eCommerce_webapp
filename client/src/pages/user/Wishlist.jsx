import React from "react";
import UserNav from "../../components/sidebars/UserNav";
import "./styles/wishlist.scss";

const WishList = () => {
  return (
    <div className="user-wishlist-page">
      <h1>User WishList</h1>
      <UserNav />
    </div>
  );
};

export default WishList;
