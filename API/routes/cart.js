import express from "express"
import { addcart, clearCart, decreseQuantiy, removeFromCart, userCart } from "../Controller/cart.js"
import { isAuth } from "../Middlewares/Auth.js"

const router = express()

//add to cart
//end point api/cart/add
router.post("/add",isAuth,addcart)
//get usercart
router.get("/usercart",isAuth,userCart)

//remove from cart
//end point api/cart/remove/:productid
router.delete('/remove/:productId',isAuth,removeFromCart)

//clear cart
//endpount api/cart/clear
router.delete('/clear',isAuth,clearCart)


//qty decrese
router.post('/--qty',isAuth,decreseQuantiy)

export default router