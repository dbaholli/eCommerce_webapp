import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { Link } from "react-router-dom";
// import { ReactComponent as Logo } from "../../assets/Logo.svg";
import "./LoginForm.scss";
import { FcShop } from "react-icons/fc";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="log-in-form-container">
      {/* <h1>
        e-Commerce WebApp 
        <FcShop />
      </h1> */}
      <div className="log-in-form-container-content">
        <div className="form-title-description-container">
          <h6 className="form-title">Welcome Back</h6>
          <p className="form-description">
            Enter your details below to log in back to your account
          </p>
        </div>
        <form action="" className="log-in-form">
          <div className="login-input-container">
            <label htmlFor="email">
              <p>Enter your email address</p>
            </label>
            <div className="login-input">
              <label htmlFor="email">
                <AiOutlineMail />
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="login-input-container">
            <label htmlFor="password">
              <p>Enter your password</p>
            </label>
            <div className="login-input">
              <label htmlFor="password">
                <BiLock />
              </label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="remember-me-login">
            <input type="checkbox" id="remember-checkbox" />
            <label htmlFor="remember-checkbox">Remember Me</label>
          </div>
          <input type="submit" value="Login" />
        </form>
        <p className="dont-have-acc">
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
      <div className="terms-privacy-contact">
        <Link>Terms of Service</Link>
        <Link>Privacy Policy</Link>
        <Link>Contact Us</Link>
      </div>
    </div>
  );
};

export default LoginForm;
