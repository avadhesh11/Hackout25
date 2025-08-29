import express from "express";
import home from "./src/routes/home.js";

const app=express();
app.use(express.json());
const PORT=5000;

app.use('/',home);


app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})
