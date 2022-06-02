import React, { useState, useEffect } from "react";
import "./navbar.scss";
import "../../shared/styles/shared.scss";
// import './Megamenus/style.scss';
import Sidebar from "./Sidebar/Sidebar";
import { Link } from "react-router-dom";
import { MdArrowRightAlt, MdKeyboardArrowDown } from "react-icons/md";
import { BiSearch, BiMenu } from "react-icons/bi";
import Backdrop from "../Backdrop/Backdrop";
import { FcShop } from "react-icons/fc";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  let dispatch = useDispatch();
  let history = useHistory();

  const showSearchBar = () => {
    setSearch(!search);
  };

  const showSidebar = () => {
    setSidebar(!sidebar);
  };

  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  useEffect(() => {
    const nav = document.querySelector(".navbar");

    const handleScroll = () => {
      const scrollHeight = window.pageYOffset;
      setIsSticky(scrollHeight > 80 ? true : false);
    };

    window.addEventListener("scroll", handleScroll);
  }, []);

  const zIndex = 100;

  return (
    <div className={`navbar ${isSticky ? "sticky" : ""}`}>
      <div
        className="nav-searchbar"
        style={{ display: search ? "block" : "none", zIndex: zIndex }}
      >
        <div className="searchbar-content inline">
          <input
            type="search"
            name=""
            placeholder="Search the page . . ."
            id="navsearch"
          />
          {search ? (
            <Backdrop
              click={showSearchBar}
              zIndex={zIndex - 101}
              display="block"
            />
          ) : null}
          <MdArrowRightAlt style={{ display: "block !important" }} />
        </div>
      </div>
      <div className="navbar-content">
        <div className="title-icon inline">
          <div className="nav-title inline">
            {/* <BiMenu /> */}
            <Link to="/" className="inline">
              {/* <div className="nav-icon" /> */}
              <FcShop />
              <h1>e-Commerce</h1>
            </Link>
          </div>
        </div>
        <div className="navigation">
          <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              Products
              <MdKeyboardArrowDown />
            </Link>
            {/* <ProductsMegamenu /> */}
          </div>
          <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              About us
              <MdKeyboardArrowDown />
            </Link>
          </div>
          <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              Categories
              <MdKeyboardArrowDown />
            </Link>
          </div>
          <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              Page
              <MdKeyboardArrowDown />
            </Link>
          </div>
          {/* <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              Page
              <MdKeyboardArrowDown />
            </Link>
          </div>
          <div className="nav-link-container">
            <Link to="/" className="nav-link inline">
              About us
              <MdKeyboardArrowDown />
            </Link>
          </div> */}
        </div>
        <div className="nav-login-signup">
          <div onClick={showSearchBar} className="search-box inline">
            <label htmlFor="navsearch">
              <BiSearch className={`${isSticky ? "sticky-nav-colors" : ""}`} />
            </label>
          </div>
          <div className="login-link-container">
            <Link
              to="/login"
              className={`login-link login ${
                isSticky ? "sticky-nav-colors" : ""
              }`}
            >
              Login
            </Link>
          </div>
          <div className="login-link-container">
            <Link to="/register" className="login-link signup">
              Register
            </Link>
          </div>
          <div className="login-link-container">
            <Link className="login-link signup" onClick={logout}>
              Logout
            </Link>
          </div>
        </div>
        <div onClick={showSidebar} className="hamburger-menu">
          <div className="hamburger-line" />
          <div className="hamburger-line" />
          <div className="hamburger-line" />
        </div>
      </div>
      {sidebar ? <Backdrop click={showSidebar} zIndex={zIndex - 1} /> : null}
      {sidebar ? <Sidebar click={showSidebar} zIndex={zIndex} /> : null}
    </div>
  );
};

export default Navbar;
