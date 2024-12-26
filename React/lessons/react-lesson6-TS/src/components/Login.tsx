import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { AuthContext, useAuth } from "../context/AuthContext";




const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const context = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    context.signIn(formValues.email, formValues.password);
  };


  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Enter your email</label>
        <input onChange={handleChange} type="email" name="email" />
        <label htmlFor="password">Enter your password</label>
        <input onChange={handleChange} type="password" name="password" />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Login;