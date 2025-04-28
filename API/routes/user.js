import express from "express"
import { login, profile, register, users } from "../Controller/user.js"
import { isAuth } from "../Middlewares/Auth.js"

const router = express()
//register endpoint api - api/user/register
router.post("/register",register)
//login endpoint api/user/login
router.post("/login",login)

//for alluser
router.post("/users",users)

//profil
router.get("/profile",isAuth,profile)

export default router