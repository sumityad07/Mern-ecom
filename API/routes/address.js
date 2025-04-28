import { addAddress, getAddrees } from "../Controller/Address.js";
import { isAuth } from "../Middlewares/Auth.js";
import express from "express"


const router = express.Router();

// add address
router.post("/add",isAuth ,addAddress);

// get address
router.get('/get',isAuth ,getAddrees)

export default router;