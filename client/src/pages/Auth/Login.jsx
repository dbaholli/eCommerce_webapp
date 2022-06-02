import React from "react";
import { ToastContainer } from "react-toastify";
import LoginForm from "../../components/Forms/LoginForm";

const Login = () => {
  return (
    <div className="login-page">
      <ToastContainer />
      <LoginForm />
    </div>
  );
};

export default Login;
