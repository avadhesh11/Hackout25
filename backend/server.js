import express from "express";
import home from "./src/routes/home.js";
import router from "./src/routes/home.js";
import mongoose from "mongoose";
const app=express();
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));  
app.use(express.json()); 
const PORT=5000;
mongoose.connect('mongodb+srv://ava123:Za2W0hQcbGQjwOPo@cluster0.wnmizf3.mongodb.net/').then(()=>{
    console.log('mongoose connected')
})
app.use('/',router);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
