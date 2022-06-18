import React, { useState } from "react";
import PasswordUpdate from "../../components/Forms/PasswordUpdate";
import UserNav from "../../components/sidebars/UserNav";
import "./styles/password.scss";

const Password = () => {
  return (
    <div className="user-password-page">
      <UserNav />
      <PasswordUpdate />
    </div>
  );
};

export default Password;
