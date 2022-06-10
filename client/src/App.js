import React, { useEffect } from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/shared/Navbar/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./components/Forms/RegisterComplete";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import ForgotPassword from "./components/Forms/ForgotPassword";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            // name: user.displayName,
            email: user.email,
            token: idTokenResult.token,
          },
        });
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registercomplete" component={RegisterComplete} />
        <Route exact path="/register/complete" component={RegisterComplete} />
        <Route exact path="/forgot/password" component={ForgotPassword} />
      </Switch>
    </Router>
  );
};

export default App;
