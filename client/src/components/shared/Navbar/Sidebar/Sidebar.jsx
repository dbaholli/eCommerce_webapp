import React, { useState } from "react";
import "./Sidebar.scss";
import "../../styles/shared.scss";

import { BiSearch } from "react-icons/bi";
import { CgClose } from "react-icons/cg";
import { navigationLinks } from "./data";
import { Link } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";

const Sidebar = (props) => {
  const [list1, setList1] = useState(false);
  const [list2, setList2] = useState(false);
  const [list3, setList3] = useState(false);
  const [list4, setList4] = useState(false);
  const [list5, setList5] = useState(false);
  const [list6, setList6] = useState(false);
  const [list7, setList7] = useState(false);

  const lists = [list1, list2, list3, list4, list5, list6, list7];

  const showList1 = () => {
    setList1(!list1);
  };
  const showList2 = () => {
    setList2(!list2);
  };
  const showList3 = () => {
    setList3(!list3);
  };
  const showList4 = () => {
    setList4(!list4);
  };
  const showList5 = () => {
    setList5(!list5);
  };
  const showList6 = () => {
    setList6(!list6);
  };
  const showList7 = () => {
    setList7(!list7);
  };

  const showLists = [
    showList1,
    showList2,
    showList3,
    showList4,
    showList5,
    showList6,
    showList7,
  ];

  return (
    <div style={{ zIndex: props.zIndex }} className="side-bar">
      <div className="sidebar-logo inline spread">
        <div className="sidebar-icon-title inline spread">
          <div className="sidebar-icon" />
          <div>
            <Link className="sidebar-title" to="/">
              eCommerce
            </Link>
          </div>
        </div>
        <CgClose onClick={props.click} />
      </div>
      <div className="sidebar-links">
        {navigationLinks.map((props, i) => {
          return (
            <div key={props.link + i} className="navigation-link ">
              <div onClick={showLists[i]} className="main-link inline spread">
                {props.svg}
                <p className="mobile-nav-link">
                  <Link to={props.to}>{props.link}</Link>
                </p>
                {props.arrow ? (
                  <MdKeyboardArrowDown
                    style={{
                      transition: "0.3s",
                      transform: lists[i] ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                ) : null}
              </div>
              <div className="drop-down-links">
                {lists[i]
                  ? props.links?.map((props, i) => {
                      return (
                        <div
                          key={props.dropdownlink + i}
                          className="dropdown-link"
                        >
                          <Link to={props.to}>{props.dropdownlink}</Link>
                        </div>
                      );
                    })
                  : null}
              </div>
            </div>
          );
        })}
      </div>
      <div className="sidebar-auth">
        <div className="auth-navigations">
          <div className="login-link-container">
            <Link to="/login" className="mobile-login-link">
              Log In
            </Link>
          </div>
          <div className="login-link-container">
            <Link to="/register" className="mobile-login-link">
              Register
            </Link>
          </div>
        </div>
        <div className="mobile-searchbox inline">
          <input type="search" placeholder="Search the page..." name="" id="" />
          <BiSearch />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
