import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { store, actions } = useContext(Context);
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) =>
    setformData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await actions.register(formData);
    if (success) navigate('/private'); 
  };
  
  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await actions.login(formData);
    if (success) navigate('/private'); 
  };

  return (
    <>
    <form onSubmit={handleSubmit} className="form-control">
      <input
        type="text"
        className="form-control"
        onChange={handleChange}
        name="email"
        placeholder="email"
      />
      <input
        type="password"
        className="form-control"
        onChange={handleChange}
        name="password"
        placeholder="password"
      />
      <input
        type="submit"
        value="register"
        disabled={localStorage.getItem("token")}
      />
    </form>
    <form onSubmit={handleLogin} className="form-control">
      <input
        type="text"
        className="form-control"
        onChange={handleChange}
        name="email"
        placeholder="email"
      />
      <input
        type="password"
        className="form-control"
        onChange={handleChange}
        name="password"
        placeholder="password"
      />
      <input
        type="submit"
        value="login"
        
      />
    </form>
    </>
  );
};
