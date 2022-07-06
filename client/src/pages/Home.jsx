import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import NewArrivals from "../components/Home/NewArrivals";
import Products from "../components/Home/Products";
import "./styles/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      {/* <HomeBanner /> */}
      <Products />
    </div>
  );
};

export default Home;
