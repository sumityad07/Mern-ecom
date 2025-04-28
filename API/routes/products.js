import express from 'express'
import { addProduct, deleteProductById, getproductByid, getProducts, updateProduct } from '../Controller/products.js'

const router = express()

//add to product
router.post("/add",addProduct)

//get products
router.get("/all",getProducts)
//get product by id
router.get("/:id",getproductByid)

//update
router.post("/:id",updateProduct)

//delete the product
router.get("/:id",deleteProductById)

 export default router