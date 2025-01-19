// import React from "react";
import { Route, Routes } from "react-router-dom";
import LoginForm from "../pages/LogInForm";
import RegistrationForm from "../pages/RegistrationForm";
import FoodSpin from "../pages/FoodSpin";
import Breakfast from "../pages/Breakfast";
import Dinner from "../pages/Dinner";
import Lunch from "../pages/Lunch";
// import style from '../styles/Navigation.module.css';

const Navigation = () => {
  return (
    <>

      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/registration" element={<RegistrationForm />} />
        <Route path="/foodspin" element={<FoodSpin />} />
        <Route path="/breakfast" element={<Breakfast />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/lunch" element={<Lunch />} />
      </Routes>
    </>
  );
};

export default Navigation;
