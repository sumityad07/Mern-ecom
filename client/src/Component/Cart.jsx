import React, { useContext, useEffect, useState } from 'react'
import AppContext from '../Context/AppContext'
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, deleteQty, addToCart, removeFromCart, clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0)
  const [price, setPrice] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    let qty = 0
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty
        price += cart.items[i].price
      }

    }
    setPrice(price)
    setQty(qty)
  }, [cart])

  return (
    <>
      {cart?.items?.length == 0 ? (
        <>
          <div className="text-center my-5">

            <button
              className="btn btn-warning mx-3"
              style={{ fontWeight: "bold", fontSize: "1.2rem" }}
              onClick={() => navigate('/')}
            >
              Continue Shopping...
            </button>
          </div>
        </>

      ) : (
        <>
          <div className='my-5 text-center'>
            <button className='btn btn-info mx-3' style={{ fontWeight: "bold", fontSize: "1.2rem" }}> total quantity = {qty}</button>
            <button className='btn btn-danger mx-3' style={{ fontWeight: "bold", fontSize: "1.2rem" }}> total price = {price}</button>

          </div>
          {
            cart?.items?.map((product) => <div key={product._id} className='container p-3 bg-dark my-5 text-center'>
              <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-around" }}>
                <div className="cart_img">
                  <img src={product.imgSrc} alt="" style={{ width: '100px', height: "100px", borderRadius: "10px" }} />
                </div>
                <div className="cart_des">
                  <h2>{product.title}</h2>
                  <h3>{product.price}</h3>
                  <h3>qty  = {product.qty}</h3>

                </div>
                <div className="cart_action" style={{ fontWeight: "bold" }}>
                  <button onClick={() => deleteQty(product.productId, 1)} className="btn btn-warning mx-3 ">qty --

                  </button>
                  <button onClick={() => {
                    addToCart(
                      product.productId,
                      product.title,
                      product.price / product.qty,
                      1,
                      product.imgSrc
                    )
                  }} className="btn btn-info mx-3">qty++</button>
                  <button onClick={() => {
                    if (confirm("are you sure you want to remove the product")) {
                      removeFromCart(product.productId)
                    }
                  }} className="btn btn-danger mx-3">remove item</button>
                </div>
              </div>
            </div>)
          }
          {cart?.items?.length > 0 && (
            <div className="conatiner text-center">
              <button onClick={() => navigate("/shipping")} className='btn btn-warning mx-3' style={{ fontWeight: "bold" }}>Cheakout</button>
              <button onClick={() => clearCart()} className='btn btn-danger mx-3' style={{ fontWeight: "bold" }}>clear cart</button>
            </div>

          )}

        </>
      )}

    </>
  )
}


export default Cart