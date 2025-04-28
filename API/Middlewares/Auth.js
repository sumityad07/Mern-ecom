import jwt from "jsonwebtoken"

import { User } from "../model/User.js"

export const isAuth = async(req,res,next)=>{
    const token = req.header("Auth")
    if(!token) return res.json({message:"login first"})

       
        const decoded = jwt.verify(token, process.env.KEY);

        const id = decoded.userId;
      
        let user = await User.findById(id);
      
        if (!user) return res.json({ message: "User not exist" });
      
        req.user = user;
        next();
}