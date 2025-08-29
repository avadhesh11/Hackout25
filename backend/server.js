import express from "express";
import home from "./src/routes/home.js";
import router from "./src/routes/home.js";
import mongoose from "mongoose";
import authr from "./src/routes/auth.js";
import dotenv from "dotenv";
import auth from "./src/middlewares/auth.js";
import cookieParser from "cookie-parser"
const app=express();
dotenv.config();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));  
app.use(express.json()); 
app.use(cookieParser());

const PORT=5000;
const MONGO_URI=process.env.MONGO_URI;
mongoose.connect(MONGO_URI).then(()=>{
    console.log('mongoose connected')
})

app.use('/auth',authr);
// app.use('/',auth,router);

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
