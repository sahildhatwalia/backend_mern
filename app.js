const express=require("express")
const mongoose=require("mongoose")

const PORT=4000

const app=express()
const router=require("./routes/route")
mongoose.connect("mongodb://localhost:27017/node")
.then(()=>{
    console.log("connected succesffullyyyyyy")
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err)
})
app.use(express.json())
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})
