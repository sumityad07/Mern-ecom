import express from "express"
import mongoose from "mongoose"
import { config } from "dotenv";
import routerReigter from "./routes/user.js"
import productReigter from "./routes/products.js"
import cartReigter from "./routes/cart.js"
import addressReigter from "./routes/address.js"
import cors from "cors"
const app = express()
app.use(express.json())
app.use(cors({
    origin: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  }));


//register
app.use("/api/user",routerReigter)

//products
app.use("/api/product",productReigter)
//cart
app.use("/api/cart",cartReigter)
//address
app.use("/api/address",addressReigter)



config({path:".env"})

// MongoDB connection
mongoose.connect(
    process.env.MONGO_URL
     ,{
         dbName: "Ecom_mern",
     }
     ).then(()=>console.log(`mongodb is connected`)
     ).catch((err)=>console.log(`${err}`)
     )
 

const port =   process.env.PORT

app.listen(port,()=>console.log(`server running on port ${port}`)
)

