const express=require("express")
const { Createuser, login, loginwithotp, verifyotp, getbyid, getall, updateuser, deleteuser, searchuser } = require("../controller/controller")
const router=express.Router()


router.post("/create",Createuser)
router.post("/loginwithmail",login)
router.post("/loginwithotp",loginwithotp)
router.post("/verify",verifyotp)

router.get("/getall",getall)
router.get("/getbyid/:id",getbyid)

router.put("/update/:id",updateuser)

router.delete("/delete/:id",deleteuser)

router.get("/search",searchuser)

module.exports=router
