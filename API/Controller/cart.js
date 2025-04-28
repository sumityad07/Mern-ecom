
import { Cart } from "../model/Cart.js"


//add to cart
export const addcart = async(req,res)=>{
    const{productId,title,price,qty,imgSrc}=req.body
    const userId = req.user
    let cart = await Cart.findOne({ userId });
   if(!cart){ cart = new Cart({userId,items:[]})}
   const cartIndex = await cart.items.findIndex((item)=>item.productId.toString()===productId)
   const quantityToAdd = Number(qty);
   if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
     return res.status(400).json({ message: "Invalid quantity" });
   }
   if(cartIndex>-1){
    cart.items[cartIndex].qty+=quantityToAdd
    cart.items[cartIndex].price+= price*quantityToAdd
   }else {
    cart.items.push({ productId, title, price, qty, imgSrc });
  }
  await cart.save()
  res.json({ message: "Items Added To Cart", cart });
}

//get use cart
export const userCart = async(req,res)=>{
    const userId = req.user

    const cart  = await Cart.findOne({userId})
    if(!cart) return res.json({messge:'Cart not found'})

        res.json({message:"user cart",cart})
}

//remove product

export const removeFromCart = async (req,res)=>{
    const productId = req.params.productId
    const userId = req.user
    console.log(userId);
    
    const cart = await Cart.findOne({userId})
    if(!cart) res.json({message:"there is no cart"})

       cart.items = cart.items.filter((item)=>item.productId.toString()!==productId)
        await cart.save()
        res.json({message:"product remove sucessfully",success:true})
}

//clear cart

export const clearCart = async(req,res)=>{
    const userId = req.user;

    let cart = await Cart.findOne({userId});
    
    if(!cart) {
        cart = new Cart({items:[]});
    }else{
        cart.items = []
    }

    await cart.save();

    res.json({message:"User Cart Cleard"})

}

//remove quantity

export const decreseQuantiy = async(req,res)=>{
    const { productId,  qty } = req.body;

  const userId = req.user;

  let cart = await Cart.findOne({ userId });

  if (!cart) {
    cart = new Cart({ userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );

  // Ensure qty is a valid number
  const quantityToAdd = Number(qty);
  if (isNaN(quantityToAdd) || quantityToAdd <= 0) {
    return res.status(400).json({ message: "Invalid quantity" });
  }

  if (itemIndex > -1) {
    const item = cart.items[itemIndex];

    if(item.qty >qty){
        const pricePerUnit = item.price/item.qty
        
        item.qty -= qty;
        item.price -= pricePerUnit*qty;
    }else{
        cart.items.splice(itemIndex,1)
    }
  
} else {
  return res.json({message:'Invalid product id'})
}
await cart.save();
res.json({ message: "Items qty decreased", cart, success: true });


}