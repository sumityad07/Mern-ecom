import { useContext, useState } from 'react'

import './App.css'
import AppContext from './Context/AppContext'
import ShowProducts from "./Component/Product/ShowProduct"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import ProductDetail from './Component/Product/ProductDetail'
import Navbar from "./Component/Navbar"
import SearchProdcut from './Component/Product/SearchProdcut'
import Register from "./Component/User/Register"
import Login from "./Component/User/Login"
import { ToastContainer } from "react-toastify";
import Profile from './Component/User/Profile'
import Cart from "./Component/Cart"
import Address from "./Component/Product/Address"
import Cheakout from './Component/Cheakout'
function App(props) {

  return (

    <>
      <Router>
        <Navbar/>
        <ToastContainer />
        <Routes>
          <Route path="/search/product/:term" element={<SearchProdcut/>} />
          <Route path='/' element={<ShowProducts />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/user/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/shipping' element={<Address />} />
          <Route path='/cheakout' element={<Cheakout />} />
        </Routes>
      </Router>

    </>
  )
}

export default App
