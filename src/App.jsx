import React from 'react'
import { Router, Routes, Route } from 'react-router-dom'
// import './App.css'
import Cart from './component/Cart.jsx'
import Supermarket from './component/Supermarket.jsx'
import { Navbar } from './component/Navbar.jsx';
import Home from './component/Home.jsx';
import Checkout from './component/Checkout.jsx';
import Additems from './component/AddItems.jsx';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/SuperMarket' element={<Supermarket/>}></Route>
        <Route path='/Cart' element={<Cart/>}></Route>
        <Route path='/Checkout' element={<Checkout/>}></Route>
        <Route path='/Additems' element={<Additems/>}></Route>
      </Routes></>
  );
}

export default App
