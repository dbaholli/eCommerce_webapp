import React, { useState } from "react";
import { auth } from "../../firebase";
import { toast } from "react-toastify";
import "./UpdatePassword.scss";

const PasswordUpdate = () => {
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await auth.currentUser
      .updatePassword(password)
      .then(() => {
        toast.success("Password Updated");
        setPassword("");
      })
      .catch((err) => {
        console.log("ERROR: ", err);
        toast.error(err.message);
      });
  };

  return (
    <div className="form-group">
      <form onSubmit={handleSubmit}>
        <h1>Password Update</h1>
        <label>Your Password</label>
        <div className="login-input">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            className="form-control"
            placeholder="Enter new password"
            value={password}
          />
        </div>
        <input type="submit" name="Submit" />
      </form>
    </div>
  );
};

export default PasswordUpdate;
