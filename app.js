const express=require("express")
const mongoose=require("mongoose")
const cors=require("cors")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swagger");
require("dotenv").config();
const PORT=4000

const app=express()
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:4000'] 
})); 
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);
const router=require("./routes/route")
mongoose.connect("mongodb://localhost:27017/node")
.then(()=>{
    console.log("connected succesffullyyyyyy")
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err)
})
app.use("/uploads", express.static("uploads"));

app.get("/api/firebase-config", (req, res) => {
    res.json({
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID
    });
});

app.use(express.static("."));
app.use(express.json())
app.use("/api",router)
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`)
})



/*
to view the uploaded image in the browser, you can use the following URL format:
http://localhost:4000/uploads/<filename>
http://localhost:4000/uploads/1783579735028-Screenshot%202025-05-02%20220844.png
*/
