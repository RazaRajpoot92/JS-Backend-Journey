import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require:true,
        unique:true
    },
    displayname:{
        type:String,
    },
    password:{
        type:String,
        require:String,
    }
})

export const User = mongoose.model("User",userSchema)