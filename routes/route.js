const express=require("express")

const { Createuser, login, loginwithotp, verifyotp, getbyid, getall, updateuser, deleteuser, searchuser, uploadimage, updatepass, createPaymentIntent, createCheckoutSession } = require("../controller/controller")
const router=express.Router()

const upload = require("../middleware/upload");
// const { uploadImage } = require("../controllers/controller");

/**
 * @swagger
 * /api/create:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user account by providing name, email, mobile, country, and password.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - mobile
 *               - country
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Sahil Dhatwalia
 *               email:
 *                 type: string
 *                 format: email
 *                 example: sahil@gmail.com
 *               mobile:
 *                 type: string
 *                 example: "9876543210"
 *               country:
 *                 type: string
 *                 example: India
 *               password:
 *                 type: string
 *                 format: password
 *                 example: Password@123
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user created successfully
 *                 newuser:
 *                   type: object
 *       400:
 *         description: Validation error or email already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Email already Exist
 *       500:
 *         description: Internal server error
 */




router.post("/create",Createuser)
router.post("/loginwithmail",login)
router.post("/loginwithotp",loginwithotp)
router.post("/verify",verifyotp)

router.get("/getall",getall)
router.get("/getbyid/:id",getbyid)

router.put("/update/:id",updateuser)
router.put("/updatepass",updatepass)

router.delete("/delete/:id",deleteuser)

router.get("/search",searchuser)




router.put("/upload/:id",upload.single("avatar"),uploadimage)
router.post("/payment/create-payment-intent", createPaymentIntent)
router.post("/payment/create-checkout-session", createCheckoutSession)

module.exports=router
