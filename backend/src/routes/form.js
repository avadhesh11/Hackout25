import express from "express";

const router=express.Router();

router.post('/mark',async(req,res)=>{
    const {incident,picture,lat,lon}=req.body;
    

})