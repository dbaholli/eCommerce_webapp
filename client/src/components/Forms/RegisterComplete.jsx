import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./RegisterForm.scss";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";

import { auth } from "../../firebase";
import { toast } from "react-toastify";

const RegisterComplete = ({ history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegister"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <div className="signup-form-container">
      <div className="signup-right">
        <div className="signup-title-container">
          <h1>Complete Register</h1>
        </div>
        <form action="" className="signup-form" onSubmit={handleSubmit}>
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
                  value={email}
                  disabled
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
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
          <input type="submit" value="Complete Registration" />
        </form>
      </div>
    </div>
  );
};

export default RegisterComplete;
