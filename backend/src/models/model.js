import mongoose from "mongoose";

const user = mongoose.Schema({
    username:{
        type:String,
        require:true
    },
    desc:{
        type:String,
        require:true
    }
})
const dataUser=mongoose.model("dataUser", user);

export {dataUser};