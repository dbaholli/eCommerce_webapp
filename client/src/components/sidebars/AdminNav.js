import React from "react";
import { Link } from "react-router-dom";
import { AdminData } from "./SidebarData";
import "./adminsidebar.css";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import firebase from "firebase";

const AdminNav = () => {
  // const [sidebar, setSidebar] = useState(true);
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
            <h1>Admin Dashboard</h1>
            {AdminData.map((item, index) => {
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

export default AdminNav;
