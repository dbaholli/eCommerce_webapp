import React from "react";
import "./App.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ToastContainer, toastContainer } from "react-toastify";
import "react-toastify/dist/react-toastify.cjs.development";
import Navbar from "./components/shared/Navbar/Navbar";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Home from "./pages/Home";
import RegisterComplete from "./components/Forms/RegisterComplete";

function App() {
  return (
    <Router>
      <Navbar />
      <ToastContainer />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/registercomplete" component={RegisterComplete} />
      </Switch>
    </Router>
  );
}

export default App;
