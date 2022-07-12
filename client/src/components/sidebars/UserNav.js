import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link } from "react-router-dom";
import { UserData } from "./SidebarData";
import "./sidebar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const UserNav = () => {
  // const [sidebar, setSidebar] = useState(false);
  // const showSidebar = () => setSidebar(!sidebar);
  let history = useHistory();
  let dispatch = useDispatch();

  let { user } = useSelector((state) => ({ ...state }));
  const logout = () => {
    firebase.auth().signOut();
    dispatch({
      type: "LOGOUT",
      payload: null,
    });

    history.push("/login");
  };

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <nav className="nav-menu active">
          <ul className="nav-menu-items">
            <h1>
              <b>User Dashboard</b>
            </h1>
            {UserData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
            {user && (
              <div className="logout-container">
                <Link className="login-link signup" onClick={logout}>
                  Logout
                </Link>
              </div>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
};

export default UserNav;
