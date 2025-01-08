// import React from 'react'

import { useNavigate } from "react-router-dom";

export const About = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div>
      <h1>About</h1>
      <button onClick={handleGoBack}>Go back</button> 
    </div>
  );
};
