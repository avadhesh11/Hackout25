import express from "express";
import {dataUser} from "../models/model.js";
const router=express.Router();

router.get('/',(req,res)=>{
    res.render("formSubmition");
})
router.post('/',async (req,res,next)=>{
    const{userName,desc}=req.body;
    console.log(req.body);
    const newApp= new dataUser(userName,desc);
    await newApp.save();
    // next();
})
export default router;