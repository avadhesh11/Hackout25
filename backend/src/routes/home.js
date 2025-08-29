import express from "express";
import { DataUser } from "../models/model.js";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("formSubmition"); 
});

router.post("/", async (req, res, next) => {
  try {
    const { userName, desc } = req.body; 

    console.log(req.body);

    const newApp = new DataUser({ userName, desc });
    await newApp.save();

    res.redirect("/"); 
  } catch (err) {
    next(err);
  }
});

export default router;