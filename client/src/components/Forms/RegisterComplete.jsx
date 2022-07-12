import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import "./RegisterForm.scss";
import { AiOutlineMail } from "react-icons/ai";
import { BiLock } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import { createupdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user } = useSelector((state) => ({ ...state }));
  let dispatch = useDispatch();
  let history = useHistory();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegister"));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validation
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    try {
      const result = await auth.signInWithEmailLink(
        email,
        window.location.href
      );
      //   console.log("RESULT", result);
      if (result.user.emailVerified) {
        // remove user email fom local storage
        window.localStorage.removeItem("emailForRegister");
        // get user id token
        let user = auth.currentUser;
        await user.updatePassword(password);
        const idTokenResult = await user.getIdTokenResult();
        // redux store
        console.log("user", user, "idTokenResult", idTokenResult);

        createupdateUser(idTokenResult.token)
          .then((res) =>
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              },
            })
          )
          .catch((err) => console.log(err));

        // redirect
        history.push("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
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
