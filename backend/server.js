import express from "express";
import home from "./src/routes/home.js";
import router from "./src/routes/home.js";
import mongoose from "mongoose";
import dotenv from "dotenv";
const app=express();
const env=dotenv.config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));  
app.use(express.json()); 

const PORT=5000;
const MONGO_URI=process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>{
    console.log('mongoose connected')
})
app.use('/',router);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
