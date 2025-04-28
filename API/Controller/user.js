import { User } from "../model/User.js";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


//register 
export const register = async(req,res)=>{
 const {name,email,password} = req.body;
 
 if(!name||!email||!password)return res.json({message:"All fieds are required",sucess:false})
    const alredayRegister = await User.findOne({email})
    if(alredayRegister) return res.json({message:"you have alreday register,please login"})

        const hascode = await bcrypt.hash(password,10)
    const user = User.create({name,email,password:hascode})

  res.json({message:"you have register succesfully",user:user,sucess:true})

}

//login
export const login = async(req,res)=>{
   const {email,password}= req.body;
   if(!email||!password)return res.json({message:"All fieds are required",sucess:false})
    const user = await User.findOne({email})
   if(!user) return res.json({message:"not found register first"})

    const pass = await bcrypt.compare(password,user.password)
    if(!pass) return res.json({message:"invalid password"})
        const token = jwt.sign({userId:user._id},process.env.KEY,{expiresIn:"365D"})

        res.json({message:`welcome ${user.name}`,token,sucess:true})
}
// get All users
export const users = async (req, res) => {
    try {
      let users = await User.find().sort({ createdAt: -1 });//for latest user
      res.json(users);
    } catch (error) {
      res.json(error.message);
    }
  };
  
  
  // get profile
  export const profile = async (req,res)=>{
    res.json({user:req.user})
  }