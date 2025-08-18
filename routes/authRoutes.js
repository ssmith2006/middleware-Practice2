import express from "express";
import basicAuth from "../middlewares/authentication.js"


const router =express.Router();

router.get ("/login", basicAuth, (req, res)=>{
    console.log("User has logged in correctly!")
    res.json({"message": "User has logged in correctly!"})
})

export default router;