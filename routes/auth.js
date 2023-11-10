const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")

router.post("/register",authController.signup)
router.post("/login",authController.login)
router.post("/add-admin",authController.addAdmin)
router.post("/verify",authMiddleware.loggedMiddleware,authMiddleware.isAdmin,userController.validation)

module.exports =router