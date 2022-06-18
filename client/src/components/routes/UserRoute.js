import React from "react";
import { Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserRoute = ({ children, ...rest }) => {
  const { user } = useSelector((state) => ({ ...state }));

  return user && user.token ? (
    <Route {...rest} render={() => children} />
  ) : (
    <h1 style={{color: "red", marginTop: '10%', textAlign: 'center'}}>Loading ...</h1>
  );
};

export default UserRoute;
