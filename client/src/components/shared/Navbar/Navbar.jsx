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
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Search from "../../Forms/Search";

const Navbar = () => {
  const [search, setSearch] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  let dispatch = useDispatch();
  let { user } = useSelector((state) => ({ ...state }));

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
    <div className={`navi ${isSticky ? "sticky" : ""}`}>
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
            <Link to="/shop" className="nav-link inline">
              Shop
              <MdKeyboardArrowDown />
            </Link>
            {/* <ProductsMegamenu /> */}
          </div>
        </div>
        <div className="nav-login-signup">
          {/* <div onClick={showSearchBar} className="search-box inline">
            <label htmlFor="navsearch">
            <BiSearch className={`${isSticky ? "sticky-nav-colors" : ""}`} />
            </label>
          </div> */}
          <span className="float-right p-1">
            <Search />
          </span>
          {!user && (
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
          )}

          {!user && (
            <div className="login-link-container">
              <Link to="/register" className="login-link signup">
                Register
              </Link>
            </div>
          )}

          {user && (
            <div className="logout-container">
              <p className="userdetailp">
                {user.email && user.email.split("@")[0]}
                {user && user.role === "subscriber" && (
                  <Link to="/user/history"> Dashboard</Link>
                )}

                {user && user.role === "admin" && (
                  <Link to="/admin/dashboard">Dashboard</Link>
                )}
              </p>

              <Link className="login-link signup" onClick={logout}>
                Logout
              </Link>
            </div>
          )}
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
