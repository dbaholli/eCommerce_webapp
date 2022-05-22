import React from "react";
import { ToastContainer } from "react-toastify";
import RegisterForm from "../../components/Forms/RegisterForm";

const Register = () => {
  return (
    <div className="register-page">
      <ToastContainer />
      <RegisterForm />
    </div>
  );
};

export default Register;
