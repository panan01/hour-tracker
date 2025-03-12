import React, { useState } from "react";
import "./Login.css";
import PAN_Logo from "../../assets/PAN_Logo.svg";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <img src={PAN_Logo} className="logo-login"/>
        <label>Email</label>
        <input type="email" name="email" onChange={handleChange} />
        <label>Password</label>
        <input type="password" name="password" onChange={handleChange} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;