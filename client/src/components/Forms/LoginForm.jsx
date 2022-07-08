import React, { useEffect, useState } from "react";
import { auth, googleAuthProvider } from "../../firebase";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { FcGoogle } from "react-icons/fc";
import { Link, useHistory } from "react-router-dom";
import "./LoginForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createupdateUser } from "../../functions/auth";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  const roleBasedRedirect = (res) => {
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

      createupdateUser(idTokenResult.token)
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: res.data.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        createupdateUser(idTokenResult.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            });
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
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
          <Link to="/forgot/password">Forgot Password</Link>
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
