// import { useState } from 'react'
import reactLogo from "./assets/react.svg";
// import viteLogo from '/vite.svg'
import "./App.css";
import Products from "./components/products/products";
import Nav from "./components/nav/nav";
import Services from "./components/services/services";

function App() {
  return (
    <main>
      {/* <h1>Products PAge</h1>
      <img src={reactLogo} alt="logo" /> */}
      {/* <Products /> */}
      {<Nav />}
      {<Services />}
    </main>
  );
}

export default App;
