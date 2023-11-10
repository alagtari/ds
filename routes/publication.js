const express = require("express")
const router = express.Router()
const publicationController = require("../controllers/publication")
const authMiddleware = require("../middlewares/auth")


router.post("/",authMiddleware.loggedMiddleware,authMiddleware.isAuthor,publicationController.add)

module.exports =router