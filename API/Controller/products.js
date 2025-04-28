
import { Products } from "../model/Products.js"

//add to product
export const addProduct = async (req,res)=>{
    const {title,  description,price,category,qty,imgSrc} = req.body

    try {
        const product =await Products.create({title,  description,price,category,qty,imgSrc})
        res.json({message:"product addead succesfully",product,sucess:true})
    } catch (error) {
        res.json(error.message)
    }
 
}

//get product

export const getProducts = async (req,res)=>{
    const product = await Products.find()
    res.json({message:"here is products",product})
    
}

//get product by id

export const getproductByid = async (req,res)=>{
    const id = req.params.id
    try {
        const product =  await Products.findById(id)
        if(!product) return res.json({message:"can not get the product",sucess:false})
            res.json({message:"got the product",product,sucess:true})
    } catch (error) {
        res.json(error.message)
    }
}

//update product

export const updateProduct = async (req,res)=>{
    const id = req.params.id
    const product = await Products.findByIdAndUpdate(id,req.body,{new:true})
    if(!product) return res.json({message:"can not get the product",sucess:false})

        res.json({message:"got the product",product,sucess:true})
}

// delete product by id
export const deleteProductById = async (req, res) => {
    const id = req.params.id;
  let product = await Products.findByIdAndDelete(id)
  if(!product) return res.json({message:'Invalid Id'})
  res.json({ message: "Product has been deleted", product });
}; 