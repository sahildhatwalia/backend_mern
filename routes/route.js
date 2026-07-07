const express=require("express")
const { Createuser, login, loginwithotp, verifyotp, getbyid, getall } = require("../controller/controller")
const router=express.Router()


router.post("/create",Createuser)
router.post("/loginwithmail",login)
router.post("/loginwithotp",loginwithotp)
router.post("/verify",verifyotp)

router.get("/getall",getall)
router.get("/getbyid/:id",getbyid)

module.exports=router