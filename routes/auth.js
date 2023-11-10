const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")

router.post("/register",authController.signup)
router.post("/login",authController.login)
router.post("/add-admin",authController.addAdmin)

module.exports =router