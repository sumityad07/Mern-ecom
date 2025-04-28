import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import AppContext from '../Context/AppContext'

const navbar = () => {

  const { products, setfilterproducts, logout, isAuthenticate, cart } = useContext(AppContext)
  // console.log(cart?.items?.length);
  
  const location = useLocation()

  const [Items, setItems] = useState("")
  const navigate = useNavigate()
  const submitHandler = (e) => {
    e.preventDefault();
    if (Items.trim() !== "") {
      navigate(`/search/product/${Items.trim()}`);
    }

  };

  const filtercategory = (cate) => {
    setfilterproducts(products.filter((data) => {
      return data.category.toLowerCase() == cate.toLowerCase()
    }))
  }
  const filterPrice = (price) => {
    setfilterproducts(products.filter((data) => {
      const numericPrice = parseInt(data.price.toString().replace(/[^\d]/g, ''));
      return numericPrice <= parseInt(price);

    }))
  }



  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link to={"/"} className="left" style={{ textDecoration: "none", color: "white" }} onClick={() => setfilterproducts(products)} >
            <h3 >MERN E - COMMERCE</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}  >
            <span onClick={submitHandler} className="material-symbols-outlined">
              search
            </span>
            <input onChange={(e) => { setItems(e.target.value) }} type="text" name="" id="" placeholder=' Search Produts' />
          </form>
          <div className="right">
            {isAuthenticate && (
              <>

                <Link
                  to={"/cart"}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <span className="material-symbols-outlined">
                    CART
                  </span>

                  {cart?.items?.length > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart?.items?.length}
                      <span className="visually-hidden">unread messages</span>
                    </span>
                  )}
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">profile</Link>
                <button className="btn btn-danger mx-3" onClick={() => { logout(), navigate("/") }} >logout</button>
              </>

            )}
            {!isAuthenticate && (
              <>

                <Link to="/login" className="btn btn-warning mx-3">login</Link>
                <Link to={"/user/register"} className="btn btn-warning mx-3">register</Link >
              </>
            )}



          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setfilterproducts(products)} >no filter</div>
            <div className="items" onClick={() => filtercategory("phone")}>mobile</div>
            <div className="items" onClick={() => filtercategory("camera")}>laptop</div>
            <div className="items" onClick={() => filtercategory("laptop")}>camera</div>
            <div className="items" onClick={() => filterPrice("1000")}>1000</div>
            <div className="items" onClick={() => filterPrice("15000")}>15000</div>
            <div className="items" onClick={() => filterPrice("20000")}>20000</div>
          </div>
        )}
      </div>

    </>

  )
}

export default navbar