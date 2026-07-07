const mongoose=require("mongoose")

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile:{
        type:Number,
        
    },
    country:{
        type:String
    },
    password:{
        type:String
    },
    otp:{
        type:String
    }
})
const User=mongoose.model("User",userSchema)
module.exports=User