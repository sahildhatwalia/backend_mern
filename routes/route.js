const express=require("express")

const { Createuser, login, loginwithotp, verifyotp, getbyid, getall, updateuser, deleteuser, searchuser, uploadimage } = require("../controller/controller")
const router=express.Router()

const upload = require("../middleware/upload");
// const { uploadImage } = require("../controllers/controller");

router.post("/create",Createuser)
router.post("/loginwithmail",login)
router.post("/loginwithotp",loginwithotp)
router.post("/verify",verifyotp)

router.get("/getall",getall)
router.get("/getbyid/:id",getbyid)

router.put("/update/:id",updateuser)

router.delete("/delete/:id",deleteuser)

router.get("/search",searchuser)




router.put("/upload/:id",upload.single("avatar"),uploadimage)

module.exports=router
