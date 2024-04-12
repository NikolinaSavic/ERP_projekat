const express = require('express')
const router = express.Router()
const { getCategories, getCategoryById, createCategory, updateCategory, deleteCategory } = require('../controllers/categoryController')
const { verifyIsLoggedIn, verifyIsAdmin } = require("../middleware/verifyAuthToken")

router.get("/", getCategories)
router.get("/:id", getCategoryById)

//admin
router.use(verifyIsLoggedIn)
router.use(verifyIsAdmin)
router.post("/", createCategory)
router.put("/:id", updateCategory)
router.delete("/:category", deleteCategory)

module.exports = router