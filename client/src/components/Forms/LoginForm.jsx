import React, { useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.scss";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let dispatch = useDispatch();
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);

      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          // name: user.displayName,
          email: user.email,
          token: idTokenResult.token,
        },
      });
      history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };


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
          <input
            type="submit"
            value="Login"
            onClick={handleSubmit}
            disabled={!email || password.length < 6}
          />
          <button type="submit" onClick={googleLogin} className="google-login">
            <FcGoogle /> Login with Google
          </button>
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
