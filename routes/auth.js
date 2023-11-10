const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth")
const userController = require("../controllers/user")
const authMiddleware = require("../middlewares/auth")

router.post("/register",authController.signup)
router.post("/login",authController.login)
router.post("/add-admin",authController.addAdmin)
router.post("/verify",authMiddleware.loggedMiddleware,authMiddleware.isAdmin,userController.validation)
router.get("/posts/author/details",authMiddleware.loggedMiddleware,authMiddleware.isAuthor,userController.info)


module.exports =router