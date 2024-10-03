import React from "react";
import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => (
  <div>
    <h2 style={{ textAlign: "center", fontSize: "32px", marginBottom: "20px" }}>
      Please log in to your account.
    </h2>
    <LoginForm />
  </div>
);

export default LoginPage;
