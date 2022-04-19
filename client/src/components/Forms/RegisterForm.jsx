import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.scss";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { ReactComponent as Firsticon } from "../../assets/firsticon.svg";
import { ReactComponent as Secondicon } from "../../assets/secondicon.svg";
import { ReactComponent as Thirdicon } from "../../assets/thirdicon.svg";

const AccountServices = [
  {
    icon: <Firsticon />,
    title: "Get instant access to your payment history ",
  },
  {
    icon: <Secondicon />,
    title: "Receive the latest updates on your purchased products",
  },
  {
    icon: <Thirdicon />,
    title: "Check your order status and other details of the products",
  },
  {
    icon: <Thirdicon />,
    title: "Check your order status and other details of the products",
  },
];

const RegisterForm = () => {
  return (
    <div className="signup-form-container">
      <div className="signup-left">
        <h1>Set up your e-Commerce account here</h1>
        {AccountServices.map((props, i) => {
          return (
            <div className="account-services" key={i}>
              {props.icon}
              <p>{props.title}</p>
            </div>
          );
        })}
        <div className="payt-content-buttons">
          <Link to="/" className="button2">
            Learn More
          </Link>
        </div>
      </div>
      <div className="signup-right">
        <div className="signup-title-container">
          <h1>Register on e-Commerce</h1>
          <p>Enter your details below to start registration process</p>
        </div>
        <form action="" className="signup-form">
          <div className="signup-name-inputs">
            <div className="signup-input-container">
              <label htmlFor="first-name">
                <p>First Name</p>
              </label>
              <div className="signup-input">
                <label htmlFor="first-name">
                  <BsPerson />
                </label>
                <input
                  type="text"
                  id="first-name"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div className="signup-input-container">
              <label htmlFor="last-name">
                <p>Last Name</p>
              </label>
              <div className="signup-input">
                <label htmlFor="last-name">
                  <BsPerson />
                </label>
                <input
                  type="text"
                  id="last-name"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
          </div>
          <div className="signup-email-inputs">
            <div className="signup-input-container">
              <label htmlFor="signup-email">
                <p>Email Address</p>
              </label>
              <div className="signup-input">
                <label htmlFor="signup-email">
                  <AiOutlineMail />
                </label>
                <input
                  type="email"
                  id="signup-email"
                  placeholder="Enter your email address"
                />
              </div>
            </div>
          </div>
          <div className="signup-password-inputs">
            <div className="signup-input-container">
              <label htmlFor="signup-password">
                <p>Password</p>
              </label>
              <div className="signup-input">
                <label htmlFor="signup-password">
                  <BiLock />
                </label>
                <input
                  type="password"
                  id="signup-password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className="signup-input-container">
              <label htmlFor="confirm-signup-password">
                <p>Confirm Password</p>
              </label>
              <div className="signup-input">
                <label htmlFor="confirm-signup-password">
                  <BiLock />
                </label>
                <input
                  type="password"
                  id="confirm-signup-password"
                  placeholder="Confirm password"
                />
              </div>
            </div>
          </div>
          <div className="signup-checkbox-inputs">
            <input type="checkbox" id="signup-checkbox" />
            <label htmlFor="signup-checkbox">
              <p>
                I would like to receive eCommerce marketing communications. By
                signing up, you agree to the Privacy Statement of eCommerce.
              </p>
            </label>
          </div>
          <input type="submit" value="Sign Up" />
        </form>
        <p className="dont-have-acc">
          Have an account? <Link to="/login"> Login </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
