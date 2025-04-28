import { Address } from "../model/Address.js";

//add address
export const addAddress = async (req, res) => {
    let { fullName, address, city, state, country, pincode, phoneNumber } =
      req.body;
    let userId = req.user;
    let userAddress = await Address.create({
      userId,
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    res.json({ message: "Address added", userAddress,success:true });
  };

  //get address
  export const getAddrees = async (req,res)=>{
    const userId = req.user
    const address = await Address.find({userId})
    if(!address) return res.json({message:"address not found"})

        res.json({message:"address found it",address,sucess:true})
  }
  