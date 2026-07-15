const User=require("../models/model")
const bcrypt=require("bcrypt")
const nodemailer=require("nodemailer")
const jwt=require("jsonwebtoken")
const stripe=require("stripe")
require("dotenv").config()

const stripeInstance = process.env.STRIPE_SECRET_KEY ? stripe(process.env.STRIPE_SECRET_KEY) : null

const Createuser=async(req,res)=>{
    try{
        const {name,email,mobile,country,password}=req.body;
        if(!name || !email || !mobile || !country || !password){
            res.status(400).json({message:"All fields are required"})
        }

        const user=await User.findOne({email})
        if(user){
            res.status(400).json({message:"Email already Exist"})
        }
        const hashedpassword=await bcrypt.hash(password,10)
        const newuser=new User({
            name,email,mobile,country,password:hashedpassword
        })
        await newuser.save()
        res.status(201).json({message:"user created sucessfully",newuser})


    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;
            const user=await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"Email not fount"})
        }

        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass){
            return res.status(401).json({message:"invalid password"})
        }
        const token=jwt.sign({userId:user._id},"qwertyuioertyu3456789",{expiresIn:"1h"})
        await 
        res.status(200).json({message:"login sucessfully",token,user})


    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }

}

// blxy uzex aczo jkdh

const  generateOTP=()=>{
    let digit="0123456789"
    let otp=""
    for(let i=0;i<6;i++){
        otp+=digit[Math.floor(Math.random()*10)]
    }
    return otp
}

const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }

})


const loginwithotp=async(req,res)=>{
    try{
        const {email,password}=req.body;
          const user=await User.findOne({email})

        if(!user){
            return res.status(404).json({message:"Email not fount"})
        }

        const comparepass=await bcrypt.compare(password,user.password)
        if(!comparepass){
            return res.status(401).json({message:"invalid password"})
        }
        const otp=generateOTP()
        user.otp=otp
        await user.save()
const mailoption = {
    from: '"Lalalal Company" <sahildhatwalia04@gmail.com>',
    to: user.email,
    subject: "OTP Verification",

    html: `
    <div style="font-family: Arial, sans-serif; max-width:600px; margin:auto; padding:30px; background:#f8f9fc;">

      <h2 style="color:#333;">Email Verification</h2>

      <p>Hello <strong>${user.name}</strong>,</p>

      <p>
        Thank you for registering with <strong>Lalalal Company</strong>.
        Please use the following One-Time Password (OTP) to verify your email address.
      </p>

      <div style="
          margin:35px auto;
          width:fit-content;
          background:linear-gradient(135deg,#6C63FF,#8E2DE2,#FF416C);
          padding:4px;
          border-radius:10px;
          box-shadow:0 8px 20px rgba(108,99,255,0.35);
      ">
          <div style="
              background:#ffffff;
              padding:10px 20px;
              border-radius:12px;
              text-align:center;
          ">
              <p style="
                  margin:0;
                  color:#777;
                  font-size:10px;
                  letter-spacing:2px;
                  text-transform:uppercase;
              ">
                  Your OTP
              </p>

              <h1 style="
                  margin:7px 0 0;
                  font-size:35px;
                  color:#6C63FF;
                  letter-spacing:7px;
                  font-weight:bold;
              ">
                  ${otp}
              </h1>
          </div>
      </div>

      <p style="color:#444;">
        This OTP is valid for <strong>10 minutes</strong> and can only be used once.
      </p>

      <p style="color:#d32f2f;">
        <strong>⚠ Never share this OTP with anyone.</strong>
      </p>

      <hr style="border:none;border-top:1px solid #ddd;margin:15px 0;">

      <p style="font-size:14px;color:#777;">
        If you didn't request this email, you can safely ignore it.
      </p>

      <p>
        Regards,<br>
        <strong>Lalalal Company Support Team</strong>
      </p>

    </div>
    `
};
        await transporter.sendMail(mailoption)
        res.status(201).json({message:"OTP send Sucessfully"})


        

    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}



const verifyotp=async(req,res)=>{
    try{
        const {email,otp}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"email not found"})
        }
        if(user.otp===otp){
            user.otp=null
            await user.save()
        }
        res.status(200).json({message:"login sucess"})

    }
      catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const getbyid=async(req,res)=>{
    try{
const userid=req.params.id
const user=await User.findById(userid)
if(!user){
    return res.status(404).json({message:"user not found"})
}
res.status(200).json({message:"user fetched successfully",user})
    }
      catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}
const getall=async(req,res)=>{
    try{
        const user=await User.find()
        res.status(200).json({message:"user details",user})

    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}
const updateuser=async(req,res)=>{
    try{
        const userid=req.params.id
        const {name,email,mobile,country}=req.body
        const user=await User.findByIdAndUpdate(userid,req.body,{new:true})
        if(!user){
            return res.status(404).json({message:"not found"})
        }
        res.status(200).json({message:"user update successfully",user})


    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}


const deleteuser=async(req,res)=>{
    try{
        const userid=req.params.id
        const user=await User.findByIdAndDelete(userid)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        res.status(200).json({message:"user delete successfully"})

    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const searchuser=async(req,res)=>{
    try{
        const {query}=req.query
        
 if (!query) {
            return res.status(400).json({ message: "Search query is required" });
        }

        const users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { email: { $regex: query, $options: "i" } }
            ]
        })

        res.status(200).json(users);
    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const uploadimage=async(req,res)=>{
    try{
        const userid=req.params.id;
        const user=await User.findById(userid)
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        if(!req.file){
            return res.status(400).json({message:"No file uploaded"})
        }
        user.avatar=req.file.filename
        await user.save()
        res.status(200).json({message:"image uploaded successfully",user})
    }
     catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const updatepass=async(req,res)=>{
    try{
        const {email,oldpassword,newpassword}=req.body;
        const user=await User.findOne({email})
        if(!user){
            return res.status(404).json({message:"user not found"})
        }
        const comparepass=await bcrypt.compare(oldpassword,user.password)
        if(!comparepass){
            return res.status(401).json({message:"invalid password"})
        }
        const haspassword=await bcrypt.hash(newpassword,10)
        user.password=haspassword
        await user.save()
        res.status(200).json({message:"password updated successfully"})


    }
    catch(error){
         res.status(500).json({message:"Internal server error",error:error.message})
    }
}







const createPaymentIntent=async(req,res)=>{
    try{
        const { amount, currency = "inr", metadata = {} } = req.body

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" })
        }

        if (!stripeInstance) {
            return res.status(500).json({ message: "Stripe secret key is not configured" })
        }

        const numericAmount = Number(amount)
        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }

        const normalizedCurrency = String(currency).toLowerCase()
        const finalAmount = normalizedCurrency === "inr"
            ? Math.round(numericAmount * 100)
            : Math.round(numericAmount)

        const paymentIntent = await stripeInstance.paymentIntents.create({
            amount: finalAmount,
            currency: normalizedCurrency,
            automatic_payment_methods: { enabled: true },
            metadata: {
                source: "backend_api",
                ...metadata
            }
        })

        res.status(200).json({
            message: "Payment intent created successfully",
            clientSecret: paymentIntent.client_secret,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
            currency: paymentIntent.currency
        })
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

const createCheckoutSession=async(req,res)=>{
    try{
        const { amount, currency = "inr" } = req.body

        if (!amount) {
            return res.status(400).json({ message: "Amount is required" })
        }

        if (!stripeInstance) {
            return res.status(500).json({ message: "Stripe secret key is not configured" })
        }

        const numericAmount = Number(amount)
        if (!Number.isFinite(numericAmount) || numericAmount <= 0) {
            return res.status(400).json({ message: "Amount must be a positive number" })
        }

        const normalizedCurrency = String(currency).toLowerCase()
        const finalAmount = normalizedCurrency === "inr"
            ? Math.round(numericAmount * 100)
            : Math.round(numericAmount)

        const session = await stripeInstance.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: normalizedCurrency,
                        product_data: {
                            name: "Payment"
                        },
                        unit_amount: finalAmount
                    },
                    quantity: 1
                }
            ],
            mode: "payment",
            success_url: `http://localhost:4000/success.html?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `http://localhost:4000/cancel.html`
        })

        res.status(200).json({
            message: "Checkout session created successfully",
            sessionId: session.id
        })
    }
    catch(error){
        res.status(500).json({message:"Internal server error",error:error.message})
    }
}

module.exports={Createuser,login,loginwithotp,verifyotp,getbyid,getall,updateuser,deleteuser,searchuser,uploadimage,updatepass,createPaymentIntent,createCheckoutSession}









