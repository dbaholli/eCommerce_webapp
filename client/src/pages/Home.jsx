import React from "react";
import CategoryList from "../components/category/CategoryList";
import HomeBanner from "../components/Home/HomeBanner";
import NewArrivals from "../components/Home/NewArrivals";
import Products from "../components/Home/Products";
import SubList from "../components/sub/SubList";
import "./styles/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      {/* <HomeBanner /> */}
      <Products />
      <CategoryList />

      <SubList />
    </div>
  );
};

export default Home;
