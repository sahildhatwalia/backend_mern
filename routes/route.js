const express=require("express")
const multer=require("multer")
const { Createuser, login, loginwithotp, verifyotp, getbyid, getall, updateuser, deleteuser, searchuser, uploadimage } = require("../controller/controller")
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


const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+"-"+file.originalname)
    }
})
const upload=multer({storage:storage})

router.put("/upload/:id",upload.single("avatar"),uploadimage)

module.exports=router
