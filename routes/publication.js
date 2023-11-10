const express = require("express")
const router = express.Router()
const publicationController = require("../controllers/publication")
const authMiddleware = require("../middlewares/auth")
const publicationMiddleware = require("../middlewares/publication")


router.post("/",authMiddleware.loggedMiddleware,authMiddleware.isAuthor,publicationController.add)
router.get("/:id",authMiddleware.loggedMiddleware,publicationMiddleware.isOwner,publicationController.getById)

module.exports =router