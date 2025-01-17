import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LogInForm";
import RegistrationForm from "../pages/RegistrationForm";
import FoodSpin from "../pages/FoodSpin";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/registration" element={<RegistrationForm />} />
      <Route path="/foodSpin" element={<FoodSpin />} />
    </Routes>
  );
};

export default Navigation;
