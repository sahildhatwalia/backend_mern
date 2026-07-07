const express=require("express")
const { Createuser, login, loginwithotp } = require("../controller/controller")
const router=express.Router()


router.post("/create",Createuser)
router.post("/loginwithmail",login)
router.post("/loginwithotp",loginwithotp)

module.exports=router