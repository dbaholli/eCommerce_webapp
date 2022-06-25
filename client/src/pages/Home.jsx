import React from "react";
import HomeBanner from "../components/Home/HomeBanner";
import "./styles/home.scss";

const Home = () => {
  return (
    <div className="home-page">
      <h1>Welcome to eCommerce Web Application</h1>
      <HomeBanner />
    </div>
  );
};

export default Home;
