import React, { useState, useEffect } from "react";
import { auth } from "../../firebase";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "./LoginForm.scss";
import { AiOutlineMail } from "react-icons/ai";

const ForgotPassword = ({ history }) => {
  const [email, setEmail] = useState("");
  //   const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    if (user && user.token) history.push("/");
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT,
      handleCodeInApp: true,
    };

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");
        toast.success("Check your email for password reset link");
      })
      .catch((error) => {
        toast.error(error.message);
        console.log("ERROR MSG IN FORGOT PASSWORD", error);
      });
  };

  return (
    <div className="log-in-form-container">
      <div className="log-in-form-container-content">
        <div className="form-title-description-container">
          <h6 className="form-title">Reset your password</h6>
          <p className="form-description">
            Enter your email address in order to reset your password
          </p>
        </div>
        <form action="" className="log-in-form" onSubmit={handleSubmit}>
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
                autoFocus
              />
            </div>
          </div>
          <input type="submit" value="Submit" onClick={handleSubmit} />
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
