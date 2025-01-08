import { useState } from 'react'
import './App.css'
import About from './components/About'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import ProductsPage from './components/ProductsPage'
import HomePage from './components/HomePage'
import BlogPost from './components/BlogPost'
import ProductDetails from './components/ProductDetails'
import NotFound from './components/NotFound'

function App() {

  return (
    <>  
      <nav>
        <ul>
          <NavLink className="menu-item" to="/">
            HomePage
          </NavLink>
          <NavLink className="menu-item" to="about">
            About
          </NavLink>
          <NavLink className="menu-item" to="products">
            Product Page
          </NavLink>
        </ul>
      </nav>
        
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="about" element={<About/>} />
        <Route path="products" element={<ProductsPage/>} />
        <Route path="products/:productId" element={<ProductDetails/>} />
        <Route path="/blog/:postId" element={<BlogPost/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export default App
